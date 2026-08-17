import type { Metadata } from "next";
import PageTitle from "@/components/page/page-title";
import PageAbout from "@/components/page/page-about";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "칼로리조아 소개",
  description:
    "칼로리조아 서비스 소개와 개발 과정, 기술 구성, 앞으로의 운영 방향을 안내합니다.",
  path: "/about",
});

export default function IntroPage() {
  return (
    <>
      <PageTitle
        subtitle="About"
        title="칼로리조아 소개"
        description="칼로리와 식단을 더 쉽고 편리하게 관리할 수 있도록, 서비스와 방향을 소개합니다."
      />
      <PageAbout />
    </>
  );
}
