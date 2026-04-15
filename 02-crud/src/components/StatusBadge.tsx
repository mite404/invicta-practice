import type { TaskStatus } from '../types/task'

interface StatusBadgeProps {
  status: TaskStatus
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const statusConfig = {
    todo: { label: 'To Do', bgColor: 'bg-gray-100', textColor: 'text-gray-800' },
    in_progress: { label: 'In Progress', bgColor: 'bg-blue-100', textColor: 'text-blue-800' },
    complete: { label: 'Complete', bgColor: 'bg-green-100', textColor: 'text-green-800' },
    blocked: { label: 'Blocked', bgColor: 'bg-red-100', textColor: 'text-red-800' },
  }

  const config = statusConfig[status]

  return (
    <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${config.bgColor} ${config.textColor}`}>
      {config.label}
    </span>
  )
}
