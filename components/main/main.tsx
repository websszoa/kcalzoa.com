import MainFilter from "./main-filter";
import MainListCard from "./main-list-card";
import MainNotice from "./main-notice";
import MainSearchBar from "./main-search-bar";
import MainTitle from "./main-title";

export default function Main() {
  return (
    <>
      {/* 메인 타이틀 */}
      <MainTitle />

      {/* 메인 필터 */}
      <MainFilter />

      {/* 메일 알림 */}
      <MainNotice />

      {/* 메인 검색 */}
      <MainSearchBar />

      {/* 메인 리스트 카드 */}
      <MainListCard />
    </>
  );
}
