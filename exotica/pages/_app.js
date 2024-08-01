import "@/styles/globals.css";
import { CartProvider } from '../src/contexts/CartContext';
import Layout from "@/src/components/common/Layout";

export default function App({ Component, pageProps }) {
  return (
    <CartProvider>
      <Layout>
      <Component {...pageProps} />
      </Layout>
    </CartProvider>
  );
}
