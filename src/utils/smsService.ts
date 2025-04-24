import twilio from "twilio";
import dotenv from "dotenv";

dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

// Initialize Twilio client
const client = twilio(accountSid, authToken);

/**
 * Send SMS message using Twilio
 * @param to Recipient phone number
 * @param body Message content
 * @returns Promise with message details
 */
export const sendSMS = async (to: string, body: string): Promise<any> => {
  try {
    if (!accountSid || !authToken || !twilioPhoneNumber) {
      throw new Error("Twilio credentials not configured");
    }

    const message = await client.messages.create({
      body,
      from: twilioPhoneNumber,
      to,
    });

    console.log(`SMS sent to ${to}, SID: ${message.sid}`);
    return message;
  } catch (error) {
    console.error("Error sending SMS:", error);
    throw error;
  }
};

/**
 * Format emergency message with location
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
};
