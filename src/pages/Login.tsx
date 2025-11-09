import { useState } from "react";
import { auth, googleProvider } from "@/firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("loggedIn", "true");
      navigate("/");
    } catch (error: any) {
      alert("Login Error: " + error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      localStorage.setItem("loggedIn", "true");
      navigate("/");
    } catch (error: any) {
      alert("Google Auth Error: " + error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background px-4">
      <div className="p-8 rounded-2xl shadow-lg border max-w-md w-full bg-card">
        <h2 className="text-3xl font-bold text-center mb-6">Welcome Back</h2>

        {/* Email */}
        <div className="mb-4">
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-muted-foreground w-5 h-5" />
            <Input
              type="email"
              placeholder="Email address"
              className="pl-10 h-12"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        {/* Password */}
        <div className="mb-6">
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-muted-foreground w-5 h-5" />
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="pl-10 pr-10 h-12"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5 text-muted-foreground" />
              ) : (
                <Eye className="w-5 h-5 text-muted-foreground" />
              )}
            </button>
          </div>
        </div>

        <Button className="w-full h-12 mb-4" onClick={handleLogin}>
          Login
        </Button>

        <Button
          variant="outline"
          className="w-full h-12 flex items-center justify-center gap-2"
          onClick={handleGoogleLogin}
        >
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" />
          Continue with Google
        </Button>

        <p className="text-center text-sm text-muted-foreground mt-4">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-primary hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
