import { useState } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import { useNavigate } from "react-router-dom";
import { setCredentials } from "../../store/slices/authSlice";
import { authAPI } from "../../services/api";

export function useLogin() {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const { data } = await authAPI.login(formData);
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
