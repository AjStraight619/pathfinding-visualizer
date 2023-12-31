import ThemeSwitch from "@/components/ThemeSwitch";
import AlgorithmContextProvider from "@/context/AlgorithmContext";
import { GridContextProvider } from "@/context/GridContext";
import { NodeContextProvider } from "@/context/NodeContext";
import ThemeContextProvider from "@/context/ThemeContext";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pathfinding Visualizer",
  description: "Pathfinding Algorithms, A*, Dijkstra's....",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-gray-50 text-gray-950 relative pt-16 sm:pt-20 dark:bg-gray-900 dark:text-gray-50 dark:text-opacity-90`}
        suppressHydrationWarning={true}
      >
        <div className="bg-[#23395d] absolute top-[-4rem] -z-10 right-[15rem] h-[25rem] w-[25rem] rounded-full blur-[8rem] sm:w-[50rem] dark:bg-[#1b2c48]"></div>
        <div className="bg-[#1e305f] absolute top-[-2rem] -z-10 left-[-28rem] h-[25rem] w-[40rem] rounded-full blur-[8rem] sm:w-[50rem] md:left-[-25rem] lg:left-[-20rem] xl:left-[-10rem] 2xl:left-[-3rem] dark:bg-[#162238]"></div>
        <ThemeContextProvider>
          <AlgorithmContextProvider>
            <NodeContextProvider>
              <GridContextProvider>{children}</GridContextProvider>
            </NodeContextProvider>
          </AlgorithmContextProvider>
          <ThemeSwitch />
        </ThemeContextProvider>
      </body>
    </html>
  );
}
