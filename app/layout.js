export const metadata = {
  title: "Online Course ROI Calculator | Make Sure That Course is Worth the Cost",
  description: "Estimate the return on investment (ROI) of an online course based on cost, time, and expected income increase.",
  
  alternates: {
    canonical: "https://www.onlinecourseroi.com",           // ← MUST CHANGE
  },

  openGraph: {
    title: "Online Course ROI Calculator | Make Sure That Course is Worth the Cost",
    description: "Estimate the return on investment (ROI) of an online course based on cost, time, and expected income increase.",
    url: "https://www.onlinecourseroi.com",                 // ← MUST CHANGE
    siteName: "Moneywise Calculators",             // ← Change
    images: [
      {
        url: "https://www.onlinecourseroi.com/og-image.png", // ← MUST CHANGE
        width: 1200,
        height: 630,
        alt: "Online Course ROI Calculator",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Online Course ROI Calculator | Make Sure That Course is Worth the Cost",
    description: "Estimate the return on investment (ROI) of an online course based on cost, time, and expected income increase.",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },

  authors: [{name: "David Graham" }],
  creator: "MoneyWise Calculators",
  publisher: "MoneyWise Calculators",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3475627763908800"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body>{children}</body>
    </html>
  );
}
