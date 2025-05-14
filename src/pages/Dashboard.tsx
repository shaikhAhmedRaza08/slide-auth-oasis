
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { LogOut, User } from "lucide-react";

const Dashboard = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/auth");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-slate-800">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-sm text-slate-700">
              <User className="h-5 w-5 mr-1 text-slate-500" />
              <span>{currentUser?.name || currentUser?.email}</span>
            </div>
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-3 py-1.5 border border-transparent rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <LogOut className="h-4 w-4 mr-1" />
              Logout
            </button>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-2xl font-semibold text-slate-800 mb-6">Welcome to your Dashboard</h2>
          <p className="text-slate-600 mb-4">
            This is a protected route. You need to be logged in to view this page.
          </p>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div 
                key={item} 
                className="bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 p-6 rounded-lg shadow-sm hover:shadow-md transition-all"
              >
                <h3 className="font-medium text-lg text-slate-800 mb-2">Card {item}</h3>
                <p className="text-slate-600">
                  This is a sample card in your protected dashboard area.
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
