//this service is not in use

const BUCKET_NAME = "momentum-profiles";
const folderPath = "profile-pictures/";

export const uploadImage = async (file, authenticated) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/storage/v1/object/${BUCKET_NAME}/${folderPath}${authenticated.user.id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authenticated.access_token}`,
          apikey: process.env.REACT_APP_API_KEY,
          Prefer: "return=representation",
        },
        body: formData,
      }
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Upload failed:", response.statusText);
    }
  } catch (error) {
    console.log("Error uploading file:", error);
  }
};

export const deleteImage = async (authenticated) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/storage/v1/object/${BUCKET_NAME}/profile-pictures/${authenticated.user.id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authenticated.access_token}`,
          apikey: process.env.REACT_APP_API_KEY,
          Prefer: "return=representation",
        },
      }
    );
    if (response.ok) {
      console.log("Image deleted successfully");
    } else {
      console.error("Delete failed:", response.statusText);
    }
  } catch (error) {
    console.log("Error deleting image:", error);
  }
};
