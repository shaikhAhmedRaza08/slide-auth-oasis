import {useState, FormEvent} from "react";
import {useNavigate, useLocation} from "react-router-dom";
import {useAuth} from "@/contexts/AuthContext";
import {toast} from "sonner";
import {Eye, EyeOff, LogIn, UserPlus, ArrowRight, Loader2} from "lucide-react";
import {loginUser, signupUser} from "@/api/auth.ts";

const AuthForm = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const {login, signup} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = (location.state as { from?: { pathname: string } })?.from?.pathname || "/dashboard";

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            if (isLogin) {
                await login(username, password);
            } else {
                await signup(username, password);
                // const response = await signupUser({username, password});
                // console.log(response);
            }

            toast.success(isLogin ? "Successfully logged in!" : "Account created successfully!");
            navigate(from, {replace: true});
        } catch (error) {
            console.error(error);
            toast.error(error instanceof Error ? error.message : "Authentication failed");
        } finally {
            setIsLoading(false);
        }
    };

    const toggleForm = () => {
        setIsLogin(!isLogin);
        // Reset form fields when toggling
        setUsername("");
        setPassword("");
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    {/* Sliding tabs */}
                    <div className="flex border-b border-slate-200">
                        <button
                            onClick={() => setIsLogin(true)}
                            className={`relative w-1/2 py-4 text-sm font-medium text-center transition-colors duration-300 ${
                                isLogin
                                    ? "text-indigo-600"
                                    : "text-slate-500 hover:text-slate-700"
                            }`}
                        >
              <span className="flex items-center justify-center gap-2">
                <LogIn className="w-4 h-4"/>
                Sign In
              </span>
                            {isLogin && (
                                <span
                                    className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 transition-all duration-300"></span>
                            )}
                        </button>
                        <button
                            onClick={() => setIsLogin(false)}
                            className={`relative w-1/2 py-4 text-sm font-medium text-center transition-colors duration-300 ${
                                !isLogin
                                    ? "text-indigo-600"
                                    : "text-slate-500 hover:text-slate-700"
                            }`}
                        >
              <span className="flex items-center justify-center gap-2">
                <UserPlus className="w-4 h-4"/>
                Sign Up
              </span>
                            {!isLogin && (
                                <span
                                    className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 transition-all duration-300"></span>
                            )}
                        </button>
                    </div>

                    {/* Form container with sliding animation */}
                    <div className="relative w-full overflow-hidden">
                        <div
                            className="transition-all duration-300 ease-in-out flex"
                            style={{transform: isLogin ? 'translateX(0)' : 'translateX(-50%)', width: '200%'}}
                        >
                            {/* Login Form */}
                            <div className="w-1/2 p-8">
                                <h2 className="text-2xl font-bold text-slate-800 mb-6">Welcome back</h2>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label htmlFor="login-username"
                                               className="block text-sm font-medium text-slate-700 mb-2">
                                            Username
                                        </label>
                                        <input
                                            id="login-username"
                                            type="email"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            required
                                            className="block w-full px-4 py-3 rounded-lg border border-slate-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                            placeholder="your@email.com"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="login-password"
                                               className="block text-sm font-medium text-slate-700 mb-2">
                                            Password
                                        </label>
                                        <div className="relative">
                                            <input
                                                id="login-password"
                                                type={showPassword ? "text" : "password"}
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                                className="block w-full px-4 py-3 pr-10 rounded-lg border border-slate-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                                placeholder="••••••••"
                                            />
                                            <button
                                                type="button"
                                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                {showPassword ? (
                                                    <EyeOff className="h-5 w-5 text-slate-400"/>
                                                ) : (
                                                    <Eye className="h-5 w-5 text-slate-400"/>
                                                )}
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <input
                                                id="remember-me"
                                                name="remember-me"
                                                type="checkbox"
                                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-slate-300 rounded"
                                            />
                                            <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-600">
                                                Remember me
                                            </label>
                                        </div>
                                        <div className="text-sm">
                                            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                                Forgot password?
                                            </a>
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        {isLoading ? (
                                            <Loader2 className="h-4 w-4 animate-spin mr-2"/>
                                        ) : (
                                            <LogIn className="h-4 w-4 mr-2"/>
                                        )}
                                        Sign in
                                    </button>
                                </form>

                                <div className="mt-6 text-center">
                                    <p className="text-sm text-slate-600">
                                        Don't have an account?{" "}
                                        <button
                                            type="button"
                                            onClick={toggleForm}
                                            className="font-medium text-indigo-600 hover:text-indigo-500 inline-flex items-center"
                                        >
                                            Sign up <ArrowRight className="ml-1 h-4 w-4"/>
                                        </button>
                                    </p>
                                </div>
                            </div>

                            {/* Register Form */}
                            <div className="w-1/2 p-8">
                                <h2 className="text-2xl font-bold text-slate-800 mb-6">Create an account</h2>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label htmlFor="signup-username"
                                               className="block text-sm font-medium text-slate-700 mb-2">
                                            Username
                                        </label>
                                        <input
                                            id="signup-username"
                                            type="email"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            required
                                            className="block w-full px-4 py-3 rounded-lg border border-slate-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                            placeholder="your@email.com"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="signup-password"
                                               className="block text-sm font-medium text-slate-700 mb-2">
                                            Password
                                        </label>
                                        <div className="relative">
                                            <input
                                                id="signup-password"
                                                type={showPassword ? "text" : "password"}
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                                className="block w-full px-4 py-3 pr-10 rounded-lg border border-slate-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                                placeholder="••••••••"
                                            />
                                            <button
                                                type="button"
                                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                {showPassword ? (
                                                    <EyeOff className="h-5 w-5 text-slate-400"/>
                                                ) : (
                                                    <Eye className="h-5 w-5 text-slate-400"/>
                                                )}
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex items-center">
                                        <input
                                            id="terms"
                                            name="terms"
                                            type="checkbox"
                                            required
                                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-slate-300 rounded"
                                        />
                                        <label htmlFor="terms" className="ml-2 block text-sm text-slate-600">
                                            I agree to the{" "}
                                            <a href="#" className="text-indigo-600 hover:text-indigo-500">
                                                Terms of Service
                                            </a>{" "}
                                            and{" "}
                                            <a href="#" className="text-indigo-600 hover:text-indigo-500">
                                                Privacy Policy
                                            </a>
                                        </label>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        {isLoading ? (
                                            <Loader2 className="h-4 w-4 animate-spin mr-2"/>
                                        ) : (
                                            <UserPlus className="h-4 w-4 mr-2"/>
                                        )}
                                        Create Account
                                    </button>
                                </form>

                                <div className="mt-6 text-center">
                                    <p className="text-sm text-slate-600">
                                        Already have an account?{" "}
                                        <button
                                            type="button"
                                            onClick={toggleForm}
                                            className="font-medium text-indigo-600 hover:text-indigo-500 inline-flex items-center"
                                        >
                                            Sign in <ArrowRight className="ml-1 h-4 w-4"/>
                                        </button>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthForm;
