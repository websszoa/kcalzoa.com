import type { Metadata } from "next";
import { APP_NAME } from "@/lib/constants";
import PagePrivacy from "@/components/page/page-privacy";
import PageTitle from "@/components/page/page-title";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "개인정보처리방침",
  description: `${APP_NAME} 서비스 이용 시 적용되는 개인정보 처리 방침을 안내드립니다.`,
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <PageTitle
        subtitle="Privacy"
        title="개인정보처리방침"
        description={`${APP_NAME} 서비스 이용 시 적용되는 개인정보처리방침을 안내드립니다.`}
      />
      <PagePrivacy />
    </>
  );
}
