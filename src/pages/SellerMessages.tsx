import { useEffect, useState } from "react";
import { 
  getMessages,
  markMessageAsRead,
  Message as MessageType,
  saveMessages
} from "@/services/sellerStorage";
import SellerNav from "@/components/SellerNav";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Search, Mail, MailOpen, CornerDownLeft, Trash2 } from "lucide-react";
import { toast } from "sonner";

const SellerMessages = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<MessageType | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentTab, setCurrentTab] = useState("all");
  const [filteredMessages, setFilteredMessages] = useState<MessageType[]>([]);

  useEffect(() => {
    const loadedMessages = getMessages();
    setMessages(loadedMessages);
    filterMessages(loadedMessages, currentTab, searchQuery);
  }, []);

  const filterMessages = (
    messageList: MessageType[], 
    tab: string, 
    query: string
  ) => {
    const filtered = messageList.filter(message => {
      const matchesQuery = 
        message.from.toLowerCase().includes(query.toLowerCase()) ||
        message.subject.toLowerCase().includes(query.toLowerCase()) ||
        message.content.toLowerCase().includes(query.toLowerCase());
      
      const matchesTab = tab === "all" || 
        (tab === "unread" && !message.read) ||
        (tab === "read" && message.read);
      
      return matchesQuery && matchesTab;
    });
    
    setFilteredMessages(filtered);
  };

  const handleMessageClick = (message: MessageType) => {
    setSelectedMessage(message);
    
    // Mark as read if not already
    if (!message.read) {
      markMessageAsRead(message.id);
      
      // Update state
      const updatedMessages = messages.map(m => 
        m.id === message.id ? { ...m, read: true } : m
      );
      setMessages(updatedMessages);
      filterMessages(updatedMessages, currentTab, searchQuery);
    }
  };

  const handleTabChange = (value: string) => {
    setCurrentTab(value);
    filterMessages(messages, value, searchQuery);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    filterMessages(messages, currentTab, searchQuery);
  };

  const handleReply = () => {
    if (!selectedMessage || !replyContent.trim()) return;
    
    // In a real app, this would send the reply to an API
    toast.success(`Reply sent to ${selectedMessage.from}`);
    setReplyContent("");
  };

  const handleDeleteMessage = (id: string) => {
    const updatedMessages = messages.filter(m => m.id !== id);
    setMessages(updatedMessages);
    saveMessages(updatedMessages);
    filterMessages(updatedMessages, currentTab, searchQuery);
    
    if (selectedMessage?.id === id) {
      setSelectedMessage(null);
    }
    
    toast.success("Message deleted");
  };

  const unreadCount = messages.filter(m => !m.read).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <SellerNav />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Messages</h1>
        
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-1/3">
            <Card className="mb-4">
              <CardHeader className="pb-3">
                <CardTitle>Inbox</CardTitle>
                <CardDescription>{unreadCount} unread messages</CardDescription>
                
                <form onSubmit={handleSearch} className="mt-2 flex gap-2">
                  <div className="relative w-full">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search messages..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button type="submit" size="sm">Search</Button>
                </form>
              </CardHeader>
              
              <Tabs value={currentTab} onValueChange={handleTabChange}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="unread">
                    Unread {unreadCount > 0 && `(${unreadCount})`}
                  </TabsTrigger>
                  <TabsTrigger value="read">Read</TabsTrigger>
                </TabsList>
                
                <CardContent className="p-0">
                  <div className="max-h-[400px] overflow-y-auto">
                    {filteredMessages.length > 0 ? (
                      <div className="divide-y">
                        {filteredMessages.map((message) => (
                          <div 
                            key={message.id}
                            onClick={() => handleMessageClick(message)}
                            className={`p-3 cursor-pointer hover:bg-slate-50 transition-colors ${
                              selectedMessage?.id === message.id ? 'bg-slate-50' : ''
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              {message.read ? (
                                <MailOpen className="h-4 w-4 text-muted-foreground" />
                              ) : (
                                <Mail className="h-4 w-4 text-[#8AB83D]" />
                              )}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                  <h4 className={`text-sm font-medium truncate ${
                                    !message.read ? 'text-black' : 'text-gray-600'
                                  }`}>
                                    {message.from}
                                  </h4>
                                  <span className="text-xs text-muted-foreground">
                                    {new Date(message.createdAt).toLocaleDateString()}
                                  </span>
                                </div>
                                <p className="text-xs font-medium truncate">
                                  {message.subject}
                                </p>
                                <p className="text-xs text-muted-foreground truncate">
                                  {message.content}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-4 text-center text-muted-foreground">
                        No messages found
                      </div>
                    )}
                  </div>
                </CardContent>
              </Tabs>
            </Card>
          </div>
          
          <div className="lg:w-2/3">
            <Card className="h-full">
              {selectedMessage ? (
                <>
                  <CardHeader className="flex flex-row items-start justify-between">
                    <div>
                      <CardTitle>{selectedMessage.subject}</CardTitle>
                      <CardDescription className="mt-1">
                        From: <span className="font-medium">{selectedMessage.from}</span> ({selectedMessage.email})
                        <br />
                        Date: {new Date(selectedMessage.createdAt).toLocaleString()}
                      </CardDescription>
                    </div>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={() => handleDeleteMessage(selectedMessage.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="min-h-[100px] mb-6">
                      {selectedMessage.content}
                    </div>
                    
                    <div className="border-t pt-4">
                      <h4 className="text-sm font-medium mb-2">Reply to {selectedMessage.from}</h4>
                      <Textarea 
                        placeholder="Type your reply here..." 
                        className="min-h-[120px]"
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                      />
                    </div>
                  </CardContent>
                  
                  <CardFooter className="justify-end">
                    <Button 
                      onClick={handleReply}
                      disabled={!replyContent.trim()}
                    >
                      <CornerDownLeft className="h-4 w-4 mr-2" />
                      Send Reply
                    </Button>
                  </CardFooter>
                </>
              ) : (
                <div className="h-full flex items-center justify-center p-8">
                  <div className="text-center">
                    <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium">No message selected</h3>
                    <p className="text-muted-foreground">
                      Select a message from the sidebar to view its contents
                    </p>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SellerMessages;