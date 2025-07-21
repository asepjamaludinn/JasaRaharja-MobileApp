import { Star } from "lucide-react";

export function TotalPointCard() {
  return (
    <div className="relative bg-dashboardTotalPointsBg text-white rounded-[10px] h-[80px] mx-4 flex flex-col items-center justify-center shadow-card">
      <Star
        className="absolute w-8 h-8 text-dashboardStarYellow"
        fill="#FCD53F"
        stroke="none"
        style={{ top: "-10px", left: "35px", transform: "rotate(-17.23deg)" }}
      />
      <Star
        className="absolute w-8 h-8 text-dashboardStarYellow"
        fill="#FCD53F"
        stroke="none"
        style={{ top: "60px", right: "40px", transform: "rotate(18.19deg)" }}
      />
      <span className="text-4xl font-bold">400</span>
      <span className="text-xs font-light">Total Point</span>
    </div>
  );
}
