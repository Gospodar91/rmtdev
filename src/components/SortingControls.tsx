import { useJobItemsContext } from "../hooks/hooks";

export default function Sorting() {
  const { sortBy, handleSortBy } = useJobItemsContext();
  return (
    <section className="sorting">
      <i className="fa-solid fa-arrow-down-short-wide"></i>

      <SortingButton
        isActive={sortBy === "relevant" ? true : false}
        onClick={() => handleSortBy("relevant")}
      >
        Relevant
      </SortingButton>
      <SortingButton
        isActive={sortBy === "recent" ? true : false}
        onClick={() => handleSortBy("recent")}
      >
        Recent
      </SortingButton>
    </section>
  );
}

type TSortingButtonProps = {
  children: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
};

function SortingButton({ children, isActive, onClick }: TSortingButtonProps) {
  return (
    <button
      onClick={() => onClick()}
      className={`sorting__button sorting__button--relevant ${
        isActive ? "sorting__button--active" : ""
      }}`}
    >
      {children}
    </button>
  );
}
