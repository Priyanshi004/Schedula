// app/api/inventory/route.ts
import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET() {
  const filePath = path.join(process.cwd(), 'data', 'inventory.json');
  const data = await fs.readFile(filePath, 'utf8');
  return NextResponse.json(JSON.parse(data));
}
