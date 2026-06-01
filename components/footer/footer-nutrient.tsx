const DAILY_ITEMS = [
  { label: "열량",       value: 2000, unit: "kcal" },
  { label: "나트륨",     value: 2000, unit: "mg"   },
  { label: "탄수화물",   value: 324,  unit: "g"    },
  { label: "당류",       value: 100,  unit: "g"    },
  { label: "지방",       value: 54,   unit: "g"    },
  { label: "포화지방",   value: 15,   unit: "g"    },
  { label: "콜레스테롤", value: 300,  unit: "mg"   },
  { label: "단백질",     value: 55,   unit: "g"    },
  { label: "칼슘",       value: 700,  unit: "mg"   },
];

const HIGH_CONTENT_ITEMS = [
  { label: "고열량",   threshold: "500 kcal 이상", color: "text-orange-500" },
  { label: "고지방",   threshold: "15 g 이상",     color: "text-yellow-600" },
  { label: "고당류",   threshold: "25 g 이상",     color: "text-pink-500"   },
  { label: "고나트륨", threshold: "600 mg 이상",   color: "text-blue-500"   },
  { label: "고카페인", threshold: "150 mg 이상",   color: "text-purple-500" },
];

export default function FooterNutrient() {
  return (
    <div className="border-t border-gray-300/40 pt-6 pb-2 space-y-4 font-anyvid">
      {/* 1일 영양성분 기준치 */}
      <div>
        <p className="text-xs font-semibold text-slate-600 mb-2">
          1일 영양성분 기준치
          <span className="ml-1.5 font-normal text-muted-foreground">식약처 고시 기준 · 2,000 kcal 기준</span>
        </p>
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          {DAILY_ITEMS.map(({ label, value, unit }) => (
            <span key={label} className="text-xs text-muted-foreground">
              {label}
              <span className="ml-1 font-semibold text-slate-600">
                {value.toLocaleString()} {unit}
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* 고함량 표시 기준 */}
      <div>
        <p className="text-xs font-semibold text-slate-600 mb-2">
          고함량 표시 기준
          <span className="ml-1.5 font-normal text-muted-foreground">1회 제공량 기준</span>
        </p>
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          {HIGH_CONTENT_ITEMS.map(({ label, threshold, color }) => (
            <span key={label} className="text-xs text-muted-foreground">
              <span className={`font-semibold ${color}`}>{label}</span>
              <span className="ml-1">{threshold}</span>
            </span>
          ))}
        </div>
      </div>

      {/* 안내 */}
      <p className="text-[11px] text-muted-foreground leading-relaxed">
        영양성분 기준치는 개인의 필요 열량에 따라 다를 수 있으며, 표시된 비율(%)은 참고용입니다. 실제 섭취 기준은 의료진 또는 영양 전문가와 상담하시기 바랍니다.
      </p>
    </div>
  );
}
