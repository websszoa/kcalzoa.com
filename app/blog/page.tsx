import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarDays, Clock3 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getAllBlogPosts } from "@/lib/blog";
import { APP_NAME, APP_SITE_URL } from "@/lib/constants";
import { createPageMetadata } from "@/lib/seo";

import PageTitle from "@/components/page/page-title";

export const metadata: Metadata = createPageMetadata({
  title: "칼로리·영양정보 블로그",
  description:
    "칼로리와 영양성분표를 이해하고 일상 식단에 활용하는 방법을 소개합니다.",
  path: "/blog",
});

function formatDate(date: string) {
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}

export default async function BlogPage() {
  const posts = await getAllBlogPosts();
  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${APP_NAME} 블로그`,
    description:
      "칼로리와 영양성분표를 이해하고 일상 식단에 활용하는 방법을 소개합니다.",
    url: `${APP_SITE_URL}/blog`,
    blogPost: posts.map(({ slug, frontmatter }) => ({
      "@type": "BlogPosting",
      headline: frontmatter.title,
      description: frontmatter.description,
      datePublished: frontmatter.date,
      url: `${APP_SITE_URL}/blog/${slug}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <PageTitle
        subtitle="Blog"
        title="칼로리·영양정보 블로그"
        description="알아두면 유용한 칼로리와 영양정보 이야기를 전해드려요."
      />

      <section aria-labelledby="blog-list-title" className="pb-6">
        <div className="mb-4 flex items-end justify-between border-b border-gray-200 pb-4">
          <h2
            id="blog-list-title"
            className="font-paperlogy text-xl text-slate-900"
          >
            최근 글
          </h2>
          <span className="font-anyvid text-xs text-muted-foreground">
            총 {posts.length}개
          </span>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {posts.map(({ slug, frontmatter }) => (
            <article
              key={slug}
              className="group relative flex flex-col rounded-xl border border-gray-200 p-5 transition-colors hover:border-brand/40 sm:p-6"
            >
              <div className="flex flex-wrap gap-1.5">
                <Badge
                  variant="destructive"
                  className="font-anyvid text-[11px]"
                >
                  {frontmatter.category}
                </Badge>
                {frontmatter.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="font-anyvid text-[11px]"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>

              <h3 className="mt-4 font-nanumNeo text-2xl font-semibold leading-8 text-slate-900 break-keep group-hover:text-brand">
                <Link
                  href={`/blog/${slug}`}
                  className="after:absolute after:inset-0"
                >
                  {frontmatter.title}
                </Link>
              </h3>
              <p className="mt-1 flex-1 font-anyvid text-sm leading-6 text-muted-foreground break-keep">
                {frontmatter.description}
              </p>

              <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4 font-anyvid text-xs text-muted-foreground">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="flex items-center gap-1">
                    <CalendarDays className="size-3.5" aria-hidden="true" />
                    <time dateTime={frontmatter.date}>
                      {formatDate(frontmatter.date)}
                    </time>
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock3 className="size-3.5" aria-hidden="true" />
                    {frontmatter.readingTime}
                  </span>
                </div>
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1 group-hover:text-brand" />
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
