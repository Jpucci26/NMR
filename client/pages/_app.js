import "../styles/globals.css";
import { useEffect, useState } from "react";
import { currentUserAtom } from "../atoms/currentUseratom";
import { redirectAtom } from "../atoms/redirectAtom";
import { atom, useAtom } from "jotai";
import { useRouter } from "next/router";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { SuccessToast } from "/components";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom);
  const [redirect, setRedirect] = useAtom(redirectAtom);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/current_user").then((r) => {
      console.log({ r });
      if (r.ok) {
        r.json().then((user) => {
          if (user.error) {
            // redirect atom is now set to the current pathname
            // allows user to log in and be redirected to the page they were on
            setRedirect(router.asPath);
            router.push("/sessions/login");
            // redirect the client to /sessions/login
          } else {
            setCurrentUser(user);
          }
        });
      }
    });
  }, []);

  console.log(currentUser);

  return (
    <QueryClientProvider client={queryClient}>
      <SuccessToast />
      <Component {...pageProps} />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
