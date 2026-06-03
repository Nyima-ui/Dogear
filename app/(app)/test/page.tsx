import styles from "./page.module.css";

const TestPage = () => {
  return (
    <div>
      <span className={styles.loader}></span>

      <div className={styles.parent}></div>

      {/* <div
        className={`${styles.shimmer} h-110 rounded-md p-5 space-y-5 relative`}
      >
        <div className="h-[20%] bg-primary-500/50 rounded-md"></div>
        <div className="h-[80%] bg-primary-500/50 rounded-md"></div>
      </div> */}

      <div className="h-110 rounded-md p-5 space-y-5 relative">
        <div className="h-[20%] bg-primary-500 rounded-md animate-pulse"></div>
        <div className="h-[80%] bg-primary-500 rounded-md animate-pulse"></div>
      </div>

      <div className="h-110 rounded-md p-5 space-y-5 relative flex gap-5">
        <div className="w-[70%] bg-primary-500 rounded-md animate-pulse grow"></div>
        <div className="w-[30%] bg-primary-500 rounded-md animate-pulse grow"></div>
      </div>
    </div>
  );
};

export default TestPage;
