import { createContext, useContext, useReducer, ReactNode } from "react";
import { toast } from "sonner";

export interface CartItem {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
  unit: string;
}

interface CartState {
  items: CartItem[];
}

type CartAction = 
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: { id: number } }
  | { type: "UPDATE_QUANTITY"; payload: { id: number; quantity: number } }
  | { type: "CLEAR_CART" };

interface CartContextType {
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, change: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getSubtotal: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const initialState: CartState = {
  items: JSON.parse(localStorage.getItem("cart") || "[]"),
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  let newState: CartState;
  
  switch (action.type) {
    case "ADD_ITEM":
      // Check if item already exists in cart
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingItemIndex >= 0) {
        // Update quantity of existing item
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + action.payload.quantity,
        };
        newState = { ...state, items: updatedItems };
      } else {
        // Add new item to cart
        newState = { ...state, items: [...state.items, action.payload] };
      }
      break;

    case "REMOVE_ITEM":
      newState = {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id),
      };
      break;

    case "UPDATE_QUANTITY":
      newState = {
        ...state,
        items: state.items.map((item) => 
          item.id === action.payload.id 
            ? { ...item, quantity: action.payload.quantity } 
            : item
        ),
      };
      break;

    case "CLEAR_CART":
      newState = { ...state, items: [] };
      break;

    default:
      return state;
  }

  // Save to localStorage
  localStorage.setItem("cart", JSON.stringify(newState.items));
  return newState;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (item: Omit<CartItem, "quantity">) => {
    dispatch({
      type: "ADD_ITEM",
      payload: { ...item, quantity: 1 },
    });
    toast.success(`${item.name} added to cart`);
  };

  const removeItem = (id: number) => {
    dispatch({
      type: "REMOVE_ITEM",
      payload: { id },
    });
  };

  const updateQuantity = (id: number, change: number) => {
    const item = state.items.find(item => item.id === id);
    if (!item) return;
    
    const newQuantity = Math.max(1, item.quantity + change);
    dispatch({
      type: "UPDATE_QUANTITY",
      payload: { id, quantity: newQuantity },
    });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const getTotalItems = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  };

  const getSubtotal = () => {
    return state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <CartContext.Provider value={{ 
      state, 
      dispatch, 
      addToCart, 
      removeItem, 
      updateQuantity, 
      clearCart, 
      getTotalItems, 
      getSubtotal 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
