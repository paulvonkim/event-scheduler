import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignIn = ({ setAuthenticated, setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage("Please fill in both email and password");
      return;
    }

    const url = "http://localhost:3001/api/auth/login";
    const requestBody = {
      email: email,
      password: password,
    };

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
      if (res.ok) {
        const data = await res.json();
        setErrorMessage("");
        setAuthenticated(true);
        setToken(data.token);
        localStorage.setItem("token", JSON.stringify(data.token));
        navigate("/");
      } else {
        setErrorMessage("Sign in failed, please try again.");
        setAuthenticated(false);
      }
    } catch (error) {
      console.error("Error during POST request:", error);
    }
  };

  return (
    <>
      <div className="hero">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Sign In</h1>
            <p className="py-6">
              Access your account to continue to your events.
              <br />
              Don’t have an account?{" "}
              <a className="text-blue-500 hover:underline" href="/signup">
                Sign Up
              </a>
            </p>
            <form
              className="flex flex-col gap-2 p-8"
              action="post"
              method="post"
              onSubmit={handleSignIn}
            >
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70"
                >
                  <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                  <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                </svg>
                <input
                  id="email"
                  type="email"
                  className="grow"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>

              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  id="password"
                  type="password"
                  className="grow"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
              {errorMessage && (
                <p className="text-red-500 text-sm">{errorMessage}</p>
              )}
              <input type="submit" value="Submit" className="btn btn-neutral" />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
