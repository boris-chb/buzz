interface TweetLoadingSkeletonProps {
  count: number;
}

const TweetLoadingSkeleton: React.FC<TweetLoadingSkeletonProps> = ({
  count,
}) => {
  return (
    <>
      {Array.from({ length: count || 1 }).map((_, index) => (
        <div
          key={index}
          className="mx-auto h-[130px] w-[670px] rounded-md border border-blue-300 p-4 shadow"
        >
          <div className="flex animate-pulse space-x-4">
            <div className="h-10 w-10 rounded-full bg-slate-200"></div>
            <div className="flex-1 space-y-6 py-1">
              <div className="h-2 rounded bg-slate-200"></div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2 h-2 rounded bg-slate-200"></div>
                  <div className="col-span-1 h-2 rounded bg-slate-200"></div>
                </div>
                <div className="h-2 rounded bg-slate-200"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default TweetLoadingSkeleton;
