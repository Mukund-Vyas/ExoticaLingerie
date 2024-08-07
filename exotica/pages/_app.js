import "@/styles/globals.css";
import { CartProvider } from '../src/contexts/CartContext';
import { ProfileProvider } from '@/src/contexts/ProfileContext';
import Layout from "@/src/components/common/Layout";
import { Provider } from "react-redux";
import { store, persistor } from "@/Redux/store";
import { PersistGate } from "redux-persist/integration/react";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
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
