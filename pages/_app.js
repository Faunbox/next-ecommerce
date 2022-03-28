import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "../components/Layout";
import { QueryClientProvider, QueryClient, React, Hydrate } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { AuthProvider } from "../context/auth.context";
import { CardProvider } from "../context/card.context";
import { SSRProvider } from "react-bootstrap";
import { NextUIProvider } from "@nextui-org/react";
import { AnimatePresence } from "framer-motion";

export const queryClient = new QueryClient();

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <NextUIProvider>
      <SSRProvider>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <AuthProvider>
              <CardProvider>
                {/* <GlobalStyle /> */}
                <AnimatePresence initial={false} exitBeforeEnter>
                  <Layout>
                    <Component {...pageProps} />
                  </Layout>
                </AnimatePresence>
                <ReactQueryDevtools />
              </CardProvider>
            </AuthProvider>
          </Hydrate>
        </QueryClientProvider>
      </SSRProvider>
    </NextUIProvider>
  );
}

export default MyApp;
