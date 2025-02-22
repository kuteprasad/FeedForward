
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { authAPI } from "../../services/api";
import { setCredentials } from "../../store/slices/authSlice";
import Navbar from "../layout/Navbar";

export default function Register() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    role: "user",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await authAPI.register(formData);
      dispatch(setCredentials(data));
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-[var(--background)]">
        <form
          onSubmit={handleSubmit}
          className="w-96 p-8 rounded-lg shadow-md bg-[var(--input-bg)] border border-[var(--border)]"
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-[var(--text)]">
            {t("register")}
          </h2>
          
          <div className="space-y-4">
            <input
              type="email"
              placeholder={t("email")}
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full p-2 rounded-lg bg-[var(--input-bg)] text-[var(--input-text)] border border-[var(--input-border)] focus:border-[var(--input-focus)] focus:outline-none"
            />
            <input
              type="text"
              placeholder={t("username")}
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              className="w-full p-2 rounded-lg bg-[var(--input-bg)] text-[var(--input-text)] border border-[var(--input-border)] focus:border-[var(--input-focus)] focus:outline-none"
            />
            <input
              type="password"
              placeholder={t("password")}
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full p-2 rounded-lg bg-[var(--input-bg)] text-[var(--input-text)] border border-[var(--input-border)] focus:border-[var(--input-focus)] focus:outline-none"
            />
            <button
              type="submit"
              className="w-full bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] p-2 rounded-lg hover:bg-[var(--btn-primary-hover)]"
            >
              {t("register")}
            </button>
          </div>
        </form>
      </div>
    </>
  );
>>>>>>> main
}
