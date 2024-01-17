import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import { useBookmarkContext } from "../hooks/hooks";
type TbookmarkIconProps = {
  id: number;
};

export default function BookmarkIcon({ id }: TbookmarkIconProps) {
  const context = useBookmarkContext();
  const { bookMarkIds, handleBookMarkIds } = context;
  return (
    <button className="bookmark-btn">
      <BookmarkFilledIcon
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          handleBookMarkIds(id);
        }}
        className={`${bookMarkIds.includes(id) ? "filled" : ""}`}
      />
    </button>
  );
}
