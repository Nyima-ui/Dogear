import React from "react";

const loading = () => {
  return (
      <div className="h-[90vh] flex flex-col gap-8 mt-5">
         <div className="bg-primary-600 animate-pulse h-full max-h-[50%] rounded-md"></div>
         <div className="h-full flex gap-5 flex-wrap">
           <div className="bg-primary-600 animate-pulse grow h-full rounded-md min-w-[445px]"></div>
           <div className="bg-primary-600 animate-pulse grow h-full rounded-md min-w-[445px]"></div>
           <div className="bg-primary-600 animate-pulse grow h-full rounded-md min-w-[445px]"></div>
         </div>
      </div>
  );
};

export default loading;
