import toast from "react-hot-toast";
import { BASE_URL } from "./constants";
import { TJobItemExtended, TJobITems } from "./types";
export type TFecthJobItemId = {
  public: boolean;
  jobItem: TJobItemExtended;
};

export type TFecthJobItems = {
  public: boolean;
  jobItems: TJobITems[];
  sorted: boolean;
};
export async function fetchJobItem(id: number): Promise<TFecthJobItemId> {
  const response = await fetch(`${BASE_URL}/${id}`);

  if (!response.ok) {
    // const errorMessage = await dataFetch.json();
    throw new Error(response.statusText);
  }
  const completeData = await response.json();
  return completeData;
}

export async function fetchJobItems(
  seacrhText: string
): Promise<TFecthJobItems> {
  const response = await fetch(`${BASE_URL}?search=${seacrhText}`);
  if (!response.ok) {
    const errorMessage = await response.json();
    throw new Error(errorMessage.description);
  }
  const completeData = await response.json();
  return completeData;
}

export function handleError(error: unknown) {
  //отличие unknown от  any  в том ,что any позволяет любые операции а unknown- никакие .
  //Проблема с ошибкой в том ,что с помощью throw можно вернуть что угодно-строку \цифру\обьект ошибки

  let message;
  if (error instanceof Error) {
    //проверяет на принадлежность к классу Error .Тогда мы точно знаем его поля если он совпадает
    message = error.message;
  } else if (typeof error === "string") {
    message = error;
  } else {
    message = "Default error ";
  }

  toast.error(message);
}
