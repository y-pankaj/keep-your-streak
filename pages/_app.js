import { Provider } from "next-auth/client";
import "../styles/globals.css";
import Navbar from "../components/navbar";

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
