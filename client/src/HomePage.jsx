import React, { useState, useEffect } from "react";
import { getTest } from "./functions/test";

const HomePage = () => {
  const [data, setData] = useState("API Test");

  useEffect(() => {
    getTest()
      .then((res) => {
        setData(res.message);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 text-gray-900 flex flex-col justify-center items-center text-center p-6 animate-fade-in">
      <h1 className="text-6xl font-extrabold mb-6 text-blue-700 drop-shadow-lg animate-pulse">
        🚀 Hub Zero is Evolving! 🚀
      </h1>
      <p className="text-2xl mb-4 font-semibold max-w-lg text-gray-800">
        Something big is coming! We're upgrading to a powerful, React-driven experience.
      </p>
      <p className="text-lg text-gray-700 mb-4 max-w-md">
        Stay tuned for a faster, more interactive platform that will redefine the way you engage with us!
      </p>
      <p className="text-md text-gray-500 mt-4 italic">
        For early access and updates, reach out to us at{" "}
        <a href="mailto:contact@hubzero.in" className="text-blue-600 hover:underline font-semibold">
          contact@hubzero.in
        </a>
      </p>
      <h2 className="mt-6 text-xl text-gray-600">{data}</h2>
    </div>
  );
};

export default HomePage;
