import { useNavigate } from "react-router-dom";

export default function Error({ code = "404", message }) {
  const navigate = useNavigate();

  const errorMessages = {
    404: "Page Not Found",
    403: "Unauthorized Access",
    500: "Internal Server Error",
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800 dark:text-gray-200">
          {code}
        </h1>
        <p className="text-xl mt-4 text-gray-600 dark:text-gray-400">
          {message || errorMessages[code]}
        </p>
        <button
          onClick={() => navigate(-1)}
          className="mt-8 px-6 py-3 bg-primary text-white rounded-lg hover:bg-opacity-90"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}
