import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import store from "@/Redux/store";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { usePathname } from "next/navigation";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }: AppProps) {
  const pathname = usePathname();
  return(
    <Provider store={store}>
      <div>
    <Navbar />
    <Component {...pageProps} />
    {
      pathname === '/register' || pathname === '/login' ? '' :<Footer />
    }
    </div>
    </Provider>
  );
}
