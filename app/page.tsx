import Main from "@/components/main/main";
import caloriesData from "@/json/calories.json";
import { APP_NAME, APP_SITE_URL } from "@/lib/constants";
import { homeMetadata } from "@/lib/seo";

export const metadata = homeMetadata;

export default async function HomePage() {
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${APP_NAME} 음식 칼로리 목록`,
    numberOfItems: caloriesData.length,
    itemListElement: caloriesData.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: `${item.brand} ${item.name}`,
      url: `${APP_SITE_URL}/calorie/${item.slug}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(itemListJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Main />
    </>
  );
}
