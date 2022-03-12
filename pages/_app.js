import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import Layout from "../components/Leyout";
import { QueryClientProvider, QueryClient } from "react-query";
import { AuthProvider } from "../context/auth.context";
import { CardProvider } from "../context/card.context";
import { SSRProvider } from "react-bootstrap";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SSRProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <CardProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </CardProvider>
        </AuthProvider>
      </QueryClientProvider>
    </SSRProvider>
  );
}

export default MyApp;
