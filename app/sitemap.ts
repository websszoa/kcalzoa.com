import type { MetadataRoute } from "next";
import caloriesData from "@/json/calories.json";
import { notices } from "@/lib/notice";
import { APP_SITE_URL } from "@/lib/constants";
import { getAllBlogPosts } from "@/lib/blog";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogPosts = await getAllBlogPosts();

  const staticPages: MetadataRoute.Sitemap = [
    { url: APP_SITE_URL, changeFrequency: "weekly", priority: 1 },
    {
      url: `${APP_SITE_URL}/about`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${APP_SITE_URL}/notice`,
      lastModified: notices.reduce(
        (latest, notice) => (notice.date > latest ? notice.date : latest),
        notices[0]?.date ?? "2026-01-01",
      ),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${APP_SITE_URL}/blog`,
      lastModified: blogPosts[0]?.frontmatter.date,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${APP_SITE_URL}/contact`,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${APP_SITE_URL}/terms`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${APP_SITE_URL}/privacy`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const caloriePages: MetadataRoute.Sitemap = caloriesData.map((item) => ({
    url: `${APP_SITE_URL}/calorie/${item.slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
    images: [`${APP_SITE_URL}${item.image_url}`],
  }));

  const blogPages: MetadataRoute.Sitemap = blogPosts.map(
    ({ slug, frontmatter }) => ({
      url: `${APP_SITE_URL}/blog/${slug}`,
      lastModified: frontmatter.date,
      changeFrequency: "monthly",
      priority: 0.7,
    }),
  );

  return [...staticPages, ...caloriePages, ...blogPages];
}
