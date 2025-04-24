import "./globals.css";
import type { Metadata } from "next";
import ReduxProvider from "@/redux/provider/provider";

export const metadata: Metadata = {
  title: "Moloyal Web",
  description: "Moloyal app for savings and ticketing",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
