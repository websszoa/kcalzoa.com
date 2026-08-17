import fs from "node:fs";
import path from "node:path";
import type { ComponentType } from "react";

export interface BlogFrontmatter {
  title: string;
  category: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  readingTime: string;
  toc: Array<{ id: string; title: string }>;
}

export interface BlogPost {
  slug: string;
  frontmatter: BlogFrontmatter;
  Content: ComponentType;
}

const CONTENT_DIR = path.join(process.cwd(), "content/blog");

function getSlugs() {
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const posts = await Promise.all(
    getSlugs().map(async (slug) => {
      const { default: Content, frontmatter } = (await import(
        `@/content/blog/${slug}.mdx`
      )) as { default: ComponentType; frontmatter: BlogFrontmatter };

      return { slug, frontmatter, Content };
    }),
  );

  return posts.sort((a, b) => b.frontmatter.date.localeCompare(a.frontmatter.date));
}

export async function getBlogPost(slug: string) {
  const posts = await getAllBlogPosts();
  return posts.find((post) => post.slug === slug);
}
