/**
 * Brevo (formerly Sendinblue) CRM Integration
 *
 * This utility handles email subscription for the Eva Paradis landing page.
 * The API calls can be made directly to Brevo's API or through a backend proxy.
 *
 * IMPORTANT: For production, you should use a backend proxy to protect your API key.
 * The backend implementation (app.py) is provided separately.
 */

// Configuration - Replace with actual values in production
const BREVO_API_KEY = import.meta.env.VITE_BREVO_API_KEY || "YOUR_BREVO_API_KEY";
const BREVO_API_URL = "https://api.brevo.com/v3/contacts";
const LIST_ID_EVA_MAIN = 2; // Main subscriber list ID in Brevo

// Use backend proxy in production
const USE_BACKEND_PROXY = true;
const BACKEND_API_URL = "/api/subscribe";

export interface BrevoSubscriptionResult {
  success: boolean;
  message?: string;
}

export interface BrevoContactPayload {
  email: string;
  attributes?: {
    SOURCE?: string;
    STATUS?: string;
    INTEREST?: string;
    SIGNUP_DATE?: string;
    [key: string]: string | undefined;
  };
  listIds?: number[];
  updateEnabled?: boolean;
}

/**
 * Subscribe an email to the Eva Paradis mailing list via backend proxy
 */
async function subscribeViaBackend(email: string): Promise<BrevoSubscriptionResult> {
  try {
    const response = await fetch(BACKEND_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        source: "brand_bridge",
      }),
    });

    if (response.ok) {
      return { success: true, message: "Successfully subscribed" };
    } else {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        message: errorData.message || "Failed to subscribe",
      };
    }
  } catch (error) {
    console.error("Backend subscription error:", error);
    return {
      success: false,
      message: "Network error. Please try again.",
    };
  }
}

/**
 * Subscribe an email directly to Brevo API
 * NOTE: This should only be used for development/testing.
 * In production, use the backend proxy to protect your API key.
 */
async function subscribeDirectToBrevo(email: string): Promise<BrevoSubscriptionResult> {
  const payload: BrevoContactPayload = {
    email: email,
    attributes: {
      SOURCE: "Brand_Bridge",
      STATUS: "Lead", // Browsed & Submitted, hasn't purchased yet
      INTEREST: "VR_Experience",
      SIGNUP_DATE: new Date().toISOString().split("T")[0],
    },
    listIds: [LIST_ID_EVA_MAIN],
    updateEnabled: true, // Update existing contact if email exists
  };

  try {
    const response = await fetch(BREVO_API_URL, {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "api-key": BREVO_API_KEY,
      },
      body: JSON.stringify(payload),
    });

    if (response.ok || response.status === 201 || response.status === 204) {
      return { success: true, message: "Successfully subscribed" };
    } else {
      const errorData = await response.json().catch(() => ({}));

      // Handle duplicate email (not an error in our case due to updateEnabled)
      if (response.status === 400 && errorData.code === "duplicate_parameter") {
        return { success: true, message: "Contact updated" };
      }

      return {
        success: false,
        message: errorData.message || "Failed to subscribe to mailing list",
      };
    }
  } catch (error) {
    console.error("Brevo API error:", error);
    return {
      success: false,
      message: "Unable to connect to subscription service",
    };
  }
}

/**
 * Main subscription function - uses backend proxy by default
 */
export async function subscribeToBrevo(email: string): Promise<BrevoSubscriptionResult> {
  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { success: false, message: "Please enter a valid email address" };
  }

  if (USE_BACKEND_PROXY) {
    return subscribeViaBackend(email);
  } else {
    return subscribeDirectToBrevo(email);
  }
}

/**
 * Update contact status in Brevo (e.g., when they click through to OnlyFans)
 */
export async function updateContactStatus(
  email: string,
  newStatus: "Lead" | "Hot_Lead" | "Clicker" | "Subscriber"
): Promise<BrevoSubscriptionResult> {
  const payload = {
    attributes: {
      STATUS: newStatus,
      LAST_ACTION_DATE: new Date().toISOString().split("T")[0],
    },
  };

  try {
    const response = await fetch(`${BREVO_API_URL}/${encodeURIComponent(email)}`, {
      method: "PUT",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "api-key": BREVO_API_KEY,
      },
      body: JSON.stringify(payload),
    });

    if (response.ok || response.status === 204) {
      return { success: true };
    } else {
      return { success: false, message: "Failed to update contact" };
    }
  } catch (error) {
    console.error("Brevo update error:", error);
    return { success: false, message: "Network error" };
  }
}
