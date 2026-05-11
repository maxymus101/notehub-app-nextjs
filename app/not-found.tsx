import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  description: "Code 404. Error. This page do not exist.",
  openGraph: {
    title: "Page not found",
    description: "Code 404. Error. This page do not exist.",
    url: "https://notehub-app-nextjs.vercel.app/not-found",
    images: [
      {
        url: "/page-not-found.jpeg",
        width: 1200,
        height: 630,
        alt: "Code 404. Error. This page do not exist.",
      },
    ],
    type: "article",
  },
};

const NotFound = () => {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you&#39;re looking for doesn&#39;t exist.</p>
      <Link href="/">Go back home</Link>
    </div>
  );
};

export default NotFound;
