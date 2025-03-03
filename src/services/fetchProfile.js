export async function fetchProfile(authenticated, setProfile)
{
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