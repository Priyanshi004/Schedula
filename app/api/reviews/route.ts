import { NextResponse } from "next/server";

interface Appointment {
  id: string;
  doctorId: string;
  patientId: string;
  phone: string;
  name: string;
  age: number;
  mobile: string;
  date: string;
  time: string;
  status: "confirmed" | "waiting" | "rescheduled";
}

// Mock database
let reviews: Appointment[] = [];

export async function GET() {
  return NextResponse.json(reviews, { status: 200 });
}

export async function POST(request: Request) {
  try {
    const apt: Appointment = await request.json();

    // Simple validation
    if (!apt.id || !apt.name) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    reviews.push(apt);
    return NextResponse.json(apt, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create review" },
      { status: 500 }
    );
  }
}
