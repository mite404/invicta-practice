import type { Task } from "../types/task";
import StatusBadge from "./StatusBadge";

interface TaskCardProps {
  task: Task;
}

/**
 * Card component: displays a single task with status badge and metadata
 */
export default function TaskCard({ task }: TaskCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-4 mb-3">
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
        <StatusBadge status={task.status} />
      </div>

      {task.description && <p className="text-gray-600 text-sm mb-3">{task.description}</p>}

      <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
        {/* TODO: Display priority with a label */}
        <div>Priority: {task.priority}</div>

        {/* TODO: Display assignee if present */}
        {task.assignee && <div>Assigned: {task.assignee}</div>}

        {/* TODO: Display due date if present */}
        {task.dueDate && <div>Due: {task.dueDate}</div>}

        {/* TODO: Display precinct if present */}
        {task.precinct && <div>Precinct: {task.precinct}</div>}
      </div>
    </div>
  );
}
