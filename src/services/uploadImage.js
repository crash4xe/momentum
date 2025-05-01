import { supabase } from "./authService";

export const uploadImage = async (file, authenticated) => {
  try {
    const { data, error } = await supabase.storage
      .from("momentum-profiles")
      .update(`${authenticated.user.id}`, file, {
        cacheControl: "3600",
        upsert: true,
      });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw new Error("Failed to upload image. Please try again");
  }
};

export const getURL = async (authenticated) => {
  try {
    const { data, error } = await supabase.storage
      .from("momentum-profiles")
      .createSignedUrl(`${authenticated.user.id}`, 7 * 86400);
    if (error) {
      throw new Error(error.message);
    }

    const today = new Date();
    const futureDate = new Date(today);
    futureDate.setDate(today.getDate() + 7);

    const formattedDate = futureDate.toISOString().split("T")[0];

    return { imageUrl: data.signedUrl, expiry: formattedDate };
  } catch (error) {
    throw new Error("Error getting the URL");
  }
};

export const deleteImage = async (authenticated) => {
  const { data } = await supabase.storage
    .from("momentum-profiles")
    .remove([`${authenticated.user.id}`]);

  return data;
};
