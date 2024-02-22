import Script from "next/script";

export default function GoogleAnalytics() {
    return (
        <>
            <Script
                strategy="lazyOnload"
                src={`https://www.googletagmanager.com/gtag/js?id=G-6ZL21T0031`}
            />
            <Script id="ga" strategy="lazyOnload">
                {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-6ZL21T0031');
        `}
            </Script>
        </>
    );
}