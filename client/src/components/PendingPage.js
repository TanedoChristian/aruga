import React from "react";

const PendingPage = () => {
  return (
    <div className="w-full h-screen bg-rose-300">
      <div className="flex flex-col w-full h-screen justify-center">
        <div className="flex flex-col items-center">
          <h1 className="text-white poppins text-[2.5rem]">Account on Hold</h1>
          <p className="text-sm text-white">
            Submit & Verify your account to nearest Aruga Office
          </p>
          <button
            className="p-3 mt-10 rounded-full text-rose-400 bg-white"
            onClick={() => {
              sessionStorage.clear();
              window.location.href = "/login";
            }}
          >
            Go back to login
          </button>
        </div>
      </div>
    </div>
  );
};

export default PendingPage;
