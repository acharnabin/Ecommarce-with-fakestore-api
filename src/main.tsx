import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "sonner";
import { BrowserRouter } from "react-router";
const queryClient = new QueryClient({
  // defaultOptions:{
  //   queries:{
  //     refetchOnWindowFocus:false,
  //     refetchOnMount:false,
  //     refetchInterval:1000
  //   }
  // }
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <Toaster position="bottom-right" richColors />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
