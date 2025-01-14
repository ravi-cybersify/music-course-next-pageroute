'use client'
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import store from "@/Redux/store";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { usePathname } from "next/navigation";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { NextUIProvider } from "@nextui-org/react";

export default function App({ Component, pageProps }: AppProps) {
  const pathname = usePathname();

  return (
    <NextUIProvider>
    <Provider store={store}>
      <div className="">
        <Navbar />
        <ToastContainer />
        <Component {...pageProps} />
        {pathname === "/register" || pathname === "/login" || pathname === '/productdetails'|| pathname === "/cart" || pathname === '/wishlist' ? "" : <Footer />}
      </div>
    </Provider>
    </NextUIProvider>
  );
}
