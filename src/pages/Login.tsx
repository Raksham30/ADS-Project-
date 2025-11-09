import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");

    if (storedUser.email === email && storedUser.password === password) {
      localStorage.setItem("loggedIn", "true");
      navigate("/predictions");
    } else {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-background">
      <Card className="p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <Label>Email</Label>
        <Input
          className="mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
        />

        <Label>Password</Label>
        <Input
          className="mb-6"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />

        <Button onClick={handleLogin} className="w-full mb-4">
          Login
        </Button>

        <p className="text-center text-sm">
          Don’t have an account? <Link to="/signup" className="text-primary">Signup</Link>
        </p>
      </Card>
    </div>
  );
};

export default Login;
