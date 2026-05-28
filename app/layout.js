export const metadata = {
  title: "Online Course ROI Calculator | Is That Course Worth the Cost?",
  description: "Calculate the return on investment (ROI) of an online course based on cost, completion time, expected income increase, and how long the benefit lasts. See payback period and scenario analysis.",

  alternates: {
    canonical: "https://www.onlinecourseroi.com",
  },

  openGraph: {
    title: "Online Course ROI Calculator | Is That Course Worth the Cost?",
    description: "Calculate the return on investment (ROI) of an online course based on cost, completion time, expected income increase, and how long the benefit lasts.",
    url: "https://www.onlinecourseroi.com",
    siteName: "MoneyWise Calculators",
    images: [
      {
        url: "https://www.onlinecourseroi.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Online Course ROI Calculator — Is that course worth the cost?",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Online Course ROI Calculator | Is That Course Worth the Cost?",
    description: "Calculate the return on investment (ROI) of an online course based on cost, completion time, and expected income increase.",
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

  authors: [{ name: "David Graham" }],
  creator: "MoneyWise Calculators",
  publisher: "MoneyWise Calculators",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3475627763908800"
          crossOrigin="anonymous"
        ></script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Online Course ROI Calculator",
              description: "Free tool to calculate the return on investment (ROI) of an online course based on cost, completion time, expected income increase, and benefit duration.",
              url: "https://www.onlinecourseroi.com",
              applicationCategory: "FinanceApplication",
              operatingSystem: "All",
              browserRequirements: "Requires JavaScript",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD"
              },
              author: {
                "@type": "Organization",
                name: "MoneyWise Calculators",
                url: "https://moneywisecalculator.com"
              }
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}