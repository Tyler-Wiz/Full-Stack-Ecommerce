import { Inter, Montserrat, Jost } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/store/ReduxProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});
const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
});

export const metadata = {
  title: "Sportzy Apparels and Equipments",
  description: "Sportzy Apparels and Equipments",
};

export default function RootLayout({ children }) {
  return (
    <ReduxProvider>
      <html lang="en">
        <body className={`${montserrat.variable} ${jost.variable}`}>
          {children}
          <ToastContainer autoClose={3000} />
        </body>
      </html>
    </ReduxProvider>
  );
}
