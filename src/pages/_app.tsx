import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import store from "@/Redux/store";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }: AppProps) {
  return(
    <Provider store={store}>
      <div>
    <Navbar />
    <Component {...pageProps} />
    <Footer />
    </div>
    </Provider>
  );
}
