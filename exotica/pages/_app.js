import "@/styles/globals.css";
import { CartProvider } from '../src/contexts/CartContext';
import { ProfileProvider } from '@/src/contexts/ProfileContext';
import Layout from "@/src/components/common/Layout";
import { Provider } from "react-redux";
import { store, persistor } from "@/Redux/store";
import { PersistGate } from "redux-persist/integration/react";
import Head from "next/head";
import api from "@/src/utils/api";
import { useEffect } from "react";
import { useRouter } from "next/router";
import ReactGA from 'react-ga4';
import AdminLayout from "@/src/components/Admin/Layout/AdminLayout";

const trackingId = 'G-73BCPH24QZ';
ReactGA.initialize(trackingId);

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const isAdminRoute = router.pathname.startsWith('/admin');
  const isLoginRoute = router.pathname === '/admin/login';

  const isProductPage = router.pathname.startsWith('/products/');
  const isBlogPage = router.pathname.startsWith('/blogs/');

  useEffect(() => {
    const trackVisit = async (url) => {
      try {
        await api.post('/sitevisits/track-visit', {
          page: url,
        });
        console.log('Page visit tracked successfully');
      } catch (error) {
        console.error('Error tracking page visit:', error);
      }
    };

    const handleRouteChange = (url) => {
      const pathWithQueryString = window.location.pathname + window.location.search;
      ReactGA.send({ hitType: "pageview", page: pathWithQueryString });

      trackVisit(url);
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <Provider store={store}>
      {
        (!isProductPage && !isBlogPage) && (
          <Head>
            <title>Lingeries - Buy Lingeries For Women @ Exotica Lingerie</title>
            <meta name="description" content="Exotica Lingerie offers premium women's lingerie with a wide range of bras, panties, nightwear, shapewear, and swimwear. Shop high-quality lingerie for every occasion." />
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />

            <link rel="icon" href="/favicon.ico" type="image/x-icon" />

            <link rel="apple-touch-icon" href="/apple-touch-icon-iphone-60x60.png" />
            <link rel="apple-touch-icon" sizes="60x60" href="/apple-touch-icon-ipad-76x76.png" />
            <link rel="apple-touch-icon" sizes="114x114" href="/apple-touch-icon-iphone-retina-120x120.png" />
            <link rel="apple-touch-icon" sizes="144x144" href="/apple-touch-icon-ipad-retina-152x152.png" />

            <meta name="google-site-verification" content="vLtTBBd9Awqzy1NSlBKGSt988SRN29YHpiBSPh4IjvA" />

            <meta name="theme-color" content="#ff197d" />
            <link rel="canonical" href="https://www.exoticalingerie.in" />
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

          </Head>
        )
      }

      <PersistGate loading={null} persistor={persistor}>
        <ProfileProvider>
          <CartProvider>
            {isLoginRoute ? (
              <Component {...pageProps} /> // No layout for login route
            ) : isAdminRoute ? (
              <AdminLayout>
                <Component {...pageProps} />
              </AdminLayout>
            ) : (
              <Layout>
                <Component {...pageProps} />
              </Layout>
            )}

          </CartProvider>
        </ProfileProvider>
      </PersistGate>
    </Provider>
  );
}
