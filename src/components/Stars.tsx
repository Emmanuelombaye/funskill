export default function Stars({ rating, size = "text-sm" }: { rating: number; size?: string }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.4 && full < 5;
  return (
    <span className={`${size} tracking-tight`} style={{ color: "#FFD700" }} aria-label={`${rating} out of 5`}>
      {Array.from({ length: 5 }, (_, i) => {
        if (i < full) return "★";
        if (i === full && half) return "★";
        return "☆";
      }).join("")}
    </span>
  );
}
