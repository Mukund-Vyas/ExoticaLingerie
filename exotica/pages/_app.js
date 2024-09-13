import "@/styles/globals.css";
import { CartProvider } from '../src/contexts/CartContext';
import { ProfileProvider } from '@/src/contexts/ProfileContext';
import Layout from "@/src/components/common/Layout";
import { Provider } from "react-redux";
import { store, persistor } from "@/Redux/store";
import { PersistGate } from "redux-persist/integration/react";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Head>
        <title>Lingeries - Buy Lingeries For Women @ Exotica Lingerie</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link rel="icon" href="/favicon.ico" type="image/x-icon" />

        <link rel="apple-touch-icon" href="/apple-touch-icon-iphone-60x60.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/apple-touch-icon-ipad-76x76.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/apple-touch-icon-iphone-retina-120x120.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/apple-touch-icon-ipad-retina-152x152.png" />

        <meta property="og:title" content="Exotica Lingerie - Premium Women's Lingerie Online" />
        <meta property="og:local" content="en_US" />
        <meta property="og:site_name" content="Exotica Lingerie" />
        <meta property="og:description" content="Exotica Lingerie offers premium women's lingerie with a wide range of bras, panties, nightwear, shapewear, and swimwear. Shop high-quality lingerie for every occasion." />
        <meta property="og:image" content="https://www.exoticalingerie.in/Images/ogimage.webp" />
        <meta property="og:image:alt" content="Exotica Lingerie - Premium Women's Lingerie" />
        <meta property="og:url" content="https://www.exoticalingerie.in" />
        <meta property="og:type" content="website" />

        <meta name="twitter:title" content="Exotica Lingerie - Premium Women's Lingerie Online" />
        <meta name="twitter:description" content="Exotica Lingerie offers premium women's lingerie with a wide range of bras, panties, nightwear, shapewear, and swimwear. Shop high-quality lingerie for every occasion." />
        <meta name="twitter:image" content="https://www.exoticalingerie.in/Images/ogimage.webp" />

        <meta name="theme-color" content="#ff197d" />
        <link rel="canonical" href="https://www.exoticalingerie.in" />
      </Head>

      <PersistGate loading={null} persistor={persistor}>
        <ProfileProvider>
          <CartProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </CartProvider>
        </ProfileProvider>
      </PersistGate>
    </Provider>
  );
}
