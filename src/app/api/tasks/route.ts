import { Task } from '@/types/task';
import { NextResponse } from 'next/server';

let tasks: Task[] = [
  { id: 1, title: 'Example Task', description: 'This is a sample task.', completed: false },
];

export async function GET() {
  return NextResponse.json(tasks);
}

export async function POST(req: Request) {
  const { title, description } = await req.json();
  const newTask = { id: Date.now(), title, description, completed: false };
  tasks.push(newTask);
  return NextResponse.json(newTask, { status: 201 });
}

export async function PUT(req: Request) {
  const { id, title, description, completed } = await req.json();
  tasks = tasks.map((task) =>
    task.id === id ? { ...task, title, description, completed } : task
  );
  return NextResponse.json({ message: 'Task updated successfully' });
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  tasks = tasks.filter((task) => task.id !== id);
  return NextResponse.json({ message: 'Task deleted successfully' });
}
