import React from "react";

const MobileScreen = ({ children }: { children?: React.ReactNode }) => {
  return (
    <figure className="mx-auto max-w-full w-80 h-auto">
      <div className="p-2 bg-gray-800 rounded-3xl shadow-[0_2.75rem_5.5rem_-3.5rem_rgb(45_55_75_/_20%),_0_2rem_4rem_-2rem_rgb(45_55_75_/_30%),_inset_0_-0.1875rem_0.3125rem_0_rgb(45_55_75_/_20%)] dark:bg-gray-600 dark:shadow-[0_2.75rem_5.5rem_-3.5rem_rgb(0_0_0_/_20%),_0_2rem_4rem_-2rem_rgb(0_0_0_/_30%),_inset_0_-0.1875rem_0.3125rem_0_rgb(0_0_0_/_20%)]">
        <div className=" w-[19rem] bg-gray-200  h-[40rem] rounded-[1.25rem]">
          {" "}
          {children}
        </div>
      </div>
    </figure>
  );
};

export default MobileScreen;
