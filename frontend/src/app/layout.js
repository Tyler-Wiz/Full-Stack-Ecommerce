import { Inter, Montserrat, Jost } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/store/ReduxProvider";

const inter = Inter({ subsets: ["latin"] });
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});
const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <ReduxProvider>
      <html lang="en">
        <body className={`${montserrat.variable} ${jost.variable}`}>
          {children}
        </body>
      </html>
    </ReduxProvider>
  );
}
