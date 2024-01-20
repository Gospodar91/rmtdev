import { useState, createContext } from "react";
import { useDebounce } from "../hooks/hooks";
import { TReactNode } from "../lib/types";

type TSeacrhTextContext = {
  seacrhText: string;
  debouncedSearchText: string;
  handleSeacrhText: (value: string) => void;
};
export const SearchContext = createContext<TSeacrhTextContext | null>(null);

export default function SeacrhTextContextProvider({ children }: TReactNode) {
  const [seacrhText, setSeacrhText] = useState("");
  const debouncedSearchText = useDebounce(seacrhText, 500);

  function handleSeacrhText(value: string) {
    setSeacrhText(value);
  }

  return (
    <SearchContext.Provider
      value={{ seacrhText, handleSeacrhText, debouncedSearchText }}
    >
      {children}
    </SearchContext.Provider>
  );
}
