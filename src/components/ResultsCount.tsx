type TresultCountProps = {
  totalNumberOfResults: number;
};

export default function ResultsCount({
  totalNumberOfResults,
}: TresultCountProps) {
  return (
    <p className="count">
      <span className="u-bold">{totalNumberOfResults}</span>
      results
    </p>
  );
}
