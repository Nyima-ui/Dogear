import styles from "./page.module.css";

const TestPage = () => {
  return (
    <div>
      {/* <span className={styles.loader}></span>

      <div className={styles.parent}></div> */}

      {/* <div
        className={`${styles.shimmer} h-110 rounded-md p-5 space-y-5 relative`}
      >
        <div className="h-[20%] bg-primary-500/50 rounded-md"></div>
        <div className="h-[80%] bg-primary-500/50 rounded-md"></div>
      </div> */}

      {/* <div className="h-110 rounded-md p-5 space-y-5 relative">
        <div className="h-[20%] bg-primary-500 rounded-md animate-pulse"></div>
        <div className="h-[80%] bg-primary-500 rounded-md animate-pulse"></div>
      </div> */}

      {/* <div className="h-110 rounded-md p-5 space-y-5 relative flex gap-5 border">
        <div className="w-[70%] bg-primary-600 rounded-md animate-pulse grow"></div>
        <div className="w-[30%] bg-primary-600 rounded-md animate-pulse grow"></div>
      </div>

      <div className="flex gap-10">
        <div className="grow space-y-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <li className="bg-background h-[138px] min-w-[412px] list-none p-4 flex gap-5">
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
      </div> */}


      <div className="h-[90vh] flex flex-col gap-8">
         <div className="bg-primary-600 animate-pulse h-full max-h-[50%] rounded-md"></div>
         <div className="h-full flex gap-5 flex-wrap">
           <div className="bg-primary-600 animate-pulse grow h-full rounded-md min-w-[445px]"></div>
           <div className="bg-primary-600 animate-pulse grow h-full rounded-md min-w-[445px]"></div>
           <div className="bg-primary-600 animate-pulse grow h-full rounded-md min-w-[445px]"></div>
         </div>
      </div>
    </div>
  );
};

export default TestPage;