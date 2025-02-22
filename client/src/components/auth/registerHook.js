import { useState } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { authAPI } from "../../services/api";
import { setCredentials } from "../../store/slices/authSlice";

export function useRegister() {
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

	return {
		t,
		formData,
		setFormData,
		handleSubmit,
	};
}
