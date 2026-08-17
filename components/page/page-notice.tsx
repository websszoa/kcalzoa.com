"use client";

import { useState } from "react";
import Image from "next/image";
import { CalendarDays, ChevronRight } from "lucide-react";
import { notices } from "@/lib/notice";
import { Badge } from "../ui/badge";

export default function PageNotice() {
  const [selectedId, setSelectedId] = useState(notices[0]?.id);
  const selectedNotice =
    notices.find((notice) => notice.id === selectedId) ?? notices[0];
  const selectedFace = selectedNotice
    ? `/face/face${String(((selectedNotice.id - 1) % 10) + 1).padStart(2, "0")}.png`
    : "/face/face01.png";

  return (
    <div className="rounded-lg border border-dashed border-gray-200 p-4 sm:p-6">
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2 lg:gap-4">
        <div className="space-y-2" aria-label="공지사항 목록">
          {notices.map((notice) => {
            const isSelected = notice.id === selectedNotice?.id;

            return (
              <button
                key={notice.id}
                type="button"
                onClick={() => setSelectedId(notice.id)}
                aria-pressed={isSelected}
                aria-controls="selected-notice"
                className={`group flex w-full cursor-pointer items-center gap-3 rounded-lg border px-4 py-4 text-left transition-all duration-200 sm:px-6 sm:py-5 ${
                  isSelected
                    ? "border-brand/40 bg-emerald-50/60"
                    : "border-gray-200 bg-white hover:border-brand/30 hover:bg-slate-50"
                }`}
              >
                <Badge
                  variant={notice.category === "중요" ? "destructive" : "default"}
                  className="shrink-0 text-xs"
                >
                  {notice.category}
                </Badge>
                <span
                  className={`min-w-0 flex-1 font-anyvid text-sm leading-5 break-keep ${
                    isSelected ? "font-semibold text-brand" : "text-gray-700"
                  }`}
                >
                  {notice.title}
                </span>
                <ChevronRight
                  className={`size-5 shrink-0 transition-all ${
                    isSelected
                      ? "translate-x-0.5 text-brand"
                      : "text-muted-foreground group-hover:translate-x-0.5 group-hover:text-brand"
                  }`}
                  aria-hidden="true"
                />
              </button>
            );
          })}
        </div>

        <article
          id="selected-notice"
          aria-live="polite"
          className="flex min-h-[360px] items-center justify-center rounded-lg border border-gray-200 p-5 lg:sticky lg:top-20 lg:min-h-[420px] lg:self-start lg:p-7"
        >
          {selectedNotice ? (
            <div className="flex w-full flex-col items-center justify-center text-center">
              <div className="mb-3 size-16 shrink-0 overflow-hidden rounded-full bg-gray-100">
                <Image
                  key={selectedFace}
                  src={selectedFace}
                  alt={`${selectedNotice.title} 페이스`}
                  width={64}
                  height={64}
                  className="size-full animate-in fade-in zoom-in-95 object-cover duration-200"
                />
              </div>

              <Badge
                variant={
                  selectedNotice.category === "중요" ? "destructive" : "default"
                }
                className="mb-2 font-anyvid text-xs"
              >
                {selectedNotice.category}
              </Badge>
              <h3 className="mb-3 font-nanumNeo text-lg font-semibold leading-7 text-gray-800 break-keep">
                {selectedNotice.title}
              </h3>
              <p className="font-anyvid text-left text-sm leading-7 text-muted-foreground break-keep">
                {selectedNotice.content}
              </p>
              <div className="mt-5 flex items-center gap-1.5 font-anyvid text-xs text-muted-foreground">
                <CalendarDays className="size-4" aria-hidden="true" />
                <time dateTime={selectedNotice.date}>{selectedNotice.date}</time>
              </div>
            </div>
          ) : null}
        </article>
      </div>
    </div>
  );
}
