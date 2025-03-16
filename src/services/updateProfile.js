export async function updateProfile(authenticated, name, setProfile) {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/rest/v1/profiles?uid=eq.${authenticated.user.id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${authenticated.access_token}`,
          apikey: process.env.REACT_APP_API_KEY,
          "Content-Type": "application/json",
          Prefer: "return=representation",
        },
        body: JSON.stringify({ name: name }),
      }
    );
    if (response.ok) {
      const data = await response.json();
      setProfile(data[0]);
    } else {
      throw new Error(response.statusText);
    }
  } catch (error) {
    console.log(error);
  }
}

export async function removePhoto(authenticated, setProfile, url) {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/rest/v1/profiles?uid=eq.${authenticated.user.id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${authenticated.access_token}`,
          apikey: process.env.REACT_APP_API_KEY,
          "Content-Type": "application/json",
          Prefer: "return=representation",
        },
        body: JSON.stringify({ url: url, expiry: url }),
      }
    );
    if (response.ok) {
      const data = await response.json();
      setProfile(data[0]);
    } else {
      throw new Error(response.statusText);
    }
  } catch (error) {
    console.log(error);
  }
}

export async function addPhoto(authenticated, setProfile, url, expiry) {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/rest/v1/profiles?uid=eq.${authenticated.user.id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${authenticated.access_token}`,
          apikey: process.env.REACT_APP_API_KEY,
          "Content-Type": "application/json",
          Prefer: "return=representation",
        },
        body: JSON.stringify({ url: url, expiry: expiry }),
      }
    );
    if (response.ok) {
      const data = await response.json();
      setProfile(data[0]);
    } else {
      throw new Error(response.statusText);
    }
  } catch (error) {
    console.log(error);
  }
}
