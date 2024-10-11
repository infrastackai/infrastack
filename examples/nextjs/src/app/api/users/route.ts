import { NextResponse } from "next/server";

// In-memory database
const users: { id: number; name: string }[] = [];

export async function GET() {
  return NextResponse.json(users);
}

export async function POST(request: Request) {
  const body = await request.json();
  const newUser = {
    id: users.length + 1,
    name: body.name,
  };
  users.push(newUser);
  return NextResponse.json(newUser, { status: 201 });
}
