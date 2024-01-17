import { createContext } from "react";
import { TReactNode } from "../lib/types";
import { useLocalStorage } from "../hooks/hooks";

type TBookMarkContext = {
  bookMarkIds: number[];
  handleBookMarkIds: (id: number) => void;
};
//Типизируем контекст теми value что передаем или налл если он выйдет вне обертки
export const BookMarkContext = createContext<TBookMarkContext | null>(null);

export default function BookMarkContextProvider({ children }: TReactNode) {
  //Нужно типизировать значение T при вызове кастомного хука
  const [bookMarkIds, setbookMarkIds] = useLocalStorage<number[]>(
    "bookMarksID",
    []
  );

  function handleBookMarkIds(id: number) {
    if (bookMarkIds.includes(id)) {
      setbookMarkIds(bookMarkIds.filter((existingId) => existingId !== id));
    } else {
      setbookMarkIds((prev) => [...prev, id]);
    }
  }

  return (
    <BookMarkContext.Provider value={{ bookMarkIds, handleBookMarkIds }}>
      {children}
    </BookMarkContext.Provider>
  );
}
