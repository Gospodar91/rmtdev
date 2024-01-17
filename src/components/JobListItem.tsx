import BookmarkIcon from "./BookmarkIcon";
import { TJobITems } from "../lib/types";

type TJobItemProps = {
  jobItem: TJobITems;
  isActive: boolean;
};

export default function JobListItem({ jobItem, isActive }: TJobItemProps) {
  return (
    <li className={`job-item ${isActive ? "job-item--active" : ""} `}>
      <a href={`#${jobItem.id}`} className="job-item__link">
        <div className="job-item__badge">{jobItem?.badgeLetters}</div>

        <div className="job-item__middle">
          <h3 className="third-heading">{jobItem?.title}</h3>
          <p className="job-item__company">{jobItem?.company}</p>
        </div>

        <div className="job-item__right">
          <BookmarkIcon id={jobItem.id} />
          <time className="job-item__time">{jobItem?.daysAgo} d</time>
        </div>
      </a>
    </li>
  );
}
