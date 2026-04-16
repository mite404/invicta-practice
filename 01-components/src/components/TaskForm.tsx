import { useState } from "react";
import type { Task } from "../types/task";

interface TaskFormProps {
  onSubmit: (task: Omit<Task, "id" | "createdAt">) => void;
}

/**
 * Form component: controlled inputs for creating a new task
 *
 * This component demonstrates controlled components and form handling in React.
 * Each input is controlled by state, allowing us to manage the form data
 * before submission and provide real-time validation feedback.
 */
export default function TaskForm({ onSubmit }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState<"todo" | "in_progress" | "complete" | "blocked">("todo");
  const [priority, setPriority] = useState<"high" | "medium" | "low">("medium");
  const [description, setDescription] = useState("");

  // TODO: Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // TODO: Validate that title is not empty
    if (!title) {
      alert("Title is required");
      return;
    }

    // TODO: Call onSubmit with the form data
    onSubmit({
      title: title,
      status: status,
      priority: priority,
      description: description ? description : undefined,
    });

    // TODO: Reset form fields
    setTitle("");
    setStatus("todo");
    setPriority("medium");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">New Task</h2>

      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Task Title *
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task title"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
          Status
        </label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value as any)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="todo">To Do</option>
          <option value="in_progress">In Progress</option>
          <option value="complete">Complete</option>
          <option value="blocked">Blocked</option>
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
          Priority
        </label>
        <select
          id="priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value as any)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div className="mb-6">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description (optional)
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add task details..."
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white font-medium py-2 px-4 rounded-md hover:bg-indigo-700 transition"
      >
        Create Task
      </button>
    </form>
  );
}
