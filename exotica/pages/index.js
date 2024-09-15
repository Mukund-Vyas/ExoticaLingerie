import { Inter } from "next/font/google";
import HomePageLayout from "@/src/components/HomePage/HomePageLayout";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
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
      <HomePageLayout />
    </>
  );
}
