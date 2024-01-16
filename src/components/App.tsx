import { useState } from "react";
import Background from "./Background";
import Container from "./Container";
import Footer from "./Footer";
import Header, { HeaderTop } from "./Header";
import BookmarksButton from "./BookmarksButton";
import Logo from "./Logo";
import SearchForm from "./SearchForm";
import JobItemContent from "./JobItemContent";
import Sidebar, { SideBarTop } from "./Sidebar";
import JobList from "./JobList";
import Pagination from "./PaginationControls";
import ResultsCount from "./ResultsCount";
import SortingControls from "./SortingControls";
import { useDebounce, useJobItems } from "../hooks/hooks";
import { Toaster } from "react-hot-toast";
import { RESULTS_PER_PAGE } from "../lib/constants";
import { TDirection, TSortBy } from "../lib/types";

function App() {
  const [seacrhText, setSeacrhText] = useState("");
  const debouncedSearchText = useDebounce(seacrhText, 500);
  const [currentPage, setCurrentPage] = useState(1);
  const { jobItems, isLoading } = useJobItems(debouncedSearchText);
  const [sortBy, setSortBy] = useState<TSortBy>("recent");
  const sortedJobItems = [...(jobItems || [])].sort((a, b) => {
    if (sortBy === "relevant") {
      return b.relevanceScore - a.relevanceScore;
    } else {
      return a.daysAgo - b.daysAgo;
    }
  });

  const jobItemsSliced =
    sortedJobItems.slice(
      currentPage * RESULTS_PER_PAGE - RESULTS_PER_PAGE,
      currentPage * RESULTS_PER_PAGE
    ) || [];

  const totalNumberOfResults = jobItems?.length || 0;
  const totalNumberOfPages = totalNumberOfResults / RESULTS_PER_PAGE;

  function handleChangePage(direction: TDirection) {
    if (direction === "next") {
      setCurrentPage((prev) => prev + 1);
    } else if (direction === "previous") {
      setCurrentPage((prev) => prev - 1);
    }
  }
  function handleSortBy(sortOption: TSortBy) {
    setCurrentPage(1);
    setSortBy(sortOption);
  }
  return (
    <>
      <Background />
      <Header>
        <HeaderTop>
          <Logo />
          <BookmarksButton />
        </HeaderTop>
        <SearchForm seacrhText={seacrhText} setSeacrhText={setSeacrhText} />
      </Header>

      <Container>
        <Sidebar>
          <SideBarTop>
            <ResultsCount totalNumberOfResults={totalNumberOfResults} />
            <SortingControls onClick={handleSortBy} sortBy={sortBy} />
          </SideBarTop>
          <JobList jobItems={jobItemsSliced} isLoading={isLoading} />
          <Pagination
            totalNumberOfPages={totalNumberOfPages}
            onClick={handleChangePage}
            currentPage={currentPage}
          />
        </Sidebar>
        <JobItemContent />
      </Container>
      <Footer />
      <Toaster position="top-right" />
    </>
  );
}

export default App;
