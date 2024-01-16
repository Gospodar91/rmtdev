import React from "react";
import { TSortBy } from "../lib/types";

type TSortByProps = {
  sortBy: TSortBy;
  onClick: (sortOption: TSortBy) => void;
};

export default function Sorting({ sortBy, onClick }: TSortByProps) {
  return (
    <section className="sorting">
      <i className="fa-solid fa-arrow-down-short-wide"></i>

      <SortingButton
        isActive={sortBy === "relevant" ? true : false}
        onClick={() => onClick("relevant")}
      >
        Relevant
      </SortingButton>
      <SortingButton
        isActive={sortBy === "recent" ? true : false}
        onClick={() => onClick("recent")}
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
