"use client";

import { useState } from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import {
  CircleCheck,
  LoaderCircle,
  Mail,
  MessageSquareText,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const contactSchema = z.object({
  subject: z
    .string()
    .trim()
    .min(2, "문의 제목을 2자 이상 입력해 주세요.")
    .max(80, "문의 제목은 80자 이하로 입력해 주세요."),
  email: z.email("올바른 이메일 주소를 입력해 주세요."),
  message: z
    .string()
    .trim()
    .min(10, "문의 내용을 10자 이상 입력해 주세요.")
    .max(2000, "문의 내용은 2,000자 이하로 입력해 주세요."),
  privacyAgreed: z.boolean().refine((value) => value, {
    message: "개인정보 수집 및 이용에 동의해 주세요.",
  }),
});

type ContactFormValues = z.infer<typeof contactSchema>;
type SubmitStatus = "idle" | "success" | "error";

export default function PageContact() {
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [submitMessage, setSubmitMessage] = useState("");
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      subject: "",
      email: "",
      message: "",
      privacyAgreed: false,
    },
  });

  async function onSubmit(values: ContactFormValues) {
    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

    if (!accessKey) {
      setStatus("error");
      setSubmitMessage(
        "메일 전송 설정이 아직 완료되지 않았습니다. 관리자에게 알려주세요.",
      );
      return;
    }

    setStatus("idle");
    setSubmitMessage("");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: accessKey,
          from_name: "칼로리조아 문의사항",
          subject: values.subject,
          email: values.email,
          message: values.message,
          privacy_agreed: "동의함",
          botcheck: "",
        }),
      });
      const result = (await response.json()) as {
        success?: boolean;
        message?: string;
      };

      if (!response.ok || !result.success) {
        throw new Error(result.message ?? "문의 전송에 실패했습니다.");
      }

      reset();
      setStatus("success");
      setSubmitMessage(
        "문의가 정상적으로 전송되었습니다. 확인 후 답변드릴게요.",
      );
    } catch {
      setStatus("error");
      setSubmitMessage("문의 전송에 실패했습니다. 잠시 후 다시 시도해 주세요.");
    }
  }

  return (
    <div className="rounded-2xl border border-dashed border-gray-200 p-4 sm:p-6">
      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-8">
        <aside className="rounded-xl border border-gray-200 p-5 sm:p-6">
          <span className="flex size-10 items-center justify-center rounded-full border border-brand/30 text-brand">
            <MessageSquareText className="size-5" aria-hidden="true" />
          </span>
          <h3 className="mt-5 font-paperlogy text-xl text-slate-900">
            무엇을 도와드릴까요?
          </h3>
          <p className="mt-2 font-anyvid text-sm leading-6 text-muted-foreground break-keep">
            서비스 이용 중 불편한 점, 음식 데이터 수정 요청, 기능 제안 등 어떤
            내용이든 편하게 보내주세요.
          </p>

          <div className="mt-6 space-y-3 border-t border-gray-200 pt-5 font-anyvid text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <Mail className="size-4 text-brand" aria-hidden="true" />
              입력한 이메일로 답변드려요.
            </div>
            <div className="flex items-center gap-2">
              <CircleCheck className="size-4 text-brand" aria-hidden="true" />
              문의 내용을 확인한 후 순서대로 답변해요.
            </div>
          </div>
        </aside>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="space-y-5 rounded-lg border border-gray-200 p-5 sm:p-6 lg:p-7"
        >
          <div className="space-y-2">
            <Label htmlFor="contact-subject">
              문의 제목 <span className="text-red-500">*</span>
            </Label>
            <Input
              id="contact-subject"
              placeholder="문의 제목을 입력해 주세요."
              className="h-11"
              aria-invalid={Boolean(errors.subject)}
              aria-describedby={errors.subject ? "contact-subject-error" : undefined}
              {...register("subject")}
            />
            {errors.subject ? (
              <p id="contact-subject-error" className="font-anyvid text-xs text-red-500">
                {errors.subject.message}
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact-email">
              답변받을 이메일 <span className="text-red-500">*</span>
            </Label>
            <Input
              id="contact-email"
              type="email"
              autoComplete="email"
              placeholder="example@email.com"
              className="h-11"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "contact-email-error" : undefined}
              {...register("email")}
            />
            {errors.email ? (
              <p id="contact-email-error" className="font-anyvid text-xs text-red-500">
                {errors.email.message}
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact-message">
              문의 내용 <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="contact-message"
              rows={7}
              placeholder="문의 내용을 10자 이상 입력해 주세요."
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? "contact-message-error" : undefined}
              {...register("message")}
            />
            {errors.message ? (
              <p id="contact-message-error" className="font-anyvid text-xs text-red-500">
                {errors.message.message}
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <div className="flex items-start gap-2.5">
              <Controller
                name="privacyAgreed"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    id="contact-privacy"
                    checked={field.value}
                    onCheckedChange={(checked) => field.onChange(checked === true)}
                    aria-invalid={Boolean(errors.privacyAgreed)}
                    aria-describedby={
                      errors.privacyAgreed ? "contact-privacy-error" : undefined
                    }
                  />
                )}
              />
              <Label
                htmlFor="contact-privacy"
                className="cursor-pointer items-start font-normal leading-5 text-muted-foreground"
              >
                <span>
                  답변을 위한 이메일 수집 및 이용에 동의합니다. 자세한 내용은{" "}
                  <Link
                    href="/privacy"
                    className="text-brand underline underline-offset-2"
                  >
                    개인정보취급방침
                  </Link>
                  을 확인해 주세요.
                </span>
              </Label>
            </div>
            {errors.privacyAgreed ? (
              <p id="contact-privacy-error" className="font-anyvid text-xs text-red-500">
                {errors.privacyAgreed.message}
              </p>
            ) : null}
          </div>

          {submitMessage ? (
            <p
              role="status"
              className={`rounded-lg px-4 py-3 font-anyvid text-sm ${
                status === "success"
                  ? "bg-emerald-50 text-brand"
                  : "bg-red-50 text-red-600"
              }`}
            >
              {submitMessage}
            </p>
          ) : null}

          <Button
            type="submit"
            variant="destructive"
            size="lg"
            disabled={isSubmitting}
            className="w-full"
          >
            {isSubmitting ? (
              <LoaderCircle className="animate-spin" aria-hidden="true" />
            ) : (
              <Send aria-hidden="true" />
            )}
            {isSubmitting ? "보내는 중..." : "문의 보내기"}
          </Button>
        </form>
      </div>
    </div>
  );
}
