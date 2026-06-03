import React from "react";

const loading = () => {
  return (
    <div className="h-110 rounded-md p-5 space-y-5 relative">
      <div className="h-[20%] bg-primary-500 rounded-md animate-pulse"></div>
      <div className="h-[80%] bg-primary-500 rounded-md animate-pulse"></div>
    </div>
  );
};

export default loading;
