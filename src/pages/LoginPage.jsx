import { useState, useContext } from "react";
import { signInWithPopup, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, Provider, db } from "../config/firebase";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { addDoc, collection, query, where, getDocs } from "firebase/firestore";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loadingState, setLoadingState] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });

  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleFirebaseError = (error) => {
    switch (error.code) {
      case "auth/invalid-credential":
        setErrors({ email: "", password: "Invalid password or email" });
        break;
      case "auth/network-request-failed":
        setErrors({ email: "", password: "Network failure" });
        break;
      default:
        setErrors({ email: "", password: "Login failed. Please try again." });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (!user.emailVerified) {
        alert("Please verify your email before logging in.");
        await signOut(auth);
        return;
      }

      // Firestore: Only add user if it doesn't exist
      const usersRef = collection(db, 'user');
      const q = query(usersRef, where('userId', '==', user.uid));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        await addDoc(usersRef, {
          userId: user.uid,
          userName: user.displayName || "",
          phone: '',
          role: ''
        });
      }

      const token = await user.getIdToken();

      // send to backend
      await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: user.displayName,
          email: user.email,
          userId: user.uid
        }),
      });

      alert("Login successful!");
      navigate("/");
    } catch (error) {
      alert(error.message);
      handleFirebaseError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async () => {
    try {
      setLoadingState(true);

      const result = await signInWithPopup(auth, Provider);
      const user = result.user;

      // Firestore: Only add user if it doesn't exist
      const usersRef = collection(db, 'user');
      const q = query(usersRef, where('userId', '==', user.uid));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        await addDoc(usersRef, {
          userId: user.uid,
          userName: user.displayName || "",
          phone: '',
          role: ''
        });
      }

      const token = await user.getIdToken();

      // send to backend
      await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: user.displayName,
          email: user.email,
          user_uid: user.uid
        }),
      });

      navigate("/");
    } catch (error) {
      console.error("Google login failed:", error.message);
      alert(error.message);
    } finally {
      setLoadingState(false);
    }
  };

  return (
    <div>
      {!user && (
        <div className="min-h-screen flex">
          {/* Left Side - Blue Section */}
          <div className="flex-1 bg-gradient-to-br from-blue-600 to-blue-700 flex flex-col justify-center px-12 text-white relative overflow-hidden">
            <div className="relative z-10 max-w-md">
              <h1 className="text-4xl font-bold mb-4 leading-tight">
                Your money.
                <br />
                Your control.
              </h1>
              <p className="text-blue-100 text-lg leading-relaxed">
                Track every expense, set your goals, and take full control of
                your financial future.
              </p>
            </div>
            <div className="bottom-8 left-8 right-8">
              <img src="26856989_7176685-removebg-preview 1.png" alt="" />
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="flex-1 bg-white flex items-center justify-center px-8">
            <div className="w-full max-w-md">
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  Welcome back!
                </h2>
                <p className="text-gray-600">Log in to your account</p>
              </div>

              {/* Google Login */}
              <button
                onClick={handleSignIn}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors mb-6"
              >
                {loadingState && <div className="spinner border-1 w-5 h-5"></div>}
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC04" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="text-gray-700 font-medium">Continue with Google</span>
              </button>

              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">OR</span>
                </div>
              </div>

              {/* Login Form */}
              <form onSubmit={onSubmit} className="space-y-4">
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Email"
                    required
                  />
                  {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
                      placeholder="Password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                  {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
                </div>

                {/* Remember Me */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                    />
                    <span className="ml-2 text-sm text-gray-600">Remember me</span>
                  </label>
                  <Link to="/forgot-password" className="text-sm text-blue-600 hover:text-blue-500">Forgot password?</Link>
                </div>

                <button
                  type="submit"
                  disabled={loadingState}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="flex gap-2 justify-center">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                      logging in..
                    </div>
                  ) : "Log in"}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <Link to="/signup" className="text-blue-600 hover:text-blue-500 font-medium">
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
