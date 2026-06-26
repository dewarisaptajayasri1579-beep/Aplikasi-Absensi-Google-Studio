import React, { useState } from 'react';
import { Mail, Check, Loader2 } from 'lucide-react';
import FormInput from './FormInput.tsx';
import PasswordInput from './PasswordInput.tsx';

interface LoginFormProps {
  onSuccess?: (username: string) => void;
}

export default function LoginForm({ onSuccess }: LoginFormProps) {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Error States
  const [identifierError, setIdentifierError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [generalError, setGeneralError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const validate = (): boolean => {
    let isValid = true;
    setIdentifierError('');
    setPasswordError('');
    setGeneralError('');

    if (!identifier.trim()) {
      setIdentifierError('Email atau username wajib diisi.');
      isValid = false;
    }

    if (!password) {
      setPasswordError('Password wajib diisi.');
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsLoading(true);

    // Simulate login request to keep app interactive
    setTimeout(() => {
      setIsLoading(false);
      // Let's accept any dummy data for demo purposes
      setSuccessMsg('Masuk Berhasil! Membuka dashboard absensi...');
      if (onSuccess) {
        setTimeout(() => {
          onSuccess(identifier);
        }, 1200);
      }
    }, 1500);
  };

  return (
    <form
      id="login-form"
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 w-full max-w-full"
      noValidate
    >
      {/* Success Notification Alert */}
      {successMsg && (
        <div
          id="login-success-alert"
          className="flex items-center gap-3 p-4 bg-[#ECFDF5] border border-[#A7F3D0] text-[#065F46] rounded-[8px] text-[14px] font-medium animate-fade-in"
        >
          <div className="w-5 h-5 rounded-full bg-[#10B981] text-white flex items-center justify-center shrink-0">
            <Check size={12} strokeWidth={3} />
          </div>
          <span>{successMsg}</span>
        </div>
      )}

      {/* General Error Notification Alert */}
      {generalError && (
        <div
          id="login-error-alert"
          className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-[8px] text-[14px] font-medium animate-fade-in"
        >
          {generalError}
        </div>
      )}

      {/* Input Email / Username */}
      <FormInput
        id="email-username-input"
        label="Email / Username"
        placeholder="Masukkan email atau username"
        type="text"
        icon={Mail}
        value={identifier}
        onChange={(e) => {
          setIdentifier(e.target.value);
          if (e.target.value.trim()) setIdentifierError('');
        }}
        error={identifierError}
        autoComplete="username"
        disabled={isLoading}
      />

      {/* Input Password */}
      <PasswordInput
        id="password-input"
        label="Password"
        placeholder="Masukkan password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          if (e.target.value) setPasswordError('');
        }}
        error={passwordError}
        autoComplete="current-password"
        disabled={isLoading}
      />

      {/* Remember Me & Forgot Password Row */}
      <div id="form-options-row" className="flex items-center justify-between w-full select-none">
        <label id="remember-me-label" className="flex items-center gap-2.5 cursor-pointer text-left">
          <div className="relative flex items-center justify-center">
            <input
              id="remember-me-checkbox"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              disabled={isLoading}
              className="peer sr-only"
            />
            {/* Custom Checkbox Design matching exact Primary Blue specifications */}
            <div
              id="custom-checkbox-box"
              className="w-[20px] h-[20px] rounded-[4px] border border-[#DCE4F0] bg-white transition-all peer-checked:bg-[#0F5FEA] peer-checked:border-[#0F5FEA] flex items-center justify-center"
            >
              <Check
                size={14}
                className="text-white opacity-0 peer-checked:opacity-100 transition-opacity"
                strokeWidth={3}
              />
            </div>
          </div>
          <span className="text-[14px] font-medium text-[#66738D] peer-checked:text-[#0F1F3D] transition-colors">
            Ingat saya
          </span>
        </label>

        <a
          id="forgot-password-link"
          href="#forgot-password"
          onClick={(e) => {
            e.preventDefault();
            alert('Fitur Lupa Password sedang dalam pengembangan. Silakan hubungi Administrator HRD.');
          }}
          className="text-[14px] font-semibold text-[#0F5FEA] hover:text-[#0B1F44] transition-colors outline-none focus:underline"
        >
          Lupa Password?
        </a>
      </div>

      {/* Submit Button */}
      <button
        id="login-submit-btn"
        type="submit"
        disabled={isLoading}
        className="w-full h-[56px] bg-[#0F5FEA] hover:bg-[#0F5FEA]/95 text-white font-semibold text-[16px] rounded-[8px] transition-all duration-250 flex items-center justify-center gap-2 relative shadow-[0_8px_20px_rgba(15,95,234,0.18)] hover:shadow-[0_8px_24px_rgba(15,95,234,0.28)] disabled:opacity-75 disabled:cursor-not-allowed outline-none focus:ring-4 focus:ring-[#0F5FEA]/20"
      >
        {isLoading ? (
          <>
            <Loader2 className="animate-spin" size={20} />
            <span>Memproses...</span>
          </>
        ) : (
          <span>Masuk</span>
        )}
      </button>
    </form>
  );
}
