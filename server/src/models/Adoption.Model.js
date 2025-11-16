import { Schema, model } from "mongoose";

const AdoptionSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    pet: {
      type: Schema.Types.ObjectId,
      ref: "Pet",
      required: true,
    },
    shop: {
      type: Schema.Types.ObjectId,
      ref: "Shop",
      required: true,
    },
    status: {
      type: String,
      enum: ["approved", "pending", "rejected"],
      default: "pending",
    },
    requestDate: {
      type: Date,
      default: Date.now(),
    },
    approvedDate: {
      type: Date
    },
  },
  { timestamps: true }
);

const Adoption = model("Adoption",AdoptionSchema);
export default Adoption;