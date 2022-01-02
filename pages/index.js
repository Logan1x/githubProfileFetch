import Head from "next/head";
import { useState, useEffect } from "react";

export default function Home() {
  const [user, setUser] = useState("logan1x");
  const [userData, setUserData] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const url = "https://api.github.com/users/";

  // get user data from github api
  const getUserData = async (user) => {
    try {
      const response = await fetch(url + user);
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      // console.log(error);
      setError(error);
    }
  };

  useEffect(() => {
    if (user) {
      setIsLoading(true);
      getUserData(user);
      setIsLoading(false);
    }
  }, [user]);

  console.log(userData);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl font-semibold my-4">
        Get Any Github Account Details
      </h1>
      <label htmlFor="inputUsername">Enter Github Username Below</label>
      <input
        className="border-2 border-black mb-4 text-center py-2 px-1 rounded"
        value={user}
        onChange={(e) => {
          setUser(e.target.value);
        }}
        placeholder="Enter username"
        type="text"
        id="inputUsername"
      />
      {error}
      {userData.message != "Not Found" ? (
        <div className="flex flex-col items-center justify-center border-2 border-black rounded shadow-lg p-2 mx-2 space-y-2">
          <img
            className="h-60 w-60 rounded-full shadow-lg"
            src={userData.avatar_url}
            alt="avatar"
          />
          <h1>Name : {userData.name}</h1>
          <p className="w-80 mx-auto text-center">Bio : {userData.bio}</p>
          <p>Location : {userData.location}</p>
          <p>
            Website:{" "}
            <a href={userData.blog} className="underline">
              {" "}
              {userData.blog}
            </a>
          </p>
          <p className="text-lg text-red-600">{userData.message}</p>
        </div>
      ) : (
        <p className="text-lg text-red-600">{userData.message}</p>
      )}
      <footer className="text-center text-gray-500 text-xs mt-4 ">
        Created by{" "}
        <span className="underline hover:no-underline hover:text-cyan-600 ">
          <a href="https://logan1x.github.io" className="cursor-grab">
            Logan1x
          </a>
        </span>
      </footer>
    </div>
  );
}
