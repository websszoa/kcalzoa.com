import type { Metadata } from "next";
import { APP_NAME } from "@/lib/constants";
import PageTitle from "@/components/page/page-title";
import PageContact from "@/components/page/page-contact";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "문의사항",
  description: `${APP_NAME} 서비스 이용 중 궁금한 점이나 의견을 보내는 문의사항 페이지입니다.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageTitle
        subtitle="Contact"
        title="문의사항"
        description="궁금한 점이나 소중한 의견을 남겨주시면 확인 후 답변드릴게요."
      />
      <PageContact />
    </>
  );
}
