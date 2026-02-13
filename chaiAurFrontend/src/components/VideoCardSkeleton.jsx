import Skeleton from "./common/Skeleton.jsx";

export default function VideoCardSkeleton() {
  return (
    <div>
      <Skeleton className="w-full h-48" />
      <div className="mt-2 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-3 w-1/3" />
      </div>
    </div>
  );
}
