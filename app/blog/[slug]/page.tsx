import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllBlogPosts, getBlogPost } from "@/lib/blog";
import { APP_NAME, APP_SITE_URL } from "@/lib/constants";
import { createPageMetadata } from "@/lib/seo";

import PageBreadcrumb from "@/components/page/page-breadcrumb";
import PageTitle from "@/components/page/page-title";
import PageToc from "@/components/page/page-toc";

type BlogPostPageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  return posts.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) return {};

  return createPageMetadata({
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    path: `/blog/${post.slug}`,
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) notFound();

  const { Content, frontmatter } = post;
  const allPosts = await getAllBlogPosts();
  const otherPosts = allPosts
    .filter(({ slug: otherSlug }) => otherSlug !== slug)
    .slice(0, 4)
    .map(({ slug: otherSlug, frontmatter: otherFrontmatter }) => ({
      slug: otherSlug,
      title: otherFrontmatter.title,
    }));
  const pageUrl = `${APP_SITE_URL}/blog/${post.slug}`;
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: frontmatter.title,
    description: frontmatter.description,
    datePublished: frontmatter.date,
    dateModified: frontmatter.date,
    inLanguage: "ko-KR",
    mainEntityOfPage: pageUrl,
    author: { "@type": "Organization", name: frontmatter.author },
    publisher: {
      "@type": "Organization",
      name: APP_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${APP_SITE_URL}/icons/icon512.png`,
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <PageBreadcrumb
        items={[
          { label: "홈", href: "/" },
          { label: "블로그", href: "/blog" },
          { label: frontmatter.title },
        ]}
      />
      <PageTitle
        subtitle="Blog"
        title={frontmatter.title}
        description={frontmatter.description}
      />

      <div className="grid gap-8 pb-6 lg:grid-cols-[minmax(0,1fr)_220px] lg:items-start lg:gap-12">
        <article className="order-2 min-w-0 rounded-2xl border border-dashed border-gray-200 p-5 font-nanumNeo sm:p-8 lg:order-1">
          <Content />
        </article>

        <PageToc
          items={frontmatter.toc}
          category={frontmatter.category}
          tags={frontmatter.tags}
          otherPosts={otherPosts}
          className="order-1 lg:order-2"
        />
      </div>
    </>
  );
}
