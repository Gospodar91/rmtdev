import { useJobItemsContext } from "../hooks/hooks";
import JobList from "./JobList";

export default function JobListSeacrhWrapper() {
  const { jobItemsSliced, isLoading } = useJobItemsContext();
  return <JobList jobItems={jobItemsSliced} isLoading={isLoading} />;
}
