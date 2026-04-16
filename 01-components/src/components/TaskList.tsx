import TaskCard from "./TaskCard";
import type { Task } from "../types/task";

interface TaskListProps {
  tasks: Task[];
}

/**
 * List component: renders multiple tasks with empty state handling
 */
export default function TaskList({ tasks }: TaskListProps) {
  // TODO: Check if tasks array is empty and show empty state
  if (tasks.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <p className="text-gray-500 text-lg">No tasks yet. Create one to get started!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Active Tasks</h2>
      <div>
        {/* TODO: Map over tasks array, rendering TaskCard for each */}
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}
