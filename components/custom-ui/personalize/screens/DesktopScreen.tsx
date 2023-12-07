import React from "react";

const DesktopScreen = ({ children }: { children?: React.ReactNode }) => {
  return (
    <figure className="ms-auto me-20 relative z-[1] border-black max-w-full w-[80rem] h-auto rounded-b-lg shadow-[0_2.75rem_3.5rem_-2rem_rgb(45_55_75_/_20%),_0_0_5rem_-2rem_rgb(45_55_75_/_15%)] dark:shadow-[0_2.75rem_3.5rem_-2rem_rgb(0_0_0_/_20%),_0_0_5rem_-2rem_rgb(0_0_0_/_15%)]">
      <div className="relative flex items-center w-full  bg-gray-800 rounded-t-lg py-2 px-24 dark:bg-gray-700">
        <div className="flex space-x-1 absolute top-2/4 start-4 -translate-y-1">
          <span className="w-2 h-2 bg-gray-600 rounded-full dark:bg-gray-600"></span>
          <span className="w-2 h-2 bg-gray-600 rounded-full dark:bg-gray-600"></span>
          <span className="w-2 h-2 bg-gray-600 rounded-full dark:bg-gray-600"></span>
        </div>
        <div className="flex justify-center items-center w-full h-full bg-gray-700 text-[.25rem] text-gray-400 rounded-sm sm:text-[.5rem] dark:bg-gray-600 dark:text-gray-400">
          www.local.com
        </div>
      </div>

      <div className="bg-gray-800 rounded-b-lg">
        <div className="max-w-full  h-full min-h-[40rem] rounded-b-lg bg-gray-300">
          {children}
        </div>
      </div>
    </figure>
  );
};

export default DesktopScreen;
