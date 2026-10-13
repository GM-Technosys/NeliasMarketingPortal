import { cn } from "@/lib/cn";

// TODO(Debass): replace the mock with validated screenshots when they exist.
/**
 * Visual abstract mockup representing the platform interface.
 * Contains purely geometric shapes and token colors - strictly no text or numbers.
 *
 * @param {Object} props
 * @param {"desktop"|"mobile"} [props.device="desktop"]
 * @param {string} [props.className]
 */
export function ProductPreviewMock({ device = "desktop", className }) {
  if (device === "mobile") {
    return (
      <div
        aria-hidden="true"
        className={cn(
          "flex h-full w-full flex-col bg-surface select-none",
          className,
        )}
      >
        {/* Mobile top bar */}
        <div className="flex h-12 items-center justify-between border-b border-line bg-surface-muted px-4">
          <div className="h-3 w-20 rounded-full bg-ink-200" />
          <div className="h-4 w-4 rounded-full bg-ink-300" />
        </div>

        {/* Four stacked rounded rows */}
        <div className="flex flex-1 flex-col gap-3 p-4">
          {[
            { barW: "w-3/4", subW: "w-1/2" },
            { barW: "w-2/3", subW: "w-2/5" },
            { barW: "w-4/5", subW: "w-3/5" },
            { barW: "w-3/5", subW: "w-1/3" },
          ].map((row, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 rounded-lg border border-line bg-white p-3 shadow-2xs"
            >
              <div className="h-9 w-9 shrink-0 rounded-md bg-azure-100" />
              <div className="flex flex-1 flex-col gap-1.5">
                <div className={cn("h-3 rounded-full bg-ink-200", row.barW)} />
                <div className={cn("h-2 rounded-full bg-ink-100", row.subW)} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className={cn(
        "flex aspect-[16/10] w-full min-h-[360px] bg-surface select-none",
        className,
      )}
    >
      {/* Navy-900 sidebar (about 18% width) with five rounded bars */}
      <div className="flex w-[18%] min-w-[70px] shrink-0 flex-col gap-3.5 bg-navy-900 p-4 pt-6">
        <div className="h-4 w-3/4 rounded-full bg-white/40 mb-3" />
        <div className="h-3 w-4/5 rounded-full bg-white/20" />
        <div className="h-3 w-3/5 rounded-full bg-white/20" />
        <div className="h-3 w-2/3 rounded-full bg-white/20" />
        <div className="h-3 w-1/2 rounded-full bg-white/20" />
      </div>

      {/* Main content area */}
      <div className="flex flex-1 flex-col gap-5 bg-ink-50/40 p-5 md:p-6">
        {/* Top bar line */}
        <div className="flex items-center justify-between border-b border-line/80 pb-4">
          <div className="h-3.5 w-36 rounded-full bg-ink-300" />
          <div className="flex gap-2">
            <div className="h-3.5 w-16 rounded-full bg-ink-200" />
            <div className="h-3.5 w-8 rounded-full bg-azure-500/80" />
          </div>
        </div>

        {/* Three equal rounded blocks in azure-100 */}
        <div className="grid grid-cols-3 gap-3 md:gap-4">
          {[0, 1, 2].map((idx) => (
            <div
              key={idx}
              className="flex h-18 md:h-22 flex-col justify-between rounded-lg bg-azure-100 p-3.5"
            >
              <div className="h-2.5 w-1/2 rounded-full bg-azure-300/80" />
              <div className="h-4 w-2/3 rounded-full bg-azure-500/70" />
            </div>
          ))}
        </div>

        {/* Larger block containing 7 vertical bars in azure-500 and ink-200 */}
        <div className="flex flex-1 flex-col justify-end rounded-lg border border-line bg-white p-4 md:p-6 shadow-2xs">
          <div className="mb-4 flex items-center justify-between">
            <div className="h-3 w-28 rounded-full bg-ink-200" />
            <div className="h-2.5 w-16 rounded-full bg-ink-100" />
          </div>

          <div className="flex h-28 md:h-36 items-end justify-around gap-2 pt-2 border-b border-ink-100">
            <div className="h-[45%] w-6 md:w-8 rounded-t bg-azure-500" />
            <div className="h-[65%] w-6 md:w-8 rounded-t bg-ink-200" />
            <div className="h-[55%] w-6 md:w-8 rounded-t bg-azure-500" />
            <div className="h-[80%] w-6 md:w-8 rounded-t bg-ink-200" />
            <div className="h-[100%] w-6 md:w-8 rounded-t bg-azure-500" />
            <div className="h-[75%] w-6 md:w-8 rounded-t bg-azure-500" />
            <div className="h-[90%] w-6 md:w-8 rounded-t bg-ink-200" />
          </div>
        </div>
      </div>
    </div>
  );
}
