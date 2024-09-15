import { Inter } from "next/font/google";
import HomePageLayout from "@/src/components/HomePage/HomePageLayout";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <HomePageLayout />
  );
}
