import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup } from '../api/api.js';

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    phone: "",
    password: "",
    password2: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (formData.password!== formData.password2) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const data = await signup(formData);

      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);
      localStorage.setItem("is_logged_in", "true");

      setSuccess(true);
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (err) {
      let message = 'Signup failed. Please check your details.';
      try {
        const parsed = JSON.parse(err.body || '{}');
        const firstKey = Object.keys(parsed)[0];
        if (firstKey) {
          const value = parsed[firstKey];
          message = Array.isArray(value) ? value[0] : String(value);
        }
      } catch {
        if (err.body) message = err.body;
      }
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] p-4">
      <div className="absolute w-[500px] h-[500px] bg-purple-600/30 rounded-full blur-[80px] -top-52 -left-52 animate-float"></div>
      <div className="absolute w-[400px] h-[400px] bg-cyan-500/30 rounded-full blur-[80px] -bottom-40 -right-40 animate-float-delayed"></div>

      <div className="relative z-10 w-full max-w-lg bg-white/10 backdrop-blur-xl border-white/20 rounded-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] p-8 md:p-10">
        <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-2 drop-shadow-[0_2px_10px_rgba(138,43,226,0.5)]">
          Create Account
        </h1>
        <p className="text-white/70 text-center mb-8 text-sm">
        
        </p>

        {error && (
          <div className="bg-red-500/20 border-red-500/40 text-red-300 p-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-500/20 border-green-500/40 text-green-300 p-3 rounded-lg mb-4 text-sm">
            Account created! Redirecting to dashboard...
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              name="first_name"
              placeholder="First Name"
              value={formData.first_name}
              onChange={handleChange}
              required
              className="bg-white/5 border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 outline-none transition-all backdrop-blur-sm"
            />
            <input
              type="text"
              name="last_name"
              placeholder="Last Name"
              value={formData.last_name}
              onChange={handleChange}
              required
              className="bg-white/5 border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 outline-none transition-all backdrop-blur-sm"
            />
          </div>

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full bg-white/5 border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 outline-none transition-all backdrop-blur-sm"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full bg-white/5 border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 outline-none transition-all backdrop-blur-sm"
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full bg-white/5 border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 outline-none transition-all backdrop-blur-sm"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full bg-white/5 border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 outline-none transition-all backdrop-blur-sm"
          />

          <input
            type="password"
            name="password2"
            placeholder="Confirm Password"
            value={formData.password2}
            onChange={handleChange}
            required
            className="w-full bg-white/5 border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 outline-none transition-all backdrop-blur-sm"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-4 rounded-xl transition-all duration-300 shadow-lg shadow-purple-500/40 hover:shadow-purple-500/60 hover:-translate-y-1 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 mt-2"
          >
            {loading? "Creating Account..." : "Sign Up"}
          </button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/20"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-transparent px-4 text-white/60">
                Or continue with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => alert('Demo mode: Google login disabled')}
              className="bg-white/5 hover:bg-white/10 border-white/20 text-white py-3 rounded-xl transition-all backdrop-blur-sm flex items-center justify-center gap-2"
            >
              Google
            </button>
            <button
              type="button"
              onClick={() => alert('Demo mode: Facebook login disabled')}
              className="bg-white/5 hover:bg-white/10 border-white/20 text-white py-3 rounded-xl transition-all backdrop-blur-sm flex items-center justify-center gap-2"
            >
              Facebook
            </button>
          </div>
        </form>

        <p className="text-center mt-6 text-white/60 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-purple-400 font-semibold hover:text-purple-300 transition-colors"
          >
            Login here
          </Link>
        </p>
      </div>

      <style >{`
        @keyframes float {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(30px, 30px) scale(1.1);
          }
        }
       .animate-float {
          animation: float 20s infinite ease-in-out;
        }
       .animate-float-delayed {
          animation: float 15s infinite ease-in-out reverse;
        }
      `}</style>
    </div>
  );
}

export default Signup;