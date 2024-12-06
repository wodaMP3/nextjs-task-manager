import dbConnect from '@/utils/dbConnect';
import User from '@/models/User';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'default_secret_key';

export async function POST(req: Request) {
  await dbConnect();
  const { username, password } = await req.json();

  const user = await User.findOne({ username });

  if (!user || user.password !== password) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  // Генерация JWT токена
  const token = jwt.sign({ id: user._id, username: user.username }, SECRET, {
    expiresIn: '1h',
  });

  const response = NextResponse.json({ message: 'Login successful' });
  response.cookies.set('auth-token', token, { httpOnly: true });
  return response;
}
