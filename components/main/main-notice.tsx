import caloriesData from "@/json/calories.json";

export default function MainNotice() {
  return (
    <div className="main__notice" aria-live="polite" aria-atomic="true">
      <div className="my-4 rounded-lg border bg-slate-50/80 px-4 py-3 text-center text-sm text-muted-foreground font-anyvid">
        <p>
          현재 <span className="text-red-600 font-bold">{caloriesData.length}</span>
          개의 데이터가 있습니다.
        </p>
      </div>
    </div>
  );
}
