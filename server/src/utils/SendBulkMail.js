import Adoption from "../models/Adoption.Model.js";
import { sendEmail } from "./Mail.js";

export const sendBulkMail = async (petID) => {
  const adoptionList = await Adoption.find({ pet: petID }).populate([
    {
      path: "user",
      select: "email fullname",
    },
    {
      path: "pet",
      select: "name",
      populate: {
        path: "category",
        select: "name",
      },
    },
  ]);

  const data = adoptionList.map((doc) => ({
    email: doc.user?.email,
    fullname: doc.user?.fullname,
    petName: doc.pet?.name,
    category: doc.pet?.category?.name,
    status: doc.status,
    adoptionId: doc._id,
  }));

  // send emails safely in sequence
  for (const entry of data) {
    await sendEmail(entry);
  }
};
