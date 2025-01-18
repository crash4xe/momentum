import { createStreak } from "./fetchStreaks";
import { fetchData } from "./fetchData";

export async function addActivity(activity, authenticated, setTasks) {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/rest/v1/activities`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authenticated.access_token}`,
          apikey: process.env.REACT_APP_API_KEY,
          "Content-Type": "application/json",
          Prefer: "return=representation",
        },
        body: JSON.stringify({
          uid: authenticated.user.id,
          activity_name: activity,
        }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      createStreak(authenticated, data[0].activity_id);
      fetchData(setTasks, authenticated);
    } else {
      throw new Error(response.statusText);
    }
  } catch (error) {
    console.log(error);
  }
}

export async function fetchActivity(setTasks, authenticated) {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/rest/v1/activities?select=*`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authenticated.access_token}`,
          apikey: process.env.REACT_APP_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      setTasks(data);
    } else {
      throw new Error(response.statusText);
    }
  } catch (error) {
    console.log(error);
  }
}

export async function removeActivity(activity_id, authenticated, setTasks) {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/rest/v1/activities?activity_id=eq.${activity_id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authenticated.access_token}`,
          apikey: process.env.REACT_APP_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      fetchData(setTasks, authenticated);
    } else {
      throw new Error(response.statusText);
    }
  } catch (error) {
    console.log(error);
  }
}

export async function updateActivity(activity_id, authenticated) {
  try {
  } catch {}
}
