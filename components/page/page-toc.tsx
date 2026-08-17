"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, BookOpenText, Newspaper, Tags } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface TocItem {
  id: string;
  title: string;
}

interface OtherPost {
  slug: string;
  title: string;
}

interface PageTocProps {
  items: TocItem[];
  category?: string;
  tags?: string[];
  otherPosts?: OtherPost[];
  className?: string;
}

const TITLE_MAX_LENGTH = 15;

function truncateTitle(title: string) {
  return title.length > TITLE_MAX_LENGTH
    ? `${title.slice(0, TITLE_MAX_LENGTH)}…`
    : title;
}

export default function PageToc({
  items,
  category,
  tags,
  otherPosts,
  className,
}: PageTocProps) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const headings = items
      .map(({ id }) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length === 0) return;

        const topMost = visible.reduce((closest, entry) =>
          entry.boundingClientRect.top < closest.boundingClientRect.top
            ? entry
            : closest,
        );
        setActiveId(topMost.target.id);
      },
      { rootMargin: "-96px 0px -70% 0px", threshold: 0 },
    );

    headings.forEach((heading) => observer.observe(heading));
    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  const hasTopics = Boolean(category) || Boolean(tags?.length);

  return (
    <nav
      aria-label="이 글의 목차"
      className={cn("lg:sticky lg:top-20", className)}
    >
      <h2 className="flex items-center gap-1.5 font-paperlogy text-base font-semibold text-slate-800">
        <BookOpenText className="size-4 text-brand" aria-hidden="true" />
        목차
      </h2>
      <ol className="mt-3 space-y-1 border-l border-gray-200">
        {items.map((item) => {
          const isActive = item.id === activeId;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                title={item.title}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "-ml-px block truncate border-l-2 py-1 pl-3 font-anyvid text-sm leading-5 transition-colors",
                  isActive
                    ? "border-brand font-semibold text-brand"
                    : "border-transparent text-muted-foreground hover:border-brand/40 hover:text-brand",
                )}
              >
                {truncateTitle(item.title)}
              </a>
            </li>
          );
        })}
      </ol>

      {hasTopics && (
        <div className="mt-6 border-t border-gray-200 pt-5">
          <h2 className="flex items-center gap-1.5 font-paperlogy text-base font-semibold text-slate-800">
            <Tags className="size-4 text-brand" aria-hidden="true" />
            이 글의 주제
          </h2>
          <div className="mt-3 flex flex-wrap items-center gap-1.5">
            {category && (
              <Badge variant="destructive" className="font-anyvid text-xs">
                {category}
              </Badge>
            )}
            {tags?.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="font-anyvid text-[11px]"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {otherPosts && otherPosts.length > 0 && (
        <div className="mt-6 border-t border-gray-200 pt-5">
          <h2 className="flex items-center gap-1.5 font-paperlogy text-base font-semibold text-slate-800">
            <Newspaper className="size-4 text-brand" aria-hidden="true" />
            다른 글
          </h2>
          <ul className="mt-3 space-y-3">
            {otherPosts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="flex items-start gap-1.5 font-anyvid text-sm leading-5 text-muted-foreground transition-colors hover:text-brand"
                >
                  <span
                    className="mt-2 size-1 shrink-0 rounded-full bg-brand/70"
                    aria-hidden="true"
                  />
                  <span className="break-keep">{post.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-6 border-t border-gray-200 pt-5">
        <Link
          href="/blog"
          className="flex items-center gap-1 font-anyvid text-sm text-muted-foreground transition-colors hover:text-brand"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          블로그 목록
        </Link>
      </div>
    </nav>
  );
}
