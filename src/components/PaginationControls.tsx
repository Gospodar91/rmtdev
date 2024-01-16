import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { TDirection } from "../lib/types";

type TPaginationProps = {
  totalNumberOfPages: number;
  onClick: (direction: "previous" | "next") => void;
  currentPage: number;
};

type TPAginationButtons = {
  onClick: () => void;
  direction: TDirection;

  currentPage: number;
};
export default function Pagination({
  totalNumberOfPages,
  onClick,
  currentPage,
}: TPaginationProps) {
  return (
    <section className="pagination">
      {currentPage > 1 && (
        <ButtonComponent
          onClick={() => onClick("previous")}
          direction="previous"
          currentPage={currentPage}
        />
      )}
      {currentPage <= totalNumberOfPages && (
        <ButtonComponent
          onClick={() => onClick("next")}
          direction="next"
          currentPage={currentPage}
        />
      )}
    </section>
  );
}

function ButtonComponent({
  onClick,
  currentPage,
  direction,
}: TPAginationButtons) {
  return (
    <>
      <button
        className={`pagination__button pagination__button--${direction}`}
        onClick={(e) => {
          onClick();
          e.currentTarget.blur();
        }}
      >
        {direction === "previous" ? (
          <>
            <ArrowLeftIcon />
            Page {currentPage - 1}
          </>
        ) : (
          <>
            <ArrowRightIcon />
            Page {currentPage + 1}
          </>
        )}
      </button>
    </>
  );
}
