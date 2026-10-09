'use client';

import Script from 'next/script';

export const GoogleAnalytics = () => {
  const isProduction = process.env.NODE_ENV === 'production';
  const NEXT_PUBLIC_GA_MEASUREMENT_ID =
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? '';

  return (
    <>
      <Script
        id="google-tag-manager"
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];

            function gtag(){
              dataLayer.push(arguments);
            }

            gtag('js', new Date());

            gtag('config', '${NEXT_PUBLIC_GA_MEASUREMENT_ID}', {
              'debug_mode': ${!isProduction}
            });
          `,
        }}
      />
    </>
  );
};
