import "../styles/globals.css";
import { StateContext } from "../lib/context";
import { Provider, createClient } from "urql";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "@auth0/nextjs-auth0";

// Connecter à Strapi
const client = createClient({ url: process.env.NEXT_PUBLIC_BACKEND_API });

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <StateContext>
        <Provider value={client}>
          <Toaster />
          <Nav />
          <Component {...pageProps} />
          <Footer />
        </Provider>
      </StateContext>
    </UserProvider>
  );
}

export default MyApp;
