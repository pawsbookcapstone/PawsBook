import { db } from "@/helpers/firebase";
import { doc, setDoc } from "firebase/firestore";


export const saveItemForUser = async (
  userId: string,
  item: {
    id: string;
    title: string;
    price: number;
    images: string[];
    ownerId?: string;
  }
) => {
  try {
    if (!userId) throw new Error("User ID is required");

    // Reference to user's savedItems subcollection
    const savedRef = doc(db, "users", userId, "savedItems", item.id);

    await setDoc(savedRef, {
      title: item.title,
      price: item.price,
      images: item.images,
      ownerId: item.ownerId || null,
      savedAt: new Date(),
    });

    console.log("Item saved!");
  } catch (error) {
    console.error("Error saving item:", error);
  }
};
