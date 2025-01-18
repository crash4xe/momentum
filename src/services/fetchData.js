export async function fetchData(setTasks, authenticated) {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/rest/v1/master_view`,
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
