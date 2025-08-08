import { Skeleton } from '@/components/ui/skeleton';

export default function ArticleLoading() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Back Button Skeleton */}
      <Skeleton className="h-6 w-32 mb-8" />
      
      {/* Header Skeleton */}
      <div className="space-y-4">
        <Skeleton className="h-6 w-48 mb-6" />
        <Skeleton className="h-12 w-full max-w-3xl" />
        <div className="flex items-center gap-4 mt-8">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
      </div>

      {/* Image Skeleton */}
      <Skeleton className="h-96 w-full rounded-xl mt-8" />

      {/* Content Skeleton */}
      <div className="space-y-4 mt-8">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-4 w-full" />
        ))}
        <Skeleton className="h-4 w-3/4" />
      </div>

      <div className="space-y-4 mt-8">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-4 w-full" />
        ))}
      </div>

      {/* Tags Skeleton */}
      <div className="flex gap-2 mt-8">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-6 w-20 rounded-full" />
        ))}
      </div>

      {/* Actions Skeleton */}
      <div className="flex justify-between items-center py-6 border-t border-border/30">
        <div className="flex gap-4">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-24" />
        </div>
        <Skeleton className="h-10 w-36" />
      </div>

      {/* Comments Skeleton */}
      <div className="space-y-6">
        <Skeleton className="h-6 w-32 mb-6" />
        
        {/* Comment Form Skeleton */}
        <div className="flex gap-3 mb-8">
          <Skeleton className="h-10 w-10 rounded-full flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-24 w-full rounded-lg" />
            <div className="flex justify-end">
              <Skeleton className="h-9 w-32" />
            </div>
          </div>
        </div>

        {/* Comments List Skeleton */}
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex gap-3">
            <Skeleton className="h-10 w-10 rounded-full flex-shrink-0" />
            <div className="flex-1">
              <Skeleton className="h-24 w-full rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
