import { useState, useEffect } from "react";
import { User, Lock } from "lucide-react";
import { useWebSocket } from "./webs";

export function LoginPage({ onLogin, onSwitchToSignup }) {
  const { message, sendMessage, isConnected } = useWebSocket();

  // const [isFormFilled, setIsFormFilled] = useState(false); make a button unclicakble if the form isnt filled
  const [formData, setFormData] = useState({
    type: 'log',
    username: '',
    password: '',
  });

  useEffect(() => {
    if (message && message.logbool !== null) {
      console.log(message);
      if (message.logbool) {
        onLogin();
      } else {
        alert(`Check the username or password!`);
      }
    }
  }, [message, onLogin]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.username.trim() === "" && formData.password.trim() === "") {
      console.error("Form is empty!");
      return;
    }
    if (isConnected) {
      sendMessage(formData);
    } else {
      console.error(`Websocket is not connected!`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Welcome Back</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <div className="mt-1 relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                id='username'
                required
                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your username"
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <div className="mt-1 relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="password"
                id='password'
                required
                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            disabled={!isConnected}
          >
            Sign In
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <button
            onClick={onSwitchToSignup}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}
