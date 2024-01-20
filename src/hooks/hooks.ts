import { useContext, useEffect, useState } from "react";
import { useQueries, useQuery } from "@tanstack/react-query";
import { fetchJobItem, fetchJobItems, handleError } from "../lib/utils";
import { BookMarkContext } from "../contexts/BookMarkContext";
import { TJobItemExtended } from "../lib/types";
import { ActiveIdContext } from "../contexts/ActiveIdContext";

export function useSearchQuery(seacrhText: string) {
  const { data, isInitialLoading } = useQuery(
    ["job-items", seacrhText],
    () => (seacrhText ? fetchJobItems(seacrhText) : null),
    {
      staleTime: 1000 * 60,
      enabled: Boolean(seacrhText),
      retry: false,
      refetchOnWindowFocus: false,
      onError: handleError,
    }
  );

  return { jobItems: data?.jobItems, isLoading: isInitialLoading } as const;
}

export function useSaveOneJobItem(id: number | null) {
  //Для пост и гет запросов используются useQuery для остальных Mutaion
  //Три параметра .1-уникальное название и зависимость(если есть).Нужна для внутреннего механизма кеширования \поллинга и тд .Отслеживания конкретного запроса.Следующий элемент массива-когда делать рефетч
  //Второй -собственно фетч
  //Третий -обьект настроек котоырй включает обработку ошибок ,начальнй фетч ,время кеша и др
  const { data, isInitialLoading } = useQuery(
    ["job-item", id],
    () => (id ? fetchJobItem(id) : null),
    {
      staleTime: 1000 * 60, //время кеша
      refetchOnWindowFocus: false,
      onError: handleError,
      enabled: Boolean(id), // необходимость делать запрос первичный
      retry: false, // при ошибке
    }
  );
  const oneJobItem = data?.jobItem;
  const isLoading = isInitialLoading;
  return { oneJobItem, isLoading } as const;
}

export function useSaveActiveId() {
  const [activeId, setActiveId] = useState<number | null>(null);
  useEffect(() => {
    function handeSetActiveID() {
      setActiveId(Number(window.location.hash.slice(1)));
    }
    handeSetActiveID();
    window.addEventListener("hashchange", handeSetActiveID);

    return () => {
      window.removeEventListener("hashchange", handeSetActiveID);
    };
  }, []);

  return activeId;
}

export function useDebounce<T>(value: T, delay = 500): T {
  const [debouncedValue, setdebouncedValue] = useState(value);
  useEffect(() => {
    if (!value) return;
    const id = setTimeout(() => {
      setdebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(id);
    };
  }, [value, delay]);

  return debouncedValue;
}

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  // в Generic  функцию передаются по факту setState любого типа и он же возвращается .Сам стейт типа T и диспатч функция реакт этого тиап T
  //вызов useState через функцию выполняется лишь однажды
  const [value, setValue] = useState(() =>
    JSON.parse(localStorage.getItem(key) || JSON.stringify(initialValue))
  );

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}

export function useBookmarkContext() {
  //делаем кастомный хук что б не проверять постоянно на то существует ли контекст
  const context = useContext(BookMarkContext);

  if (!context) {
    throw new Error("Not bookmark context ");
  }

  return context;
}

export function useJobItems(ids: number[]) {
  const result = useQueries({
    queries: ids.map((id) => ({
      queryKey: ["job-item", id],
      queryFn: () => fetchJobItem(id),
      staleTime: 1000 * 60, //время кеша
      refetchOnWindowFocus: false,
      onError: handleError,
      enabled: Boolean(id), // необходимость делать запрос первичный
      retry: false, // при ошибке
    })),
  });
  //as -force for ts to apply type
  const jobItemsArray = result
    .map((el) => el.data?.jobItem)
    .filter((el) => Boolean(el)) as TJobItemExtended[];
  const isLoading = result.some((el) => el.isLoading);

  return { jobitems: jobItemsArray, isLoading };
}

export function useClickOutside(
  //Тип рефов -массив
  refs: React.RefObject<HTMLElement>[],
  handler: () => void
) {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (refs.every((ref) => !ref.current?.contains(e.target as Node))) {
        handler();
      }
    };
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [refs, handler]);
}
export function useActiveIdContext() {
  const context = useContext(ActiveIdContext);
  if (!context) {
    throw new Error("Active ID outside context ");
  }
  return context;
}
// export function useSaveOneJobItem(id: number | null) {
//   const [oneJobItem, setOneJobItem] = useState<TJobItemExtended | null>(null);
//   const [isLoading, setisLoading] = useState(false);
//   useEffect(() => {
//     if (id) {
//       setisLoading(true);
//       (async () => {
//         const data = await fetch(`${BASE_URL}/${id}`);
//         const completeData = await data.json();
//         setOneJobItem(completeData.jobItem);
//         setisLoading(false);
//       })();
//     }
//   }, [id]);

//   return { oneJobItem, isLoading } as const;
// }

// export function useJobItems(seacrhText: string) {
//   const [isLoading, setisLoading] = useState(false);
//   const [jobItems, setJobItems] = useState<TJobITem[]>([]);
//   useEffect(() => {
//     if (seacrhText) {
//       (async () => {
//         setisLoading(true);
//         const data = await fetch(`${BASE_URL}?search=${seacrhText}`);
//         const completeData = await data.json();
//         setJobItems(completeData.jobItems);
//         setisLoading(false);
//       })();
//     }
//   }, [seacrhText]);
//   const jobItemsSliced = jobItems.slice(0, 7);
//   const totalNumberOfResults = jobItems.length;
//   //as const делает readOnly массив из  кастомного хука типизируя его что он ВСЕГДА типа TjobItem
//   // return [jobItemsSliced, isLoading, totalNumberOfResults] as const;
//   return { jobItemsSliced, isLoading, totalNumberOfResults } as const;
// }
