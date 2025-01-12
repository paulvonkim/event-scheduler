import { useState } from "react";
import { useNavigate } from "react-router-dom";

const UpdateUserProfile = ({ id, setName, name, token }) => {
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (!name) {
      setErrorMessage("Name cannot be empty");
      return;
    }

    const url = `http://localhost:3001/api/users/${id}`;
    const requestBody = {
      name: name,
    };
    try {
      const res = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });
      if (res.ok) {
        setErrorMessage("");
        navigate("/");
      } else {
        setErrorMessage("Update profile failed.");
      }
    } catch (error) {
      console.error("Error during PUT request:", error);
    }
  };
  return (
    <>
      <div className="hero">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Update Profile</h1>
            <p className="py-6">You can edit and update your name here.</p>
            <form
              className="flex flex-col gap-2 p-8"
              action="post"
              method="post"
              onSubmit={handleUpdateProfile}
            >
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70"
                >
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                </svg>
                <input
                  id="name"
                  type="name"
                  className="grow"
                  placeholder={name}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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

export default UpdateUserProfile;
