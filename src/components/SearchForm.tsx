import { useSeacrhTextContext } from "../hooks/hooks";

export default function SearchForm() {
  const { seacrhText, handleSeacrhText } = useSeacrhTextContext();
  return (
    <form action="#" className="search">
      <button type="submit">
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>

      <input
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleSeacrhText(e.target.value)
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
