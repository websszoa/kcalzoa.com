import { APP_ENG_NAME, APP_NAME } from "@/lib/constants";
import PageTitle from "@/components/page/page-title";
import PageContact from "@/components/page/page-contact";

export const metadata = {
  title: `${APP_NAME} 문의사항 | ${APP_ENG_NAME} Contact`,
  description: `${APP_NAME} 서비스 이용 중 궁금한 점이나 의견을 보내는 문의사항 페이지입니다.`,
};

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
