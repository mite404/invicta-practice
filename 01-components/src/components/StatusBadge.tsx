import type { TaskStatus } from '../types/task'

interface StatusBadgeProps {
  status: TaskStatus
}

/**
 * Pure display component: maps task status to a colored badge
 */
export default function StatusBadge({ status }: StatusBadgeProps) {
  // TODO: Define a mapping object: status → { label, bgColor, textColor }
  const statusConfig = ___________

  // TODO: Return a div with Tailwind classes for the badge
  return <div>___________</div>
}
