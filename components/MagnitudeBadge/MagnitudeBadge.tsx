import classNames from "classnames";

export function MagnitudeBadge({ magnitude }: { magnitude: number }) {
  return (
    <span
      className={classNames(
        "inline-block",
        "px-2",
        "py-1",
        "rounded-lg",
        "text-white",
        "text-xs",
        "font-bold",
        "uppercase",
        getTextcolor(magnitude)
      )}
      style={{ backgroundColor: getMagnitudeColor(magnitude) }}
    >
      {magnitude.toFixed(1)}
    </span>
  );
}

function getTextcolor(magnitude: number) {
  if (magnitude >= 5 && magnitude < 6) return "text-yellow-900";
  return "text-white";
}

export function getMagnitudeColor(magnitude: number) {
  if (magnitude < 2) return "#009600";
  if (magnitude < 4) return "#52BC01";
  if (magnitude < 5) return "#A9DB00";
  if (magnitude < 6) return "#F5FF54";
  if (magnitude < 7) return "#F7D822";
  if (magnitude < 8) return "#FE9A02";
  return "#FF0002";
}
