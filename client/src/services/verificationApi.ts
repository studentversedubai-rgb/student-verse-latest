/**
 * Verification API Service
 *
 * This module provides a clean interface for email verification and OTP operations.
 * Currently uses mock implementations that can be easily swapped with real backend endpoints.
 *
 * Integration Points:
 * - POST /api/verification/send-otp
 * - POST /api/verification/verify-otp
 * - POST /api/verification/resend-otp
 */

import storage from "../utils/storage";

// ============================================================================
// Types & Interfaces
// ============================================================================

export interface SendOTPRequest {
  email: string;
}

export interface SendOTPResponse {
  success: boolean;
  message: string;
  expiresAt?: number; // Unix timestamp
  cooldownUntil?: number; // Unix timestamp for rate limiting
}

export interface VerifyOTPRequest {
  email: string;
  otp: string;
}

export interface VerifyOTPResponse {
  success: boolean;
  message: string;
  verified?: boolean;
  attemptsRemaining?: number;
  lockedUntil?: number; // Unix timestamp if account is locked
}

export interface ResendOTPRequest {
  email: string;
}

export interface ResendOTPResponse {
  success: boolean;
  message: string;
  expiresAt?: number;
  cooldownUntil?: number;
  resendCount?: number;
}

export interface VerificationState {
  email: string;
  otp: string;
  expiresAt: number;
  attempts: number;
  resendCount: number;
  lastResendAt: number;
  lockedUntil: number | null;
}

// ============================================================================
// Configuration
// ============================================================================

export const VERIFICATION_CONFIG = {
  OTP_LENGTH: 6,
  OTP_EXPIRY_MS: 5 * 60 * 1000, // 5 minutes
  RESEND_COOLDOWN_MS: 60 * 1000, // 60 seconds
  MAX_ATTEMPTS: 5,
  MAX_RESENDS: 3,
  LOCKOUT_DURATION_MS: 15 * 60 * 1000, // 15 minutes
} as const;

// ============================================================================
// Mock Storage (Replace with real API calls)
// ============================================================================

const VERIFICATION_STORAGE_KEY = "sv_verification_state";

const getVerificationState = (): VerificationState | null => {
  if (typeof window === "undefined") return null;
  const stored = storage.get<VerificationState>(VERIFICATION_STORAGE_KEY);
  return stored;
};

const setVerificationState = (state: VerificationState): void => {
  if (typeof window === "undefined") return;
  storage.set(VERIFICATION_STORAGE_KEY, state);
};

const clearVerificationState = (): void => {
  if (typeof window === "undefined") return;
  storage.remove(VERIFICATION_STORAGE_KEY);
};

// Generate a random 6-digit OTP
const generateOTP = (): string => {
  // Default OTP for testing purposes - always returns 111111
  return "111111";
};

// ============================================================================
// API Methods (Mock Implementation - Ready for Backend Integration)
// ============================================================================

/**
 * Send OTP to the specified email address
 *
 * Makes a POST request to the backend API endpoint.
 * Uses the VITE_API_URL environment variable to construct the full API URL.
 */
export const sendOTP = async (
  request: SendOTPRequest,
): Promise<SendOTPResponse> => {
  try {
    const apiUrl = import.meta.env.VITE_API_URL;
    if (!apiUrl) {
      throw new Error(
        "VITE_API_URL is not configured in environment variables",
      );
    }

    const response = await fetch(`${apiUrl}/api/waitlist/join`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: request.email }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `HTTP ${response.status}: Failed to send OTP`,
      );
    }

    const result = await response.json();
    return {
      success: result.ok,
      message: result.message || "Verification code sent to your email.",
      expiresAt: Date.now() + VERIFICATION_CONFIG.OTP_EXPIRY_MS,
    };
  } catch (error) {
    console.error("Error sending OTP:", error);
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to send verification code. Please try again.",
    };
  }
};

/**
 * Verify the OTP entered by the user
 *
 * Makes a POST request to the backend API endpoint.
 * Uses the VITE_API_URL environment variable to construct the full API URL.
 * Returns user data (referralCode, referralCount, waitlistPosition) which should be stored client-side.
 */
export const verifyOTP = async (
  request: VerifyOTPRequest,
): Promise<VerifyOTPResponse> => {
  try {
    const apiUrl = import.meta.env.VITE_API_URL;
    if (!apiUrl) {
      throw new Error(
        "VITE_API_URL is not configured in environment variables",
      );
    }

    const response = await fetch(`${apiUrl}/api/auth/verify-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `HTTP ${response.status}: Failed to verify OTP`,
      );
    }

    const result = await response.json();
    return {
      success: result.ok,
      message: result.message || "Email verified successfully!",
      verified: result.ok,
    };
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to verify code. Please try again.",
      verified: false,
    };
  }
};

/**
 * Resend OTP to the specified email
 *
 * Makes a POST request to the backend API endpoint.
 * Uses the VITE_API_URL environment variable to construct the full API URL.
 * This is handled by the backend - just calls /api/waitlist/join again
 */
export const resendOTP = async (
  request: ResendOTPRequest,
): Promise<ResendOTPResponse> => {
  try {
    const apiUrl = import.meta.env.VITE_API_URL;
    if (!apiUrl) {
      throw new Error(
        "VITE_API_URL is not configured in environment variables",
      );
    }

    const response = await fetch(`${apiUrl}/api/waitlist/join`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: request.email }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `HTTP ${response.status}: Failed to resend OTP`,
      );
    }

    const result = await response.json();
    return {
      success: result.ok,
      message: result.message || "New verification code sent.",
      expiresAt: Date.now() + VERIFICATION_CONFIG.OTP_EXPIRY_MS,
    };
  } catch (error) {
    console.error("Error resending OTP:", error);
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to resend code. Please try again.",
    };
  }
};

/**
 * Get current verification status (for UI state restoration)
 */
export const getVerificationStatus = (): {
  inProgress: boolean;
  email?: string;
  expiresAt?: number;
  attemptsRemaining?: number;
  lockedUntil?: number | null;
  canResend?: boolean;
  resendCooldownUntil?: number;
} => {
  const state = getVerificationState();

  if (!state) {
    return { inProgress: false };
  }

  const now = Date.now();
  const isExpired = now > state.expiresAt;
  const isLocked = state.lockedUntil && now < state.lockedUntil;
  const resendCooldownUntil =
    state.lastResendAt + VERIFICATION_CONFIG.RESEND_COOLDOWN_MS;
  const canResend =
    now > resendCooldownUntil &&
    state.resendCount < VERIFICATION_CONFIG.MAX_RESENDS;

  return {
    inProgress: !isExpired && !isLocked,
    email: state.email,
    expiresAt: state.expiresAt,
    attemptsRemaining: VERIFICATION_CONFIG.MAX_ATTEMPTS - state.attempts,
    lockedUntil: state.lockedUntil,
    canResend,
    resendCooldownUntil: canResend ? undefined : resendCooldownUntil,
  };
};

/**
 * Clear verification state (for logout or reset)
 */
export const resetVerification = (): void => {
  clearVerificationState();
};

export default {
  sendOTP,
  verifyOTP,
  resendOTP,
  getVerificationStatus,
  resetVerification,
  VERIFICATION_CONFIG,
};
