import { NextResponse } from "next/server";

let tasks = [
    {
      id: 1,
      title: 'Добавьте свою первую задачу',
      description: 'Эта задача создана автоматически. Вы можете удалить ее и добавить свои задачи.',
    },
  ];
  
export async function GET() {
    return NextResponse.json(tasks);
}

export async function POST(req: Request) {
    const {title, description} = await req.json();
    const newTask = { id: Date.now(), title, description };
    tasks.push(newTask);

    return NextResponse.json(newTask);
}

export async function DELETE(req: Request) {
    const { id } = await req.json();

    tasks = tasks.filter((task) => task.id !== id);

    return NextResponse.json({ message: 'Task Deleted' });
}