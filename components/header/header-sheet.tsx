"use client";

import { APP_NAME } from "@/lib/constants";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useSheet } from "@/contexts/context-sheet";
import {
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export default function HeaderSheet() {
  const router = useRouter();
  const { setIsOpen } = useSheet();

  return (
    <SheetHeader className="border-b border-brand/10">
      <SheetTitle className="font-paperlogy font-normal text-xl uppercase text-brand flex items-center gap-2">
        {APP_NAME}
      </SheetTitle>
      <SheetDescription className="sr-only">
        메뉴 및 사용자 정보를 확인할 수 있습니다.
      </SheetDescription>
    </SheetHeader>
  );
}
