import type { Metadata } from "next";
import {
  APP_DESCRIPTION,
  APP_NAME,
  APP_SITE_URL,
} from "@/lib/constants";

interface PageMetadataOptions {
  title: string;
  description: string;
  path: string;
  image?: string;
}

export function createPageMetadata({
  title,
  description,
  path,
  image = "/kcalzoa.webp",
}: PageMetadataOptions): Metadata {
  const url = new URL(path, APP_SITE_URL).toString();

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "ko_KR",
      url,
      siteName: APP_NAME,
      title: `${title} | ${APP_NAME}`,
      description,
      images: [{ url: image, alt: `${title} - ${APP_NAME}` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${APP_NAME}`,
      description,
      images: [image],
    },
  };
}

export const homeMetadata: Metadata = {
  ...createPageMetadata({
    title: "음식 칼로리와 영양정보를 한눈에",
    description: APP_DESCRIPTION,
    path: "/",
  }),
  title: { absolute: `${APP_NAME} | 음식 칼로리와 영양정보` },
};
