import mongoose, { Document, Schema } from "mongoose";

interface Contact {
  name: string;
  phoneNumber: string;
  email?: string;
}

export interface IPanic extends Document {
  userName: string;
  location: {
    latitude: number;
    longitude: number;
  };
  contacts?: Contact[];
  authorityType?: "police" | "hospital" | "fire";
  status: "pending" | "sent" | "failed";
  createdAt: Date;
}

const ContactSchema: Schema = new Schema({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: false },
});

const PanicSchema: Schema = new Schema({
  userName: { type: String, required: true },
  location: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
  contacts: {
    type: [ContactSchema], // Changed from contactIds to contacts with the ContactSchema
    required: true,
  },
  authorityType: {
    type: String,
    enum: ["police", "hospital", "fire"],
    required: false,
  },
  status: {
    type: String,
    enum: ["pending", "sent", "failed"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<IPanic>("Panic", PanicSchema);
