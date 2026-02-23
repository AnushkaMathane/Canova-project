import React, { useState } from "react";
import AuthWrapper from "../auth/AuthWrapper/AuthWrapper";
import { useDispatch, useSelector } from "react-redux";
import { setUi } from "../../utils/redux/slices/uiSlice";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const PublicWelcomeScreen = () => {
  const { formId } = useParams();
  const { ui } = useSelector((state) => state.uiSlice);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  // ✅ FIXED: no API call here
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    dispatch(
      setUi({
        ...ui,
        userEmail: email,
      })
    );

    toast.success(`Welcome!, ${email}`);

    // ✅ ONLY navigation
    navigate(`/forms/${formId}/respond`);
  };

  return (
    <div>
      <AuthWrapper>
        <h2 className="login-title">Welcome CANOVA 👋</h2>
        <p className="login-subtitle">
          Today is a new day. It's your day. You shape it.
          <br />
          Sign in to start managing your projects.
        </p>

        <form className="login-form" onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            name="email"
            type="email"
            placeholder="Example@email.com"
            required
            onChange={(e) => setEmail(e.target.value)}
          />

          <p
            style={{
              fontSize: "12px",
              color: "#777676ff",
              marginBottom: "10px",
            }}
          >
            We’ll only use your email for form-related updates 🔒
          </p>

          <button type="submit" className="login-btn">
            Continue
          </button>
        </form>
      </AuthWrapper>
    </div>
  );
};

export default PublicWelcomeScreen;