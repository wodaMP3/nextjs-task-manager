'use client'

import { useEffect, useState } from "react"
import { fetchTasks, deleteTask } from "@/utils/api"

interface Task {
  id: number;
  title: string; 
  description: string;
}

export default function HomePage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await fetchTasks(); // getting tasks from utils;
        setTasks(data);
      } catch (err) {
        setError('Failed to load tasks');
      } finally {
        setLoading(false);
      }
    };
    loadTasks();
  }, []);

  const handleDelete = async(id: number) => {
    try {
      await deleteTask(id); // deleting task using util;
    } catch (err) {
      setError('Failed to delete task');
    }
  };

  if (loading) return <p>Loading tasks...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <div>
      <h1>Task Manager</h1>
      {tasks.length === 0 ? (
        <p>No tasks found. Add your first task!</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <h2>{task.title}</h2>
              <p>{task.description}</p>
              <button onClick={() => handleDelete(task.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}