import type { Task, TaskStatus } from '../types/task'
import StatusBadge from './StatusBadge'

interface TaskCardProps {
  task: Task
  onUpdate: (id: string, updates: Partial<Task>) => void
  onDelete: (id: string) => void
}

export default function TaskCard({ task, onUpdate, onDelete }: TaskCardProps) {
  const handleStatusChange = (newStatus: TaskStatus) => {
    onUpdate(task.id, { status: newStatus })
  }

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-3 hover:shadow-md transition">
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
        <div className="flex gap-2">
          <StatusBadge status={task.status} />
          <button
            onClick={() => onDelete(task.id)}
            className="text-red-600 hover:text-red-800 text-sm font-medium"
          >
            ✕
          </button>
        </div>
      </div>

      {task.description && (
        <p className="text-gray-600 text-sm mb-3">{task.description}</p>
      )}

      <div className="grid grid-cols-2 gap-2 text-sm text-gray-700 mb-3">
        <div>Priority: <span className="font-medium">{task.priority}</span></div>

        {task.assignee && <div>Assigned: {task.assignee}</div>}

        {task.dueDate && <div>Due: {task.dueDate}</div>}

        {task.precinct && <div>Precinct: {task.precinct}</div>}
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => handleStatusChange('todo')}
          className={`text-xs px-2 py-1 rounded ${task.status === 'todo' ? 'bg-gray-200' : 'bg-gray-100 hover:bg-gray-200'}`}
        >
          Todo
        </button>
        <button
          onClick={() => handleStatusChange('in_progress')}
          className={`text-xs px-2 py-1 rounded ${task.status === 'in_progress' ? 'bg-blue-200' : 'bg-blue-100 hover:bg-blue-200'}`}
        >
          Progress
        </button>
        <button
          onClick={() => handleStatusChange('complete')}
          className={`text-xs px-2 py-1 rounded ${task.status === 'complete' ? 'bg-green-200' : 'bg-green-100 hover:bg-green-200'}`}
        >
          Done
        </button>
        <button
          onClick={() => handleStatusChange('blocked')}
          className={`text-xs px-2 py-1 rounded ${task.status === 'blocked' ? 'bg-red-200' : 'bg-red-100 hover:bg-red-200'}`}
        >
          Blocked
        </button>
      </div>
    </div>
  )
}
