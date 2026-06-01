"use client";

import Image from "next/image";
import Link from "next/link";
import { APP_NAME } from "@/lib/constants";
import { Hamburger } from "lucide-react";

export default function PageAbout() {
  return (
    <>
      {/* 상단 소개 */}
      <div className="rounded-2xl font-anyvid border border-dashed border-gray-200 p-4 md:p-6">
        <section className="grid grid-cols-1 items-center gap-6 md:grid-cols-2 md:gap-8">
          <div className="relative w-full overflow-hidden rounded-xl border border-gray-100 bg-white">
            <Image
              src="/kcalzoa.webp"
              alt={`${APP_NAME} 소개 이미지`}
              width={1200}
              height={800}
              className="h-auto w-full object-cover"
              priority
            />
          </div>

          <div className="space-y-3 text-sm leading-relaxed text-muted-foreground break-keep">
            <h3 className="font-paperlogy text-2xl text-slate-900">
              안녕하세요! {APP_NAME}입니다.
            </h3>

            <p>
              <strong>{APP_NAME}</strong>는 일상 속 식단과 칼로리를 쉽고 빠르게
              기록하고 관리할 수 있도록 돕는 서비스입니다. 복잡한 과정 없이
              간편하게 음식 정보를 확인하고, 나의 섭취 칼로리를 한눈에 파악할 수
              있도록 구성했습니다.
            </p>

            <p>
              <strong>{APP_NAME}</strong>는 일상 속 식단과 칼로리를 쉽고 빠르게
              기록하고 관리할 수 있도록 돕는 서비스입니다. 복잡한 과정 없이
              간편하게 음식 정보를 확인하고, 나의 섭취 칼로리를 한눈에 파악할 수
              있도록 구성했습니다.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
