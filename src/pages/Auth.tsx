
import AuthForm from "@/components/AuthForm";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // If user is already logged in, redirect to dashboard
    if (currentUser) {
      navigate("/dashboard");
    }
  }, [currentUser, navigate]);

  return <AuthForm />;
};

export default Auth;
