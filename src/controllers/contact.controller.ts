// import { Request, Response } from "express";
// import contactModel from "../models/contact.model";

// /**
//  * Create a new contact
//  */
// export const createContact = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   try {
//     const { name, phoneNumber, email, userId } = req.body;

//     // Validate required fields
//     if (!name || !phoneNumber || !userId) {
//       res.status(400).json({
//         success: false,
//         message: "Missing required fields",
//       });
//       return;
//     }

//     // Create contact
//     const contact = new contactModel({
//       name,
//       phoneNumber,
//       userId,
//     });

//     await contact.save();

//     res.status(201).json({
//       success: true,
//       data: contact,
//     });
//   } catch (error) {
//     console.error("Error creating contact:", error);
//     res.status(500).json({
//       success: false,
//       message: "Server error",
//       error: (error as Error).message,
//     });
//   }
// };

// /**
//  * Get all contacts for a user
//  */
// export const getContactsByUserId = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   try {
//     const { userId } = req.params;

//     if (!userId) {
//       res.status(400).json({
//         success: false,
//         message: "User ID is required",
//       });
//       return;
//     }

//     const contacts = await Contact.find({ userId }).sort({ name: 1 });

//     res.status(200).json({
//       success: true,
//       count: contacts.length,
//       data: contacts,
//     });
//   } catch (error) {
//     console.error("Error fetching contacts:", error);
//     res.status(500).json({
//       success: false,
//       message: "Server error",
//       error: (error as Error).message,
//     });
//   }
// };

// /**
//  * Delete a contact
//  */
// export const deleteContact = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   try {
//     const { id } = req.params;

//     const contact = await Contact.findByIdAndDelete(id);

//     if (!contact) {
//       res.status(404).json({
//         success: false,
//         message: "Contact not found",
//       });
//       return;
//     }

//     res.status(200).json({
//       success: true,
//       message: "Contact deleted successfully",
//     });
//   } catch (error) {
//     console.error("Error deleting contact:", error);
//     res.status(500).json({
//       success: false,
//       message: "Server error",
//       error: (error as Error).message,
//     });
//   }
// };

// export default {
//   createContact,
//   getContactsByUserId,
//   deleteContact,
// };
