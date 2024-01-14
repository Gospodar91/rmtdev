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

function App() {
  const [seacrhText, setSeacrhText] = useState("");
  const debouncedSearchText = useDebounce(seacrhText, 500);

  const { jobItems, isLoading } = useJobItems(debouncedSearchText);

  const jobItemsSliced = jobItems?.slice(0, 7) || [];
  const totalNumberOfResults = jobItems?.length || 0;
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
            <SortingControls />
          </SideBarTop>
          <JobList jobItems={jobItemsSliced} isLoading={isLoading} />
          <Pagination />
        </Sidebar>
        <JobItemContent />
      </Container>
      <Footer />
      <Toaster position="top-right" />
    </>
  );
}

export default App;
