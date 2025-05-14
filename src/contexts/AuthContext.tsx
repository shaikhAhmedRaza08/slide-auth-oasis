import React, {createContext, useState, useContext, useEffect, ReactNode} from "react";
import {loginUser, signupUser} from "@/api/auth.ts";

interface User {
    id: string;
    username: string;
}

interface AuthContextType {
    currentUser: User | null;
    loading: boolean;
    login: (username: string, password: string) => Promise<void>;
    signup: (username: string, password: string) => Promise<void>;
    logout: () => void;
    error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export const AuthProvider = ({children}: { children: ReactNode }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Check if user is stored in localStorage
        const storedUser = localStorage.getItem("currentUser");
        if (storedUser) {
            setCurrentUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    // Mock login function
    const login = async (username: string, password: string) => {
        setLoading(true);
        try {
            // Simulate API call
            // await new Promise((resolve) => setTimeout(resolve, 1000));

            const response = await loginUser({username, password});
            console.log(response);
            const {user} = response?.data;
            const {id, username: UserName} = user;
            // localStorage.setItem("currentUser", JSON.stringify({id, username: UserName}));


            // For demo purposes, we'll accept any login with a valid username format
            // if (!username.includes('@')) {
            //     throw new Error("Invalid username format");
            // }

            // Create mock user
            // const user = {
            //     id: Math.random().toString(36).substring(2, 9),
            //     username: username
            // };

            setCurrentUser({id, username: UserName});
            localStorage.setItem("currentUser", JSON.stringify({id, username: UserName}));
            setError(null);
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("Failed to login");
            }
            throw error;
        } finally {
            setLoading(false);
        }
    };

    // Mock signup function
    const signup = async (username: string, password: string) => {
        setLoading(true);
        try {
            // Simulate API call
            // await new Promise((resolve) => setTimeout(resolve, 1000));

            const response = await signupUser({username, password});
            console.log(response);
            const {user} = response?.data;
            const {id, username: UserName} = user;


            // Validate username format
            // if (!username.includes('@')) {
            //     throw new Error("Invalid username format");
            // }

            // Create mock user
            // const user = {
            //     id: Math.random().toString(36).substring(2, 9),
            //     username: username
            // };

            // setCurrentUser({id, username: UserName});
            // localStorage.setItem("currentUser", JSON.stringify({id, username: UserName}));
            setError(null);
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("Failed to sign up");
            }
            throw error;
        } finally {
            setLoading(false);
        }
    };

    // Logout function
    const logout = () => {
        setCurrentUser(null);
        localStorage.removeItem("currentUser");
    };

    const value = {
        currentUser,
        loading,
        login,
        signup,
        logout,
        error
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
