import type { TaskStatus } from "../types/task";

interface StatusBadgeProps {
  status: TaskStatus;
}

/**
 * Pure display component: maps task status to a colored badge
 */
export default function StatusBadge({ status }: StatusBadgeProps) {
  const statusConfig = {
    todo: {
      label: "Todo",
      bgColor: "bg-red-400",
      textColor: "text-white-200",
    },
    in_progress: {
      label: "In Progress",
      bgColor: "bg-yellow-200",
      textColor: "text-gray-300",
    },
    completed: {
      label: "Completed",
      bgColor: "bg-green-300",
      textColor: "text-gray-300",
    },
    blocked: {
      label: "Blocked",
      bgColor: "bg-fuscia-900",
      textColor: "text-gray-300",
    },
  };
  const config = statusConfig[status];

  // TODO: Return a div with Tailwind classes for the badge
  return (
    <div className={`w-24 rounded-sm ${config.bgColor} ${config.textColor}`}>{config.label}</div>
  );
}
