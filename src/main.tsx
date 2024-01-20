import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.tsx";
import "./index.css";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import BookMarkContextProvider from "./contexts/BookMarkContext.tsx";
import ActiveIdContextProvider from "./contexts/ActiveIdContext.tsx";
import SeacrhTextContextProvider from "./contexts/SeacrhTextContext.tsx";
import JobItemsContextProvider from "./contexts/JobItemsContext.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BookMarkContextProvider>
        <ActiveIdContextProvider>
          <SeacrhTextContextProvider>
            <JobItemsContextProvider>
              <App />
            </JobItemsContextProvider>
          </SeacrhTextContextProvider>
        </ActiveIdContextProvider>
      </BookMarkContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
