import { Request, Response } from "express";
import smsService from "../utils/smsService";
import panicModel from "../models/panic.model";
import { formatEmergencyEmail, sendEmail } from "../utils/emailService";

/**
 * Interface for expected request body
 */

interface PanicContact {
  name: string;
  phoneNumber: string;
  email?: string;
}

interface PanicRequestBody {
  name?: string;
  userName?: string;
  location: {
    latitude: number;
    longitude: number;
  };
  contacts?: PanicContact[];
  authorityType?: string;
}

/**
 * Create a new panic alert and send notifications
 */
export const createPanic = async (
  req: Request<{}, {}, PanicRequestBody>,
  res: Response
): Promise<void> => {
  try {
    const { name, userName, location, contacts, authorityType } = req.body;

    const userIdentifier = name || userName;

    if (!userIdentifier || !location || !contacts) {
      res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
      return;
    }

    const panic = new panicModel({
      userName: userIdentifier,
      location,
      contactIds: contacts?.map((c) => c.phoneNumber),
      authorityType,
    });

    await panic.save();

    // Send SMS
    let messagesSent = 0;
    for (const contact of contacts || []) {
      try {
        const message = smsService.formatEmergencyMessage(
          userIdentifier,
          location.latitude,
          location.longitude
        );
        await smsService.sendSMS(contact.phoneNumber, message);
        messagesSent++;
      } catch (error) {
        console.error(`Failed to send SMS to ${contact.phoneNumber}:`, error);
      }
    }

    // Send Emails
    let emailsSent = 0;
    for (const contact of contacts || []) {
      if (!contact.email) continue;
      try {
        const emailContent = formatEmergencyEmail(
          userIdentifier,
          location.latitude,
          location.longitude
        );
        await sendEmail(contact.email, "Emergency Alert", emailContent);
        emailsSent++;
      } catch (error) {
        console.error(`Failed to send email to ${contact.email}:`, error);
      }
    }

    res.status(201).json({
      success: true,
      message: `Panic alert created. ${messagesSent} SMS and ${emailsSent} email(s) sent.`,
      data: panic,
    });
  } catch (error) {
    console.error("Error creating panic alert:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: (error as Error).message,
    });
  }
};

/**
 * Get all panic alerts
 */
export const getAllPanics = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const panics = await panicModel.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: panics.length,
      data: panics,
    });
  } catch (error) {
    console.error("Error fetching panic alerts:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: (error as Error).message,
    });
  }
};

/**
 * Get a single panic alert by ID
 */
export const getPanicById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const panic = await panicModel.findById(req.params.id);

    if (!panic) {
      res.status(404).json({
        success: false,
        message: "Panic alert not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: panic,
    });
  } catch (error) {
    console.error("Error fetching panic alert:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: (error as Error).message,
    });
  }
};

export default {
  createPanic,
  getAllPanics,
  getPanicById,
};
