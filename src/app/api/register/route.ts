import dbConnect from '@/utils/dbConnect';
import User from '@/models/User';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  await dbConnect();
  const { username, password } = await req.json();

  const existingUser = await User.findOne({ username });

  if (existingUser) {
    return NextResponse.json({ error: 'User already exists' }, { status: 400 });
  }

  const newUser = new User({ username, password });
  await newUser.save();

  return NextResponse.json({ message: 'User registered successfully' });
}
