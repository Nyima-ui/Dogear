import Star from "@/public/svgs/Star";

const StarRow = ({ count }: { count: number }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} />
      ))}
    </>
  );
};

export default StarRow;
