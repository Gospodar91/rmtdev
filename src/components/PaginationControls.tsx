import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { TDirection } from "../lib/types";
import { useJobItemsContext } from "../hooks/hooks";

type TPAginationButtons = {
  onClick: () => void;
  direction: TDirection;

  currentPage: number;
};
export default function Pagination() {
  const { totalNumberOfPages, currentPage, handleChangePage } =
    useJobItemsContext();

  return (
    <section className="pagination">
      {currentPage > 1 && (
        <ButtonComponent
          onClick={() => handleChangePage("previous")}
          direction="previous"
          currentPage={currentPage}
        />
      )}
      {currentPage <= totalNumberOfPages && (
        <ButtonComponent
          onClick={() => handleChangePage("next")}
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
