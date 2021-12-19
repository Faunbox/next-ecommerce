import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import Layout from "../components/Leyout";
import { QueryClientProvider, QueryClient } from "react-query";
import { SessionProvider } from "next-auth/react";
import { AuthProvider } from "../context/auth.context";

const queryClient = new QueryClient()

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
