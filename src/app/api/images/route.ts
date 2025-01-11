import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(request: Request) {
  try {
    // Get the `name` query parameter from the request URL
    const { searchParams } = new URL(request.url);
    const name = searchParams.get("name");

    if (!name) {
      return NextResponse.json(
        { error: "Image name is required as a query parameter." },
        { status: 400 }
      );
    }

    // Construct the file path
    const filePath = path.join(process.cwd(), "public", "images", name);

    // Check if the file exists
    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: `Image '${name}' not found.` },
        { status: 404 }
      );
    }

    // Read the file and serve it as a response
    const fileBuffer = fs.readFileSync(filePath);
    return new Response(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": getContentType(name),
      },
    });
  } catch (error) {
    console.error("Error serving image:", error);
    return NextResponse.json(
      { error: "Failed to process the request." },
      { status: 500 }
    );
  }
}

// Utility function to determine content type
function getContentType(filename: string): string {
  const ext = path.extname(filename).toLowerCase();
  switch (ext) {
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".png":
      return "image/png";
    case ".gif":
      return "image/gif";
    case ".webp":
      return "image/webp";
    default:
      return "application/octet-stream";
  }
}
