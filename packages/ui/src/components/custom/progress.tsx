import { cva } from "class-variance-authority";
import { cn } from "../../utils";
import { Colors, statusColor } from "../../utils/status-badge";

 

interface ProgressBaseProps {
    children?:any;
    className?:any;
}
// cva status based on color and variant
const statusVariants = cva("text-xs uppercase", {
    variants: {
      variant: {
        default: "",
        secondary: "",
      },
      color: {
        slate: "text-slate-700",
        gray: "text-gray-700",
        zinc: "text-zinc-700",
        neutral: "text-neutral-700",
        stone: "text-stone-700",
        red: "text-red-700",
        orange: "text-orange-700",
        amber: "text-amber-700",
        yellow: "text-yellow-700",
        lime: "text-lime-700",
        green: "text-green-700",
        emerald: "text-emerald-700",
        teal: "text-teal-700",
        cyan: "text-cyan-700",
        sky: "text-sky-700",
        blue: "text-blue-700",
        indigo: "text-indigo-700",
        violet: "text-violet-700",
        purple: "text-purple-700",
        fuchsia: "text-fuchsia-700",
        pink: "text-pink-700",
        rose: "text-rose-700",
        lightBlue: "text-lightBlue-700",
        warmGray: "text-warmGray-700",
        trueGray: "text-trueGray-700",
        coolGray: "text-coolGray-700",
        blueGray: "text-blueGray-700",
      },
    },
    compoundVariants: [
      ...[
        "slate",
        "gray",
        "zinc",
        "neutral",
        "stone",
        "red",
        "orange",
        "amber",
        "yellow",
        "lime",
        "green",
        "emerald",
        "teal",
        "cyan",
        "sky",
        "blue",
        "indigo",
        "violet",
        "purple",
        "fuchsia",
        "pink",
        "rose",
        "lightBlue",
        "warmGray",
        "trueGray",
        "coolGray",
        "blueGray",
      ].map((color) => ({
        variant: "secondary",
        color,
        class: `bg-${color}-100 rounded-lg px-1 text-${color}-700`,
      }))as any
    ],
  });
  


function ProgressBase({ children, className }: ProgressBaseProps) {
    return (
        <div className={cn("flex flex-col items-start", className)}>
            {children}
        </div>
    );
}
interface StatusProps {
    noDot?: boolean;
    children:any;
    color?: Colors;
    variant?: "default" | "secondary"
}
function Status({ children, noDot, color,variant }: StatusProps) {
    const _color = color || statusColor(children);
    return (
        <div className="inline-flex items-center gap-2 font-semibold">
            {!noDot && (
                <div className={cn("w-1.5 h-1.5", `bg-${_color}-500`)}></div>
            )}

            <div className={cn(statusVariants({color:_color as any,variant}),
                "")}>
                {children}
            </div>
        </div>
    );
}
interface ProgressBarProps {
    children?:any;
    className?:any;
}
function ProgressBar({ children, className }: ProgressBarProps) {
    return <div className={cn(className)}>{children}</div>;
}
export const Progress = Object.assign(ProgressBase, {
    Status,
    ProgressBar,
});
