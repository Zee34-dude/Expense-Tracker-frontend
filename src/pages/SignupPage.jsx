import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth, database, Provider } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
  signOut,
  onAuthStateChanged,
  sendEmailVerification
} from "firebase/auth";
import { ref, set } from "firebase/database";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { UserContext } from "../context/UserContext";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loadingState, setLoadingState] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const { setUser, setAuthInitialized } = useContext(UserContext);

  const navigate = useNavigate();

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%#*?&]{8,}$/;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "password") {
      if (!passwordRegex.test(value)) {
        setPasswordError(
          "Password must be at least 8 chars, include upper, lower, number & special character."
        );
      } else {
        setPasswordError("");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!passwordRegex.test(formData.password)) {
      alert("Please choose a stronger password.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    try {
      setLoadingState(true);

      // 1️⃣ Create Firebase user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const user = userCredential.user;
      // 5️⃣ Optionally sign out (if you don’t want auto-login after signup)
      await signOut(auth);

      // 2️⃣ Update display name
      await updateProfile(user, { displayName: formData.fullName });


      await sendEmailVerification(user, {
        url: "http://localhost:5173/login", // Customize this redirect page
        handleCodeInApp: true,
      });


      alert(
        "Signup successful! A verification email has been sent to your inbox."
      );

      console.log("✅ User successfully registered in backend");


      // Force Firebase to reinitialize before redirecting
      // setAuthInitialized(false);

      // navigate("/login");
    } catch (error) {
      console.error("Signup error:", error);
      alert(error.message);
    } finally {
      // setAuthInitialized(true);
      setLoadingState(false);
    }
  };

  const API_URL = import.meta.env.VITE_API_URL + "/users";
  const handleGoogleLogin = async () => {
    try {
      setLoadingState(true);

      // 1️⃣ Sign in with Google
      const result = await signInWithPopup(auth, Provider);
      const user = result.user;
      console.log('user :', user)

      // 2️⃣ Get Firebase ID token
      const token = await user.getIdToken();

      // 3️⃣ Send user data to backend (MySQL)
      await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // backend verifies this
        },
        body: JSON.stringify({
          name: user.displayName,
          email: user.email,
          userId: user.uid
        }),
      });

      // 4️⃣ Navigate to app home
      navigate("/");
    } catch (error) {
      console.error("Google login failed:", error.message);
      alert(error.message);
    } finally {
      setLoadingState(false);
    }
  };


  return (
    <div className="flex font-sans">
      {/* Left side illustration */}
      <div className="hidden md:flex w-[522px] flex-1 bg-[#2563EB] text-white flex-col justify-center items-center p-6 text-center">
        <h1 className="text-4xl font-bold mb-4">Your money. Your control.</h1>
        <p className="text-lg max-w-xs">
          Track every expense, set your goals, and take full control of your
          financial future.
        </p>
        <div className="mt-6">
          <img
            src="26856989_7176685-removebg-preview 1.png"
            alt="Financial illustration"
            className="max-w-full h-auto"
          />
        </div>
      </div>

      {/* Signup form */}
      <div className="flex-1 flex justify-center items-center p-6">
        <div className="w-full max-w-md">
          <h2 className="text-2xl text-center font-semibold mb-2">
            Welcome Aboard!
          </h2>
          <p className="text-gray-600 text-center mb-4">
            Join thousands of users taking control of their financial goals –
            all in one place.
          </p>

          <button
            onClick={handleGoogleLogin}
            disabled={loadingState}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 hover:cursor-pointer transition-colors mb-6"
          >
            {loadingState && (
              <div className="spinner border-1 w-5 h-5 border-t-2 border-gray-600 rounded-full animate-spin"></div>
            )}
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC04"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span className="text-gray-700 font-medium">
              Continue with Google
            </span>
          </button>

          <div className="text-center my-4 text-gray-600">OR</div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="fullName"
              placeholder="Full name"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg"
            />

            {/* Password field */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                minLength={8}
                required
                className="w-full p-3 border border-gray-300 rounded-lg pr-10"
              />
              <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600"
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible size={20} />
                ) : (
                  <AiOutlineEye size={20} />
                )}
              </span>
            </div>
            {passwordError && (
              <p className="text-sm text-red-500 mt-1">{passwordError}</p>
            )}

            {/* Confirm password field */}
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
                minLength={8}
                required
                className="w-full p-3 border border-gray-300 rounded-lg pr-10"
              />
              <span
                onClick={() => setShowConfirm((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600"
              >
                {showConfirm ? (
                  <AiOutlineEyeInvisible size={20} />
                ) : (
                  <AiOutlineEye size={20} />
                )}
              </span>
            </div>

            <button
              type="submit"
              disabled={loadingState}
              className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 hover:cursor-pointer disabled:opacity-50"
            >
              {loadingState ? "Signing up..." : "Sign up"}
            </button>
          </form>

          <p className="text-center mt-4 text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 hover:text-blue-500 font-medium"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
