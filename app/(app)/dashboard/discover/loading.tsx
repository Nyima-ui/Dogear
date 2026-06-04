import React from "react";

const loading = () => {
  return (
    <div className="flex gap-10 mt-3">
      <div className="grow space-y-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <li className="bg-background h-[138px] min-w-[412px] list-none p-4 flex gap-5" key={i}>
            <div className="w-[82px] h-full bg-primary-600 animate-pulse"></div>
            <div className="space-y-5">
              <div className="bg-primary-600 h-7 w-80 animate-pulse"></div>
              <div className="bg-primary-600 h-7 w-50 animate-pulse"></div>
            </div>
          </li>
        ))}
      </div>
      <div className="bg-background grow max-lg:hidden items-start">
        <div className="flex gap-5">
          <div className="w-[82px] h-30 bg-primary-600 animate-pulse"></div>
          <div className="space-y-5">
            <div className="bg-primary-600 h-7 w-80 animate-pulse"></div>
            <div className="bg-primary-600 h-7 w-50 animate-pulse"></div>
          </div>
        </div>

        <div className="bg-primary-600 h-120 w-full animate-pulse mt-5"></div>
      </div>
    </div>
  );
};

export default loading;
