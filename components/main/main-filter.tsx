"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Settings } from "lucide-react";
import { socialMenu } from "@/lib/menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const FILTER_CATEGORY = [
  "전체",
  "한식",
  "중식",
  "일식",
  "양식",
  "카페",
  "음료",
  "디저트",
];

const FILTER_CALORIES = [
  "전체",
  "100kcal 이하",
  "300kcal 이하",
  "500kcal 이하",
  "700kcal 이하",
  "700kcal 이상",
];

const FILTER_NUTRITION = ["전체", "고단백", "저탄수", "저지방", "저당", "저염"];

const FILTER_BRAND = [
  "전체",
  "스타벅스",
  "맥도날드",
  "서브웨이",
  "CU",
  "GS25",
  "이디야",
];

const FILTER_POPULAR = [
  "인기순",
  "저칼로리순",
  "고단백순",
  "최신순",
  "즐겨찾기순",
];

export default function MainFilter() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="main__filter">
      {/* 상단 도구 버튼 */}
      <div
        role="toolbar"
        aria-label="도구 모음"
        className="flex justify-center gap-1"
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={isOpen ? "destructive" : "outline"}
              className="h-10 w-10 rounded-full"
              aria-label="검색 필터"
              aria-expanded={isOpen}
              aria-controls="filter-panel"
              onClick={() => setIsOpen((prev) => !prev)}
            >
              <Settings
                className={`h-4 w-4 transition-transform duration-300 ${isOpen ? "rotate-90" : "rotate-0"}`}
                aria-hidden="true"
              />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{isOpen ? "필터 닫기" : "검색 필터"}</p>
          </TooltipContent>
        </Tooltip>

        {socialMenu.map(({ href, label, path }) => (
          <Tooltip key={href}>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                className="h-10 w-10 rounded-full"
                asChild
              >
                <Link
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${label} (새 탭에서 열림)`}
                >
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path d={path} fill="currentColor" />
                  </svg>
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{label}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>

      {/* 펼침형 필터 패널 */}
      <div
        id="filter-panel"
        className={`grid overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
      >
        <section aria-label="칼로리 검색 필터" className="min-h-0 mt-2">
          <div className="rounded-lg border p-4 space-y-1.5">
            {/* 음식 카테고리 */}
            <div
              role="group"
              aria-label="음식 필터"
              className="grid grid-cols-4 gap-1 sm:grid-cols-8 md:grid-cols-10 xl:grid-cols-[repeat(12,minmax(0,1fr))]"
            >
              {FILTER_CATEGORY.map((item, i) => (
                <Button
                  key={item}
                  size="sm"
                  variant={i === 0 ? "destructive" : "ghost"}
                  aria-pressed={i === 0}
                >
                  {item}
                </Button>
              ))}
            </div>

            {/* 영양소 */}
            <div
              role="group"
              aria-label="영양소 필터"
              className="grid grid-cols-4 gap-1 sm:grid-cols-8 md:grid-cols-10 xl:grid-cols-[repeat(12,minmax(0,1fr))]"
            >
              {FILTER_NUTRITION.map((item, i) => (
                <Button
                  key={item}
                  size="sm"
                  variant={i === 0 ? "destructive" : "ghost"}
                  aria-pressed={i === 0}
                >
                  {item}
                </Button>
              ))}
            </div>

            {/* 브랜드 */}
            <div
              role="group"
              aria-label="브랜드 필터"
              className="grid grid-cols-4 gap-1 sm:grid-cols-8 md:grid-cols-10 xl:grid-cols-[repeat(12,minmax(0,1fr))]"
            >
              {FILTER_BRAND.map((item, i) => (
                <Button
                  key={item}
                  size="sm"
                  variant={i === 0 ? "destructive" : "ghost"}
                  aria-pressed={i === 0}
                >
                  {item}
                </Button>
              ))}
            </div>

            {/* 인기 정렬 */}
            <div
              role="group"
              aria-label="인기 필터"
              className="grid grid-cols-4 gap-1 sm:grid-cols-8 md:grid-cols-9 xl:grid-cols-[repeat(9,minmax(0,1fr))]"
            >
              {FILTER_POPULAR.map((item, i) => (
                <Button
                  key={item}
                  size="sm"
                  variant={i === 0 ? "destructive" : "ghost"}
                  aria-pressed={i === 0}
                >
                  {item}
                </Button>
              ))}
            </div>

            {/* 칼로리 범위 */}
            <div
              role="group"
              aria-label="칼로리 필터"
              className="grid grid-cols-4 gap-1 sm:grid-cols-8 md:grid-cols-9 xl:grid-cols-[repeat(9,minmax(0,1fr))]"
            >
              {FILTER_CALORIES.map((item, i) => (
                <Button
                  key={item}
                  size="sm"
                  variant={i === 0 ? "destructive" : "ghost"}
                  aria-pressed={i === 0}
                >
                  {item}
                </Button>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
