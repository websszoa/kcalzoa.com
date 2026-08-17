import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Info } from "lucide-react";
import PageBreadcrumb from "@/components/page/page-breadcrumb";
import caloriesData from "@/json/calories.json";
import { APP_SITE_URL } from "@/lib/constants";
import { createPageMetadata } from "@/lib/seo";

type CalorieItem = (typeof caloriesData)[number];
type CaloriePageProps = { params: Promise<{ slug: string }> };

const nutrientRows: Array<{
  key: keyof Pick<
    CalorieItem,
    | "calories"
    | "carbohydrate_g"
    | "protein_g"
    | "fat_g"
    | "sugar_g"
    | "sodium_mg"
    | "caffeine_mg"
  >;
  label: string;
  unit: string;
}> = [
  { key: "calories", label: "열량", unit: "kcal" },
  { key: "carbohydrate_g", label: "탄수화물", unit: "g" },
  { key: "protein_g", label: "단백질", unit: "g" },
  { key: "fat_g", label: "지방", unit: "g" },
  { key: "sugar_g", label: "당류", unit: "g" },
  { key: "sodium_mg", label: "나트륨", unit: "mg" },
  { key: "caffeine_mg", label: "카페인", unit: "mg" },
];

export const dynamicParams = false;

export function generateStaticParams() {
  return caloriesData.map((item) => ({ slug: item.slug }));
}

function findItem(slug: string) {
  return caloriesData.find((item) => item.slug === slug);
}

export async function generateMetadata({
  params,
}: CaloriePageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = findItem(slug);

  if (!item) return {};

  return createPageMetadata({
    title: `${item.brand} ${item.name} 칼로리·영양정보`,
    description: `${item.brand} ${item.name}의 열량은 ${item.calories}kcal입니다. 탄수화물 ${item.carbohydrate_g}g, 단백질 ${item.protein_g}g, 지방 ${item.fat_g}g 등 영양정보를 확인하세요.`,
    path: `/calorie/${item.slug}`,
    image: item.image_url,
  });
}

export default async function CalorieDetailPage({ params }: CaloriePageProps) {
  const { slug } = await params;
  const item = findItem(slug);

  if (!item) notFound();

  const pageUrl = `${APP_SITE_URL}/calorie/${item.slug}`;
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${item.brand} ${item.name}`,
    description: `${item.brand} ${item.name}의 칼로리와 주요 영양성분 정보`,
    image: `${APP_SITE_URL}${item.image_url}`,
    url: pageUrl,
    brand: { "@type": "Brand", name: item.brand },
    additionalProperty: nutrientRows.map(({ key, label, unit }) => ({
      "@type": "PropertyValue",
      name: label,
      value: item[key],
      unitText: unit,
    })),
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "홈",
        item: APP_SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: `${item.brand} ${item.name}`,
        item: pageUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([productJsonLd, breadcrumbJsonLd]).replace(
            /</g,
            "\\u003c",
          ),
        }}
      />

      <PageBreadcrumb
        items={[
          { label: "홈", href: "/" },
          { label: `${item.brand} ${item.name}` },
        ]}
      />

      <article className="rounded-2xl border border-dashed border-gray-200 p-4 sm:p-6">
        <div className="grid gap-6 md:grid-cols-[minmax(240px,0.8fr)_1.2fr] md:gap-8">
          <div className="relative aspect-square overflow-hidden rounded-xl border border-gray-100 bg-gray-50">
            <Image
              src={item.image_url}
              alt={`${item.brand} ${item.name}`}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 420px"
              className="object-cover"
            />
          </div>

          <div className="flex flex-col justify-center">
            <p className="font-anyvid text-sm font-semibold text-brand">
              {item.brand}
            </p>
            <h1 className="mt-1 font-paperlogy text-3xl font-semibold leading-tight text-slate-900 break-keep">
              {item.name}
            </h1>
            <p className="mt-4 rounded-lg border border-gray-200 px-4 py-4 font-anyvid text-sm leading-7 text-slate-600 break-keep">
              등록된 데이터 기준으로 {item.brand} {item.name}의 열량은{" "}
              <strong className="text-brand">{item.calories}kcal</strong>이며,
              탄수화물은 {item.carbohydrate_g}g, 단백질은 {item.protein_g}g,
              지방은 {item.fat_g}g입니다.
            </p>

            <section aria-labelledby="nutrition-title" className="mt-6">
              <div className="mb-3 flex items-center justify-between">
                <h2 id="nutrition-title" className="font-nanumNeo text-lg text-slate-900">
                  영양정보
                </h2>
                <span className="font-anyvid text-xs text-muted-foreground">
                  등록 데이터 기준
                </span>
              </div>
              <dl className="grid grid-cols-2 overflow-hidden rounded-lg border border-gray-200 sm:grid-cols-3">
                {nutrientRows.map(({ key, label, unit }) => (
                  <div
                    key={key}
                    className="border-b border-r border-gray-100 px-4 py-3 last:border-b-0"
                  >
                    <dt className="font-anyvid text-xs text-muted-foreground">
                      {label}
                    </dt>
                    <dd className="mt-1 font-paperlogy text-lg text-slate-800">
                      {item[key]}
                      <span className="ml-0.5 font-anyvid text-xs text-muted-foreground">
                        {unit}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          </div>
        </div>

        <aside className="mt-6 flex items-start gap-3 rounded-xl border border-gray-200 px-4 py-4 font-anyvid text-sm text-muted-foreground">
          <Info className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden="true" />
          <p className="leading-6 break-keep">
            제품 구성이나 제조사의 정책에 따라 실제 영양정보가 달라질 수 있습니다.
            정확한 정보는 제품 표시사항을 함께 확인해 주세요. 정보 수정이 필요하면{" "}
            <Link href="/contact" className="text-brand underline underline-offset-2">
              문의사항
            </Link>
            으로 알려주세요.
          </p>
        </aside>

        <div className="mt-6 border-t border-gray-100 pt-5">
          <Link
            href="/"
            className="flex items-center gap-1 font-anyvid text-sm text-muted-foreground transition-colors hover:text-brand"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            음식 목록
          </Link>
        </div>
      </article>
    </>
  );
}
