import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchJobItem, fetchJobItems, handleError } from "../lib/utils";

export function useJobItems(seacrhText: string) {
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
