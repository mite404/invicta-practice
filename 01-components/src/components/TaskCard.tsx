import type { Task } from '../types/task'
import StatusBadge from './StatusBadge'

interface TaskCardProps {
  task: Task
}

/**
 * Card component: displays a single task with status badge and metadata
 */
export default function TaskCard({ task }: TaskCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-4 mb-3">
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-lg font-semibold text-gray-900">___________</h3>
        <StatusBadge status={___________} />
      </div>

      {task.description && (
        <p className="text-gray-600 text-sm mb-3">___________</p>
      )}

      <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
        {/* TODO: Display priority with a label */}
        <div>Priority: ___________</div>

        {/* TODO: Display assignee if present */}
        {___________ && <div>Assigned: {task.assignee}</div>}

        {/* TODO: Display due date if present */}
        {___________ && <div>Due: {task.dueDate}</div>}

        {/* TODO: Display precinct if present */}
        {___________ && <div>Precinct: {task.precinct}</div>}
      </div>
    </div>
  )
}
