import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import Layout from "../components/Leyout";
import { QueryClientProvider, QueryClient, Hydrate } from "react-query";
import { AuthProvider } from "../context/auth.context";
import { CardProvider } from "../context/card.context";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <CardProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </CardProvider>
        </AuthProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
