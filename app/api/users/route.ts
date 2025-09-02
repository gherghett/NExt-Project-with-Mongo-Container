import { NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma";

export async function GET() {
  const users = await prisma.user.findMany({ include: { posts: true } });
  return NextResponse.json(users);
}

export async function POST(request: Request) {
  const body = await request.json();
  const user = await prisma.user.create({
    data: {
      email: body.email,
      name: body.name ?? null,
    },
  });
  return NextResponse.json(user, { status: 201 });
}

// Example: bulk delete with a transaction (requires replica set)
export async function DELETE(request: Request) {
  const { emailDomain } = await request.json();
  const result = await prisma.$transaction(async (tx) => {
    // delete posts of users in the domain, then the users
    const users = await tx.user.findMany({
      where: { email: { endsWith: `@${emailDomain}` } },
      select: { id: true },
    });
    const ids = users.map((u) => u.id);
    await tx.post.deleteMany({ where: { authorId: { in: ids } } });
    const del = await tx.user.deleteMany({
      where: { id: { in: ids } },
    });
    return { deletedUsers: del.count };
  });

  return NextResponse.json(result);
}
