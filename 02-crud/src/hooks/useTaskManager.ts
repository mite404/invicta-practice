import { useState, useMemo } from "react";
import type { Task, TaskStatus } from "../types/task";

interface UseTaskManagerReturn {
  tasks: Task[];
  filteredTasks: Task[];
  filterStatus: TaskStatus | "all";
  sortBy: "created" | "priority" | "dueDate";
  setFilterStatus: (status: TaskStatus | "all") => void;
  setSortBy: (sort: "created" | "priority" | "dueDate") => void;
  addTask: (task: Omit<Task, "id" | "createdAt">) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
}

/**
 * Custom hook for managing task CRUD operations and filtering
 *
 * This hook encapsulates all task management logic, separating it from UI components.
 * Components that use this hook don't need to know HOW tasks are stored or filtered,
 * only THAT they can be filtered and sorted.
 */
export default function useTaskManager(): UseTaskManagerReturn {
  // TODO: Initialize tasks state with some sample data
  // Use the same initial tasks from App.tsx in module 1
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Organize phone banking event",
      description: "Coordinate volunteer calls for precinct 5",
      status: "in_progress",
      priority: "high",
      assignee: "Alex Chen",
      precinct: "Precinct 5",
      dueDate: "2025-04-20",
      createdAt: "2025-04-01T10:00:00Z",
    },
    {
      id: "2",
      title: "Create voter outreach materials",
      status: "todo",
      priority: "medium",
      dueDate: "2025-04-25",
      createdAt: "2025-04-01T10:15:00Z",
    },
  ]);

  // TODO: Initialize filter and sort state
  const [filterStatus, setFilterStatus] = useState<TaskStatus | "all">("all");
  const [sortBy, setSortBy] = useState<"created" | "priority" | "dueDate">("created");

  // TODO: Implement addTask function
  const addTask = (newTask: Omit<Task, "id" | "createdAt">) => {
    const updatedTask = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      ...newTask,
    };

    setTasks([...tasks, updatedTask]);
  };

  // TODO: Implement updateTask function
  const updateTask = (id: string, updates: Partial<Task>) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          ...updates,
        };
      } else return task;
    });
    setTasks(updatedTasks);
  };

  // TODO: Implement deleteTask function
  const deleteTask = (id: string) => {
    const filteredTasksArr = tasks.filter((task) => task.id !== id);
    setTasks(filteredTasksArr);
  };

  // TODO: Implement filtered and sorted tasks using useMemo
  // 1. Filter tasks by status (or show all if filterStatus is 'all')
  // 2. Sort by created date (newest first), priority (high→medium→low), or dueDate
  // Remember to depend on [tasks, filterStatus, sortBy]
  const filteredTasks = useMemo(() => {
    let result = tasks;

    // filter by status
    if (filterStatus !== "all") {
      result = result.filter((t) => t.status === filterStatus);
    }

    // sort based on
    if (sortBy === "created") {
      result = [...result].sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
    } else if (sortBy === "priority") {
      result = [...result].sort((a, b) => {
        const priorityOrder = { high: 3, medium: 2, low: 1 };

        return priorityOrder[b.priority] - priorityOrder[a.priority];
      });
    } else if (sortBy === "dueDate") {
      result = [...result].sort((a, b) => {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return a.dueDate.localeCompare(b.dueDate);
      });
    }

    return result;
  }, [tasks, filterStatus, sortBy]);

  return {
    tasks,
    filteredTasks,
    filterStatus,
    sortBy,
    setFilterStatus,
    setSortBy,
    addTask,
    updateTask,
    deleteTask,
  };
}
