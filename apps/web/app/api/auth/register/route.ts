import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  console.log(process.env.BACKEND_SERVER_URL);
  const { email, password, name } = await request.json();
  try {
    const response = await fetch(
      `${process.env.BACKEND_SERVER_URL}/auth/register`,
      {
        method: "POST",
        body: JSON.stringify({ email, password, name }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.log(error);

    return NextResponse.json({ error: error }, { status: 500 });
  }
}
