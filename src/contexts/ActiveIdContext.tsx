import { createContext } from "react";
import { TReactNode } from "../lib/types";
import { useSaveActiveId } from "../hooks/hooks";

type TActiveIDContext = {
  activeId: number | null;
};
export const ActiveIdContext = createContext<TActiveIDContext | null>(null);

export default function ActiveIdContextProvider({ children }: TReactNode) {
  const activeId = useSaveActiveId();

  return (
    <ActiveIdContext.Provider value={{ activeId }}>
      {children}
    </ActiveIdContext.Provider>
  );
}
