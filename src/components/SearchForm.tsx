type TSeacrhFormProps = {
  seacrhText: string;
  setSeacrhText: (value: string) => void;
};

export default function SearchForm({
  seacrhText,
  setSeacrhText,
}: TSeacrhFormProps) {
  return (
    <form action="#" className="search">
      <button type="submit">
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>

      <input
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSeacrhText(e.target.value)
        }
        value={seacrhText}
        spellCheck="false"
        type="text"
        required
        placeholder="Find remote developer jobs..."
      />
    </form>
  );
}
