/**
 * Task domain types for Invicta campaign management
 */

// Status options for campaign tasks
export type TaskStatus = "in_progress" | "complete" | "todo" | "blocked";

// Priority levels for task organization
export type Priority = "high" | "medium" | "low";

// Main task interface
export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: Priority;
  assignee?: string; // organizer/volunteer name
  precinct?: string; // geographic unit
  dueDate?: string; // ISO date string
  createdAt: string;
}
