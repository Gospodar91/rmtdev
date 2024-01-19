import { useEffect, useRef } from "react";
import { TriangleDownIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import BookmarksPopover from "./BookmarksPopover";

export default function BookmarksButton() {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    //native JS
    // function handleClickOutsidePopover(e: MouseEvent) {
    //   if (
    //     e.target instanceof HTMLElement &&
    //     !e.target.closest(".bookmarks-btn") &&
    //     !e.target.closest(".bookmarks-popover")
    //   ) {
    //     setIsOpen(false);
    //   }
    // }

    // document.addEventListener("click", handleClickOutsidePopover);

    // return () =>
    //   document.removeEventListener("click", handleClickOutsidePopover);
    function handleClickOutsidePopover(e: MouseEvent) {
      if (
        e.target instanceof HTMLElement &&
        !buttonRef.current?.contains(e.target) &&
        !popoverRef.current?.contains(e.target)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("click", handleClickOutsidePopover);

    return () => {
      document.removeEventListener("click", handleClickOutsidePopover);
    };
  }, []);

  return (
    <section>
      <button
        ref={buttonRef}
        onClick={() => setIsOpen((prev) => !prev)}
        className="bookmarks-btn"
      >
        Bookmarks <TriangleDownIcon />
      </button>
      {isOpen && <BookmarksPopover ref={popoverRef} />}
    </section>
  );
}
