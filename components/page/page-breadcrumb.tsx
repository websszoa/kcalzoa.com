import { Fragment } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageBreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function PageBreadcrumb({ items }: PageBreadcrumbProps) {
  return (
    <nav aria-label="현재 위치" className="border-t border-gray-300/20 py-5">
      <ol className="flex items-center gap-1 font-anyvid text-xs text-muted-foreground">
        {items.map((item, index) => (
          <Fragment key={item.label}>
            {index > 0 && <ChevronRight className="size-3" aria-hidden="true" />}
            {item.href ? (
              <li>
                <Link href={item.href} className="transition-colors hover:text-brand">
                  {item.label}
                </Link>
              </li>
            ) : (
              <li aria-current="page" className="truncate text-slate-700">
                {item.label}
              </li>
            )}
          </Fragment>
        ))}
      </ol>
    </nav>
  );
}
