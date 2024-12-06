'use client';

import { useEffect, useState } from 'react';
import { fetchTasks, deleteTask } from '@/utils/api';
import { Task } from '@/types/task';
import Link from 'next/link';

export default function HomePage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await fetchTasks();
        setTasks(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <p className="text-center text-gray-500">Loading tasks...</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Task Manager</h1>

      {/* Кнопки для логина и регистрации */}
      <div className="flex justify-end space-x-2 mb-4">
        <Link href="/login">
          <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
            Login
          </button>
        </Link>
        <Link href="/register">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Register
          </button>
        </Link>
      </div>

      {/* Кнопка добавления задач */}
      <div className="flex justify-end mb-4">
        <Link href="/add-task">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Add Task
          </button>
        </Link>
      </div>

      {/* Список задач */}
      <ul className="space-y-4">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="p-4 bg-gray-100 rounded shadow-md flex justify-between items-center"
          >
            <div>
              <h2 className="text-lg font-semibold">{task.title}</h2>
              <p className="text-gray-600">{task.description}</p>
            </div>
            <div className="flex space-x-2">
              <Link href={`/edit-task/${task.id}`}>
                <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                  Edit
                </button>
              </Link>
              <button
                onClick={() => handleDelete(task.id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
