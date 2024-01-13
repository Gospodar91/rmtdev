import { useEffect, useState } from "react";
import { TJobITem, TJobItemExtended } from "../lib/types";
import { BASE_URL } from "../lib/constants";

export function useJobItems(seacrhText: string) {
  const [isLoading, setisLoading] = useState(false);
  const [jobItems, setJobItems] = useState<TJobITem[]>([]);
  useEffect(() => {
    if (seacrhText) {
      (async () => {
        setisLoading(true);
        const data = await fetch(`${BASE_URL}?search=${seacrhText}`);
        const completeData = await data.json();
        setJobItems(completeData.jobItems);
        setisLoading(false);
      })();
    }
  }, [seacrhText]);
  const jobItemsSliced = jobItems.slice(0, 7);
  const totalNumberOfResults = jobItems.length;
  //as const делает readOnly массив из  кастомного хука типизируя его что он ВСЕГДА типа TjobItem
  // return [jobItemsSliced, isLoading, totalNumberOfResults] as const;
  return { jobItemsSliced, isLoading, totalNumberOfResults } as const;
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

export function useSaveOneJobItem(id: number | null) {
  const [oneJobItem, setOneJobItem] = useState<TJobItemExtended | null>(null);
  const [isLoading, setisLoading] = useState(false);
  useEffect(() => {
    if (id) {
      setisLoading(true);
      (async () => {
        const data = await fetch(`${BASE_URL}/${id}`);
        const completeData = await data.json();
        setOneJobItem(completeData.jobItem);
        setisLoading(false);
      })();
    }
  }, [id]);

  return { oneJobItem, isLoading } as const;
}
