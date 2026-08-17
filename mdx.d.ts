declare module "*.mdx" {
  import type { Element, MDXProps } from "mdx/types";

  export const frontmatter: {
    title: string;
    category: string;
    description: string;
    date: string;
    author: string;
    tags: string[];
    readingTime: string;
    toc: Array<{ id: string; title: string }>;
  };

  export default function MDXContent(props: MDXProps): Element;
}
