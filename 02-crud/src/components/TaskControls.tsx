import type { TaskStatus } from '../types/task'

interface TaskControlsProps {
  filterStatus: TaskStatus | 'all'
  sortBy: 'created' | 'priority' | 'dueDate'
  onFilterChange: (status: TaskStatus | 'all') => void
  onSortChange: (sort: 'created' | 'priority' | 'dueDate') => void
  taskCount: number
}

export default function TaskControls({
  filterStatus,
  sortBy,
  onFilterChange,
  onSortChange,
  taskCount,
}: TaskControlsProps) {
  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Status</label>
          <select
            value={filterStatus}
            onChange={(e) => onFilterChange(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="all">All Tasks</option>
            <option value="todo">To Do</option>
            <option value="in_progress">In Progress</option>
            <option value="complete">Complete</option>
            <option value="blocked">Blocked</option>
          </select>
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">Sort by</label>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="created">Recently Created</option>
            <option value="priority">Priority (High → Low)</option>
            <option value="dueDate">Due Date</option>
          </select>
        </div>

        <div className="text-sm text-gray-600">
          Showing <span className="font-bold text-gray-900">{taskCount}</span> task{taskCount !== 1 ? 's' : ''}
        </div>
      </div>
    </div>
  )
}
