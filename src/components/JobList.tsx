import JobListItem from "./JobListItem";
import Spinner from "./Spinner";
import { TJobITems } from "../lib/types";
import { useSaveActiveId } from "../hooks/hooks";

type TJobListItemProps = {
  jobItems: TJobITems[];
  isLoading: boolean;
};

export function JobList({ jobItems, isLoading }: TJobListItemProps) {
  const activeId = useSaveActiveId();
  return (
    <ul className="job-list">
      {isLoading && <Spinner />}
      {!isLoading &&
        jobItems.map((jobItem) => (
          <JobListItem
            key={jobItem.id}
            jobItem={jobItem}
            isActive={jobItem.id === activeId}
          />
        ))}
    </ul>
  );
}

export default JobList;
