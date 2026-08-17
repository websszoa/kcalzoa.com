import type { MDXComponents } from "mdx/types";

const components: MDXComponents = {
  h2: ({ children, ...props }) => (
    <h2
      className="mt-8 mb-1 text-sm text-slate-900 first:mt-0 md:text-xl border-b pb-2"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3 className="mt-5 mb-1 text-sm text-slate-900" {...props}>
      {children}
    </h3>
  ),
  p: ({ children, ...props }) => (
    <p
      className="my-3 text-sm leading-6.5 text-muted-foreground break-keep"
      {...props}
    >
      {children}
    </p>
  ),
  img: ({ alt, ...props }) => (
    // eslint-disable-next-line @next/next/no-img-element -- MDX images are plain strings without known dimensions for next/image
    <img
      alt={alt ?? ""}
      loading="lazy"
      className="my-6 w-full rounded-xl"
      {...props}
    />
  ),
  a: ({ children, ...props }) => (
    <a
      className="font-medium text-brand underline decoration-brand/30 underline-offset-4 transition-colors hover:decoration-brand"
      {...props}
    >
      {children}
    </a>
  ),
  ul: ({ children, ...props }) => (
    <ul className="my-4 list-disc space-y-1.5 pl-5" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol className="my-4 list-decimal space-y-1.5 pl-5" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li
      className="pl-1 text-sm leading-6 text-muted-foreground marker:text-brand"
      {...props}
    >
      {children}
    </li>
  ),
  strong: ({ children, ...props }) => (
    <strong className="text-slate-800" {...props}>
      {children}
    </strong>
  ),
  blockquote: ({ children, ...props }) => (
    <blockquote
      className="my-5 border-l-2 border-brand/40 pl-4 text-sm leading-6 text-muted-foreground"
      {...props}
    >
      {children}
    </blockquote>
  ),
  hr: (props) => <hr className="my-8 border-gray-200" {...props} />,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
