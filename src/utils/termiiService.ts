import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const termiiApiKey = process.env.TERMII_API_KEY;
const termiiSenderId = process.env.TERMII_SENDER_ID || "Scriim";
const termiiApiUrl = "https://v3.api.termii.com";

/**
 * Format phone number to Termii format (convert Nigerian numbers)
 * @param phoneNumber Phone number (must be 11 digits starting with 0)
 * @returns Formatted phone number (234...)
 */
export const formatPhoneNumber = (phoneNumber: string): string => {
  // Remove any non-digit characters
  const digitsOnly = phoneNumber.replace(/\D/g, "");

  // Check if it's a valid Nigerian number (11 digits starting with 0)
  if (digitsOnly.length === 11 && digitsOnly.startsWith("0")) {
    // Remove the leading 0 and add 234
    return `234${digitsOnly.substring(1)}`;
  }

  // Return original if not matching the pattern
  return phoneNumber;
};

/**
 * Send SMS using Termii API
 * @param to Recipient phone number
 * @param body Message content
 * @returns API response
 */
export const sendSMS = async (to: string, body: string): Promise<any> => {
  try {
    if (!termiiApiKey) {
      throw new Error("Termii API key not configured");
    }

    // Format the phone number
    const formattedNumber = formatPhoneNumber(to);

    const payload = {
      to: formattedNumber,
      sms: body,
      type: "plain",
      api_key: termiiApiKey,
      channel: "generic",
    };

    const response = await axios.post(`${termiiApiUrl}`, payload);

    console.log(
      `SMS sent to ${formattedNumber}, Message ID: ${response.data.message_id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error sending SMS:", error);
    throw error;
  }
};

/**
 * Format emergency message
 * @param userName User's name
 * @param latitude Location latitude
 * @param longitude Location longitude
 * @returns Formatted message
 */
export const formatEmergencyMessage = (
  userName: string,
  latitude: number,
  longitude: number
): string => {
  return `EMERGENCY ALERT from ${userName}! I need help! My location: https://maps.google.com/?q=${latitude},${longitude}`;
};

export default {
  sendSMS,
  formatEmergencyMessage,
  formatPhoneNumber,
};
