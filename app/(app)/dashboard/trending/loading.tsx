import React from "react";

const loading = () => {
  return (
    <div className="h-150 rounded-md p-5 space-y-5 relative flex gap-5">
      <div className="w-[70%] bg-primary-500 rounded-md animate-pulse grow"></div>
      <div className="w-[30%] bg-primary-500 rounded-md animate-pulse grow max-lg:hidden"></div>
    </div>
  );
};

export default loading;
