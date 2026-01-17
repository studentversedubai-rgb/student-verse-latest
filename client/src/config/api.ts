/**
 * API Configuration
 *
 * Centralized configuration for API endpoints.
 * Uses environment variables (VITE_API_URL) for the base URL.
 * Falls back to Railway production URL if env var is missing.
 *
 * Environment Variables:
 * - VITE_API_URL: Base URL for the backend API (e.g., https://website-backend-production-fda7.up.railway.app)
 */

// Default Railway production URL
const DEFAULT_API_URL =
  "https://website-backend-production-fda7.up.railway.app";

// Get API URL from environment, with fallback
const getApiUrl = (): string => {
  // Use environment variable if available (set in .env file)
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }

  // Fallback to default production URL
  console.warn(
    "VITE_API_URL not configured. Using default Railway backend URL.",
    "To customize, set VITE_API_URL in .env file",
  );
  return DEFAULT_API_URL;
};

// API Configuration object
export const API_CONFIG = {
  // Base URL for all API endpoints
  BASE_URL: getApiUrl(),

  // API Routes
  ENDPOINTS: {
    WAITLIST_JOIN: "/api/waitlist/join",
    AUTH_VERIFY_OTP: "/api/auth/verify-otp",
    CONTACT_SUBMIT: "/api/contact/submit",
  },
} as const;

/**
 * Helper function to construct full API URLs
 * @param endpoint - The relative API endpoint path
 * @returns Full API URL
 */
export const getApiUrl_v2 = (endpoint: string): string => {
  const baseUrl = API_CONFIG.BASE_URL.replace(/\/$/, ""); // Remove trailing slash
  const endpointPath = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  return `${baseUrl}${endpointPath}`;
};

export default API_CONFIG;
