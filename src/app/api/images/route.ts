import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const baseUrl = "https://template-6-api.vercel.app";

export async function GET() {
  try {
    const imagesDir = path.join(process.cwd(), "public", "images");

    // Read all files in the images directory
    const files = fs.readdirSync(imagesDir);

    // Filter for image files and create URLs for them
    const images = files
      .filter((file) => /\.(jpg|jpeg|png|gif|webp)$/i.test(file)) // Filter image files
      .map((file) => ({
        name: file,
        url: `${baseUrl}/images/${encodeURIComponent(file)}`, // Generate full URL
      }));

    // Return a JSON object of images
    return NextResponse.json({ images });
  } catch (error) {
    console.error("Error reading images directory:", error);
    return NextResponse.json(
      { error: "Failed to retrieve images." },
      { status: 500 }
    );
  }
}
