import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.REACT_APP_API_URL,
  process.env.REACT_APP_API_KEY
);

export const uploadImage = async (avatarFile, authenticated) => {
  const { data, error } = await supabase.storage
    .from("momentum-profiles")
    .upload(`profile-pictures/${authenticated.user.id}`, avatarFile, {
      cacheControl: "3600",
      upsert: true,
    });
};
