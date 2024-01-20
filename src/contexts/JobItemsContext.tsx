import { useState, createContext, useMemo, useCallback } from "react";
import { useSeacrhTextContext, useSearchQuery } from "../hooks/hooks";
import { TSortBy, TDirection, TReactNode, TJobITems } from "../lib/types";
import { RESULTS_PER_PAGE } from "../lib/constants";

type TJobItemsContext = {
  handleChangePage: (direction: TDirection) => void;
  handleSortBy: (sortOption: TSortBy) => void;
  isLoading: boolean;
  jobItems: TJobITems[] | undefined;
  jobItemsSliced: TJobITems[];
  totalNumberOfPages: number;
  totalNumberOfResults: number;
  sortBy: TSortBy;
  currentPage: number;
};

export const JobItemsContext = createContext<TJobItemsContext | null>(null);

export default function JobItemsContextProvider({ children }: TReactNode) {
  const { debouncedSearchText } = useSeacrhTextContext();

  const [currentPage, setCurrentPage] = useState(1);
  const { jobItems, isLoading } = useSearchQuery(debouncedSearchText);
  const [sortBy, setSortBy] = useState<TSortBy>("recent");

  const sortedJobItems = useMemo(
    () =>
      [...(jobItems || [])].sort((a, b) => {
        if (sortBy === "relevant") {
          return b.relevanceScore - a.relevanceScore;
        } else {
          return a.daysAgo - b.daysAgo;
        }
      }),
    [jobItems, sortBy]
  );
  const jobItemsSliced = useMemo(
    () =>
      sortedJobItems.slice(
        currentPage * RESULTS_PER_PAGE - RESULTS_PER_PAGE,
        currentPage * RESULTS_PER_PAGE
      ) || [],
    [currentPage, sortedJobItems]
  );

  const totalNumberOfResults = jobItems?.length || 0;
  const totalNumberOfPages = totalNumberOfResults / RESULTS_PER_PAGE;

  const handleChangePage = useCallback((direction: TDirection) => {
    if (direction === "next") {
      setCurrentPage((prev) => prev + 1);
    } else if (direction === "previous") {
      setCurrentPage((prev) => prev - 1);
    }
  }, []);

  const handleSortBy = useCallback((sortOption: TSortBy) => {
    setCurrentPage(1);
    setSortBy(sortOption);
  }, []);

  const contextValue = useMemo(
    () => ({
      handleChangePage,
      isLoading,
      jobItems,
      jobItemsSliced,
      totalNumberOfPages,
      handleSortBy,
      totalNumberOfResults,
      sortBy,
      currentPage,
    }),
    [
      handleChangePage,
      isLoading,
      jobItems,
      jobItemsSliced,
      totalNumberOfPages,
      handleSortBy,
      totalNumberOfResults,
      sortBy,
      currentPage,
    ]
  );

  return (
    <JobItemsContext.Provider value={contextValue}>
      {children}
    </JobItemsContext.Provider>
  );
}
