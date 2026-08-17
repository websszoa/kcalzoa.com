import Link from "next/link";
import { footerMenu } from "@/lib/menu";
import { APP_DESCRIPTION, APP_ENG_NAME, APP_SLOGAN } from "@/lib/constants";

export default function FooterInfo() {
  return (
    <div className="border-t border-gray-300/40 pt-6">
      <h3 className="text-xl text-brand uppercase font-black font-paperlogy mb-4">
        {APP_ENG_NAME}
      </h3>

      <p className="font-anyvid text-sm text-muted-foreground leading-5 mb-2">
        <span className="block mb-1 uline">{APP_SLOGAN}</span>
        {APP_DESCRIPTION}
      </p>

      <p className="font-anyvid text-sm text-muted-foreground leading-5 mb-2">
        <span className="block mb-1 uline">
          1일 영양성분 기준치(식약처 고시 기준 · 2,000 kcal 기준 )
        </span>
        열량 2,000kcal, 나트륨 2,000mg, 탄수화물 324g, 당류 100g, 지방 54g,
        포화지방 15g, 콜레스테롤 300mg, 단백질 55g, 칼슘 700mg
      </p>

      <p className="font-anyvid text-sm text-muted-foreground leading-5 mb-3">
        <span className="block mb-1 uline">
          고함량 표시 기준(1회 제공량 기준)
        </span>
        고열량 500kcal 이상, 고지방 15g 이상, 고당류 25g 이상, 고나트륨 600mg
        이상, 고카페인 150mg 이상
      </p>

      <div className="flex items-center flex-wrap gap-3 text-sm font-anyvid text-muted-foreground">
        {footerMenu.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="group flex items-center gap-1 transition-colors hover:text-brand"
            >
              <Icon className="h-4 w-4 transition-colors group-hover:text-brand" />
              {item.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
