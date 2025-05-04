export async function fetchProfile(authenticated, setProfile) {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/rest/v1/profiles`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authenticated.access_token}`,
          apikey: process.env.REACT_APP_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) throw new Error(response.statusText);
    const data = await response.json();
    if (data.length > 0) {
      setProfile(data[0]);
    } else {
      const newProfile = await createProfile(authenticated);
      if (newProfile) setProfile(newProfile);
    }
  } catch (error) {
    console.log(error);
  }
}

export async function createProfile(authenticated) {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/rest/v1/profiles`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authenticated.access_token}`,
          apikey: process.env.REACT_APP_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uid: authenticated.user.id,
          name: "Still anonymous?",
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to insert new profile");
    }

    const data = await response.json();
    return data[0];
  } catch (error) {
    console.error("Error inserting profile:", error);
    return null;
  }
}
