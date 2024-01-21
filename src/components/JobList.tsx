import JobListItem from "./JobListItem";
import Spinner from "./Spinner";
import { TJobITems } from "../lib/types";
import { useActiveIdContext } from "../hooks/hooks";

type TJobListItemProps = {
  jobItems: TJobITems[];
  isLoading: boolean;
};

export function JobList({ jobItems, isLoading }: TJobListItemProps) {
  const { activeId } = useActiveIdContext();
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
