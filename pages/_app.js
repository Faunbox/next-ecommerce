import Layout from "../components/Layout";
import { QueryClientProvider, QueryClient, React, Hydrate } from "react-query";
import "bootstrap/dist/css/bootstrap.min.css";
import { GlobalStyle } from "../styles/GlobalCss";
import { ReactQueryDevtools } from "react-query/devtools";
import { AuthProvider } from "../context/auth.context";
import { CardProvider } from "../context/card.context";
import { SSRProvider } from "react-bootstrap";

export const queryClient = new QueryClient();

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SSRProvider>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <GlobalStyle />
          <AuthProvider>
            <CardProvider>
              <Layout>
                <Component {...pageProps} />
              </Layout>
              <ReactQueryDevtools />
            </CardProvider>
          </AuthProvider>
        </Hydrate>
      </QueryClientProvider>
    </SSRProvider>
  );
}

export default MyApp;
