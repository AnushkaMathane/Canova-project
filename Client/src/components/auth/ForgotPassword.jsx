import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import AuthWrapper from "./AuthWrapper/AuthWrapper";
import { useAuthenticationMutation } from "../../utils/redux/api/AuthAPI";

const ForgotPassword = () => {
  const [isOTPSent, setIsOTPSent] = useState(false);
  const [email, setEmail] = useState("");
  const [OTP, setOTP] = useState("");
  const [error, setError] = useState({});
  const [authentication, { isLoading }] = useAuthenticationMutation();
  const navigate = useNavigate();

  // ✅ STEP 1: SEND OTP (forgot-password)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { token } = await authentication({
        action: "forgot-password",
        email,
      }).unwrap();

      // 🔴 TOKEN SAVE HERE (VERY IMPORTANT)
      localStorage.setItem("resetToken", token);

      setIsOTPSent(true);
    } catch (error) {
      console.log("Password reset error:", error);
      if (error?.data?.error?.includes("User not found")) {
        setError({ emailError: true });
      }
    }
  };

  // ✅ STEP 2: VERIFY OTP
  const submitOTP = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("resetToken");

      const { message } = await authentication({
        action: "verify-otp",   // ✅ CORRECT ACTION
        otp: OTP,
        email,
        token,                  // ✅ JWT TOKEN PASS
      }).unwrap();

      if (message.includes("OTP verified")) {
        navigate("/reset-password", { state: { email } });
      }
    } catch (error) {
      console.log("OTP error:", error);
      if (error?.data?.error?.includes("Invalid or expired OTP")) {
        setError({ otpError: true });
      }
    }
  };

  return (
    <AuthWrapper>
      {!isOTPSent && (
        <>
          <h2 className="login-title">Welcome CANOVA 👋</h2>
          <p className="login-subtitle">
            Please enter your registered email ID to receive an OTP
          </p>
          <form className="login-form" onSubmit={handleSubmit}>
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your registered email"
              required
              onChange={(e) => {
                setEmail(e.target.value);
                setError({});
              }}
            />
            {error.emailError && <div className="error">Email not found</div>}

            <button type="submit" className="login-btn" disabled={isLoading}>
              {isLoading ? "Sending..." : "Send Mail"}
            </button>
          </form>
        </>
      )}

      {isOTPSent && (
        <>
          <h2 className="login-title">Enter Your OTP</h2>
          <p className="login-subtitle">
            We’ve sent a 6-digit OTP to your registered mail.
          </p>
          <form className="login-form" onSubmit={submitOTP}>
            <label>OTP</label>
            <input
              type="text"
              placeholder="Enter your OTP"
              required
              onChange={(e) => {
                setOTP(e.target.value);
                setError({});
              }}
            />
            {error.otpError && (
              <div className="error">Invalid or expired OTP</div>
            )}

            <button type="submit" className="login-btn" disabled={isLoading}>
              {isLoading ? "Verifying..." : "Confirm"}
            </button>
          </form>
        </>
      )}
    </AuthWrapper>
  );
};

export default ForgotPassword;