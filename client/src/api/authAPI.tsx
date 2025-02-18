import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {
  // make a POST request to the login route
  try {
    const res = await fetch ('auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    });
    const data = await res.json();

    if (!res.ok) {
      throw new Error('Cannot Fetch Data')
    }
    return data;
  } catch (err: any) {
    console.error("Error Authenticating", err)
    return Promise.reject('Cannot Fetch User Data')
  }
}
export { login };
