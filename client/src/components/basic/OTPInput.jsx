import { useState, useEffect } from "react";
import { Button } from "./Button";
import { FormInput } from "./FormInput";

export const OTPInput = ({
  type,
  isVerified,
  onVerificationSuccess,
  showInput,
  onSendOTP,
}) => {
  const [otp, setOtp] = useState("");
  const [countdown, setCountdown] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleSendOTP = async () => {
    setIsLoading(true);
    try {
      await onSendOTP();
      setCountdown(60);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = async () => {
    setIsLoading(true);
    try {
      await onVerificationSuccess(otp);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mb-4">
      {!isVerified && (
        <Button
          type="button"
          variant="outline"
          onClick={handleSendOTP}
          disabled={countdown > 0 || isLoading}
          isLoading={isLoading && !showInput}
        >
          {showInput
            ? countdown > 0
              ? `Resend OTP in ${countdown}s`
              : "Resend OTP"
            : `Verify ${type}`}
        </Button>
      )}

      {showInput && !isVerified && (
        <div className="mt-2 flex gap-2">
          <FormInput
            type="text"
            name="otp"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value.toUpperCase())}
            required
            maxLength={6}
          />
          <Button
            type="button"
            variant="primary"
            onClick={handleVerify}
            disabled={otp.length !== 6 || isLoading}
            isLoading={isLoading && showInput}
          >
            Verify
          </Button>
        </div>
      )}

      {isVerified && (
        <p className="text-sm text-[var(--success-color)]">✓ {type} verified</p>
      )}
    </div>
  );
};
