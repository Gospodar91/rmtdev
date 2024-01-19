import { forwardRef } from "react";
import { useBookmarkContext } from "../hooks/hooks";
import JobList from "./JobList";
// Forward ref First paraptr for typing-ref / Second parametr for typing -PROPS
// Incoming to function first props.Second-ref
const BookmarksPopover = forwardRef<HTMLDivElement>(function (_, ref) {
  const { bookMarksJobItems, isLoading } = useBookmarkContext();

  return (
    <div ref={ref} className="bookmarks-popover">
      <JobList jobItems={bookMarksJobItems} isLoading={isLoading} />
    </div>
  );
});
export default BookmarksPopover;
