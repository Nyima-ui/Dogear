import type { Metadata } from "next";
import { Bricolage_Grotesque, Geist, Syne } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Dogear",
  description:
    "Your personal reading journal. Log books, track your progress, write reviews, and get AI-powered recommendations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "#e9b44c",
          colorBackground: "#fffef0",
          colorForeground: "#363636",
          colorPrimaryForeground: "#363636",
          colorInputForeground: "#363636",
          fontSize: "14px",
        },
      }}
    >
      <html
        lang="en"
        className={cn(
          "h-full",
          "antialiased",
          bricolage.variable,
          "font-sans",
          geist.variable,
          syne.variable,
        )}
      >
        <body className="bg-background text-foreground">
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: "#FFFEF0",
                color: "#363636",
                fontFamily: "var(--font-bricolage)",
              },
            }}
          />
        </body>
      </html>
    </ClerkProvider>
  );
}
