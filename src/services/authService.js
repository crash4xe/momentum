import { createClient } from "@supabase/supabase-js";
import { jwtDecode } from "jwt-decode";

const supabase = createClient(
  process.env.REACT_APP_API_URL,
  process.env.REACT_APP_API_KEY
);

export const signUp = async (email, password) => {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });

  return { data, error };
};

export const loginUser = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) {
    return { error: error.message };
  }

  return { data };
};

export const logoutUser = async () => {
  const { error } = await supabase.auth.signOut();

  //Invalidate refresh token by calling an API

  return error;
};

export const changePassword = async (newPassword) => {
  /* Get session details */
  // const { data: { session }, error: sessionError } = await supabase.auth.getSession();
  // if (sessionError || !session) {
  //   console.log('User is not authenticated');
  //   return;
  // }

  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) {
    return error.message;
  } else {
    return "success";
  }
};

export const refreshToken = async (refresh_token) => {
  const { error } = await supabase.auth.api.refreshAccessToken(refresh_token);

  if (error) {
    console.log("Error refreshing token:", error.message);
  }
};

export function isAccessTokenExpired(access_token) {
  const decodedToken = jwtDecode(access_token);
  const currentTime = Math.floor(Date.now() / 1000);

  return decodedToken.exp < currentTime;
}

export function checkLoggedIn(setIsLoggedin, setAuthenticated) {
  const session = localStorage.getItem("sb-kkgjertrzzugmncqisbj-auth-token");

  const sessionData = session ? JSON.parse(session) : null;

  if (sessionData === null) {
    setIsLoggedin(false);
  } else {
    if (isAccessTokenExpired(sessionData.access_token)) {
      console.log("jwt expired");
      refreshToken(sessionData.refresh_token);
    }
    setAuthenticated(sessionData);
    setIsLoggedin(true);
  }
}
