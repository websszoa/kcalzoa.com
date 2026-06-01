import Image from "next/image";
import Link from "next/link";
import { Flame } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import caloriesData from "@/json/calories.json";

type CalorieItem = (typeof caloriesData)[number];

const NUTRIENT_MAX: Record<string, number> = {
  calories: 800,
  carbohydrate_g: 100,
  protein_g: 60,
  fat_g: 60,
  sugar_g: 80,
};

function resolveCalorieImageUrl(url: string): string | null {
  if (!url) return null;
  if (url.startsWith("http")) return url;
  return `/${url}`;
}

function getHighContentBadges(item: Pick<CalorieItem, "calories" | "fat_g" | "sugar_g" | "sodium_mg" | "caffeine_mg">) {
  const badges: { label: string; color: string }[] = [];
  if (item.calories >= 600) badges.push({ label: "고열량", color: "bg-orange-500" });
  if (item.fat_g >= 25) badges.push({ label: "고지방", color: "bg-yellow-500" });
  if (item.sugar_g >= 30) badges.push({ label: "고당류", color: "bg-pink-500" });
  if (item.sodium_mg >= 900) badges.push({ label: "고나트륨", color: "bg-red-500" });
  if (item.caffeine_mg >= 160) badges.push({ label: "고카페인", color: "bg-purple-500" });
  return badges;
}

interface NutrientBarProps {
  label: string;
  field: string;
  value: number;
  unit: string;
  color: string;
}

function NutrientBar({ label, field, value, unit, color }: NutrientBarProps) {
  const max = NUTRIENT_MAX[field] ?? 100;
  const percent = Math.min((value / max) * 100, 100);
  return (
    <div className="flex items-center gap-2">
      <span className="w-14 shrink-0 text-[11px] text-slate-500 font-anyvid">{label}</span>
      <div className="relative h-1.5 flex-1 rounded-full bg-gray-100 overflow-hidden">
        <div
          className={`absolute left-0 top-0 h-full rounded-full ${color}`}
          style={{ width: `${percent}%` }}
        />
      </div>
      <span className="w-14 shrink-0 text-right text-[11px] text-slate-600 font-anyvid">
        {value}{unit}
      </span>
    </div>
  );
}

export default function MainListCard() {
  return (
    <section className="main__list__card">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {caloriesData.map((item, index) => (
          <Card
            key={item.id}
            className="group flex h-full flex-col border border-gray-200/80 bg-white/90 py-0 transition-all hover:-translate-y-0.5 hover:shadow-lg overflow-hidden"
          >
            <CardContent className="flex gap-0 p-0">
              {/* 이미지 */}
              <Link
                href={`/calorie/${item.slug}`}
                className="relative flex h-[240px] w-[160px] shrink-0 overflow-hidden bg-gray-100"
              >
                {item.image_url ? (
                  <Image
                    src={resolveCalorieImageUrl(item.image_url)!}
                    alt={item.name}
                    fill
                    priority={index < 2}
                    loading={index < 2 ? "eager" : "lazy"}
                    sizes="160px"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-gray-300">
                    <Flame className="h-10 w-10" />
                  </div>
                )}
              </Link>

              {/* 정보 */}
              <div className="flex min-w-0 flex-1 flex-col justify-between p-3 md:p-4">
                {/* 제품명 + 업체명 */}
                <div className="space-y-0.5">
                  <Link href={`/calorie/${item.slug}`} className="block">
                    <h3 className="text-xl mb-2 text-slate-800 font-paperlogy leading-tight truncate group-hover:text-green-700 transition-colors">
                      {item.name}
                    </h3>
                  </Link>

                  <div className="flex flex-wrap gap-1">
                    {getHighContentBadges({
                      calories: item.calories,
                      fat_g: item.fat_g,
                      sugar_g: item.sugar_g,
                      sodium_mg: item.sodium_mg,
                      caffeine_mg: item.caffeine_mg,
                    }).map((badge) => (
                      <Badge
                        key={badge.label}
                        className={`${badge.color} text-white font-anyvid font-semibold border-0 text-[11px] px-2 py-0.5`}
                      >
                        {badge.label}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div></div>

                {/* 영양소 바 */}
                <div className="space-y-2">
                  <NutrientBar
                    label="열량"
                    field="calories"
                    value={item.calories}
                    unit="kcal"
                    color="bg-orange-400"
                  />
                  <NutrientBar
                    label="탄수화물"
                    field="carbohydrate_g"
                    value={item.carbohydrate_g}
                    unit="g"
                    color="bg-blue-400"
                  />
                  <NutrientBar
                    label="단백질"
                    field="protein_g"
                    value={item.protein_g}
                    unit="g"
                    color="bg-red-400"
                  />
                  <NutrientBar
                    label="지방"
                    field="fat_g"
                    value={item.fat_g}
                    unit="g"
                    color="bg-yellow-400"
                  />
                  <NutrientBar
                    label="당류"
                    field="sugar_g"
                    value={item.sugar_g}
                    unit="g"
                    color="bg-pink-400"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
