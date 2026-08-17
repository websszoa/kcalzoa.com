import type { Metadata } from "next";
import { APP_NAME } from "@/lib/constants";
import PageTerms from "@/components/page/page-terms";
import PageTitle from "@/components/page/page-title";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "서비스 이용약관",
  description: `${APP_NAME} 서비스 이용에 필요한 약관 내용을 안내드립니다.`,
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <PageTitle
        subtitle="Terms"
        title="이용약관 안내"
        description={`안전하고 편리한 ${APP_NAME} 서비스 이용을 위해 약관 내용을 확인해 주세요.`}
      />
      <PageTerms />
    </>
  );
}
