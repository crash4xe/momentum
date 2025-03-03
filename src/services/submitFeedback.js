export async function submitFeedback(rating, comment, authenticated) {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/rest/v1/feedback`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authenticated.access_token}`,
          apikey: process.env.REACT_APP_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rating: rating,
          feedback: comment,
          uid: authenticated.user.id,
        }),
      }
    );

    if (response.ok) {
      return response.status;
    } else {
      return response.status;
    }
  } catch (error) {
    console.log(error);
  }
}
