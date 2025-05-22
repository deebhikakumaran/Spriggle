
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the user type selection page instead
    navigate("/user-type-selection");
  }, [navigate]);

  return null;
};

export default SignUp;
