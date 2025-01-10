import { NextResponse } from "next/server";
import path from "path";
import { readFile } from "fs/promises";

export async function GET() {
  try {
    // Add CORS headers
    const headers = {
      'Access-Control-Allow-Origin': '*', // Be more restrictive in production
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    const products = await readFile(
      path.join(process.cwd(), "data", "products.json"),
      "utf-8"
    );

    // Parse JSON before sending
    const parsedProducts = JSON.parse(products);
    
    return NextResponse.json(parsedProducts, { headers });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500, headers: { 'Access-Control-Allow-Origin': '*' } }
    );
  }
}

// Add OPTIONS handler for CORS preflight requests
export async function OPTIONS() {
  return NextResponse.json({}, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
