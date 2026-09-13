import React from 'react';

interface FurnitureSkeletonProps {
  count?: number;
}

export const FurnitureSkeleton: React.FC<FurnitureSkeletonProps> = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={`skeleton-card-${index}`}
          className="bg-[#221f1a] border border-[#d4af37]/25 flex flex-col justify-between overflow-hidden relative shadow-md"
        >
          {/* Shimmer overlay animation */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#d4af37]/5 to-transparent -translate-x-full animate-[shimmer_1.8s_infinite] pointer-events-none" />

          <div>
            {/* Aspect 4:3 Image Placeholder */}
            <div className="relative aspect-[4/3] bg-[#292520] flex items-center justify-center overflow-hidden">
              <div className="w-16 h-16 border border-[#d4af37]/20 flex items-center justify-center">
                <span className="w-3 h-3 bg-[#d4af37]/30 animate-pulse" />
              </div>
              <div className="absolute top-3 left-3 w-28 h-5 bg-[#332e27] border border-[#d4af37]/20" />
              <div className="absolute bottom-3 right-3 w-20 h-4 bg-[#332e27] border border-[#d4af37]/20" />
            </div>

            {/* Content Body Placeholder */}
            <div className="p-6 space-y-4">
              {/* Category tag */}
              <div className="w-24 h-3 bg-[#332e27]" />

              {/* Title line */}
              <div className="w-4/5 h-6 bg-[#3a342c]" />

              {/* Materiality note */}
              <div className="w-3/5 h-3.5 bg-[#332e27]" />

              {/* Description lines */}
              <div className="space-y-2 pt-1">
                <div className="w-full h-3 bg-[#2d2822]" />
                <div className="w-5/6 h-3 bg-[#2d2822]" />
              </div>

              {/* Technical Specs 3-column placeholder */}
              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-[#d4af37]/15">
                <div className="p-2 bg-[#1b1916] space-y-1.5">
                  <div className="w-10 h-2.5 bg-[#2d2822]" />
                  <div className="w-14 h-3 bg-[#332e27]" />
                </div>
                <div className="p-2 bg-[#1b1916] space-y-1.5">
                  <div className="w-10 h-2.5 bg-[#2d2822]" />
                  <div className="w-12 h-3 bg-[#332e27]" />
                </div>
                <div className="p-2 bg-[#1b1916] space-y-1.5">
                  <div className="w-10 h-2.5 bg-[#2d2822]" />
                  <div className="w-14 h-3 bg-[#332e27]" />
                </div>
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="p-6 pt-0">
            <div className="border-t border-[#d4af37]/15 pt-4 flex items-center justify-between">
              <div className="w-24 h-3 bg-[#2d2822]" />
              <div className="w-28 h-4 bg-[#3a342c]" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
