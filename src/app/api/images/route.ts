import { NextResponse, NextRequest } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(request: NextRequest) {
  try {
    const baseUrl = new URL(request.url).origin;
    const imagesDir = path.join(process.cwd(), "public", "images");

    const files = fs.readdirSync(imagesDir);

    const images = files
      .filter((file) => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
      .map((file) => ({
        name: file,
        url: `${baseUrl}/images/${encodeURIComponent(file)}`,
      }));

    return NextResponse.json({ images });
  } catch (error) {
    console.error("Error reading images directory:", error);
    return NextResponse.json(
      { error: "Failed to retrieve images." },
      { status: 500 }
    );
  }
}
