import { fetchData } from "./fetchData";

// export async function fetchStreak(setStreaks, authenticated) {
//   try {
//     const response = await fetch(
//       `${process.env.REACT_APP_API_URL}/rest/v1/streaks`,
//       {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${authenticated.access_token}`,
//           apikey: process.env.REACT_APP_API_KEY,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     if (response.ok) {
//       const data = await response.json();
//       setStreaks(data);
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }

export async function fetchStreak(setStreaks, authenticated) {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/rest/v1/streak_view`,
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
      setStreaks(data);
    } else {
      throw new Error(response.statusText);
    }
  } catch (error) {
    console.log(error);
  }
}

export async function createStreak(authenticated, id) {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/rest/v1/streaks`,
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
          activity_id: id,
        }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      return data[0].streak_id;
    } else {
      throw new Error(response.statusText);
    }
  } catch (error) {
    console.log(error);
  }
}

export async function updateStreak(task, authenticated, setTasks, setStreaks) {
  const today = new Date();
  const todayDate = today.toLocaleDateString();
  let payload = {};
  let streakId = task.streak_id;
  if (task.start_date === null && task.end_date === null && task.streak === 0) {
    payload = {
      start_date: todayDate,
      end_date: todayDate,
      completed: true,
      streak: task.streak + 1,
    };
  }
  if (task.start_date !== null && task.end_date !== null && task.streak !== 0) {
    payload = {
      end_date: todayDate,
      completed: true,
      streak: task.streak + 1,
    };
  }
  if (task.start_date !== null && task.end_date !== null && task.streak === 0) {
    streakId = await createStreak(authenticated, task.activity_id);
    payload = {
      start_date: todayDate,
      end_date: todayDate,
      completed: true,
      streak: task.streak + 1,
    };
  }

  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/rest/v1/streaks?streak_id=eq.${streakId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${authenticated.access_token}`,
          apikey: process.env.REACT_APP_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      throw new Error(response.statusText);
    } else {
      fetchData(setTasks, authenticated);
      fetchStreak(setStreaks, authenticated);
    }
  } catch (error) {
    console.log(error);
  }
}

export async function removeStreak(activity_id, authenticated) {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/rest/v1/streaks?activity_id=eq.${activity_id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authenticated.access_token}`,
          apikey: process.env.REACT_APP_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(response.statusText);
    }
  } catch (error) {
    console.log(error);
  }
}
