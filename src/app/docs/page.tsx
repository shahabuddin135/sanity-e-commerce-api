"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import { Marcellus } from "next/font/google";

const marcellus = Marcellus({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-marcellus",
});

const endpoints = [
  {
    title: "Get All Products",
    method: "GET",
    path: "/api/products",
    description: "Retrieve a list of all products in the catalog.",
    responseFields: [
      { name: "id", description: "Unique product identifier" },
      { name: "name", description: "Product name" },
      { name: "description", description: "Detailed product description" },
      { name: "price", description: "Current price (in paise/cents)" },
      { name: "originalPrice", description: "Original price before discount" },
      { name: "discount", description: "Discount percentage" },
      { name: "category", description: "Product category" },
      { name: "tags", description: "Array of product tags" },
      { name: "mainImage", description: "Containing the main product image URL" },
      { name: "sideAngleImages", description: "Array of objects containing different angles image URLs & unique key" },
      { name: "color", description: "Available colors" },
      { name: "sizes", description: "Available sizes" },
      { name: "stock", description: "Current stock count" },
      { name: "dimensions", description: "Product dimensions" },
      { name: "material", description: "Primary material used" },
      { name: "secondaryMaterial", description: "Secondary material used" },
      { name: "configuration", description: "Product configuration" },
      { name: "upholsteryMaterial", description: "Upholstery material" },
      { name: "upholsteryColor", description: "Upholstery color" },
      { name: "fillingMaterial", description: "Filling material" },
      { name: "finishType", description: "Finish type" },
      { name: "originOfManufacture", description: "Origin of manufacture" },
      { name: "warranty", description: "Warranty details" },
      { name: "rating", description: "Product rating details" },
      { name: "salesPackage", description: "Items included in sales package" },
      { name: "modelNumber", description: "Product model number" },
      { name: "sku", description: "Stock Keeping Unit" },
      { name: "features", description: "Array of product features" },
    ],
    exampleResponse: `[
  {
    "id": "SS002",
    "name": "Modern Leather Sofa",
    "description": "A sleek and luxurious leather sofa...",
    "price": 320000,
    "originalPrice": 350000,
    "discount": 8.57,
    "category": "Sofas",
    "tags": ["Leather", "Modern", "Luxury", "Home"],
  
      "mainImage": "https://template-6-api.vercel.app/images/bed-main.jpeg",

      "sideAngleImages": [
        { "key": "side1", "url": "https://template-6-api.vercel.app/images/bed%20(5).jpeg" },
        { "key": "side2", "url": "https://template-6-api.vercel.app/images/bed%20(4).jpeg" },
        { "key": "side3", "url": "https://template-6-api.vercel.app/images/bed%20(2).jpeg" },
        { "key": "side4", "url": "https://template-6-api.vercel.app/images/bed%20(1).jpeg" }
      ],
    
    "color": ["Black", "Brown"],
    "sizes": ["L", "XL"],
    "stock": 8,
    "dimensions": {
      "width": "280 cm",
      "height": "80 cm",
      "depth": "170 cm",
      "weight": "50 kg",
      "seatHeight": "42 cm",
      "legHeight": "6 cm"
    },
    "material": "Genuine Leather",
    "secondaryMaterial": "Stainless Steel",
    "configuration": "Straight",
    "upholsteryMaterial": "Genuine Leather",
    "upholsteryColor": "Black",
    "fillingMaterial": "High-Density Foam",
    "finishType": "Glossy",
    "originOfManufacture": "Italy",
    "warranty": {
      "summary": "2 Years Warranty",
      "serviceType": "Email at support@luxurysofas.com for claims",
      "covered": "Manufacturing defects",
      "notCovered": "Damage due to misuse",
      "domesticWarranty": "2 Years"
    },
    "rating": {
      "average": 4.6,
      "breakdown": {
        "fiveStars": 180,
        "fourStars": 120,
        "threeStars": 30,
        "twoStars": 5,
        "oneStar": 2
      }
    },
    "salesPackage": "1 Leather Sofa, 2 Cushions",
    "modelNumber": "LSBLK001",
    "sku": "SS002",
    "features": [
      "Adjustable Headrest: No",
      "Maximum Load Capacity: 300 KG",
      "Handmade: Yes"
    ]
  }
]`,
  },
  {
    title: "Get Single Product",
    method: "GET",
    path: "/api/products/[id]",
    description: "Retrieve details of a specific product by its ID.",
    responseFields: [
      { name: "id", description: "Unique product identifier" },
      { name: "name", description: "Product name" },
      { name: "description", description: "Detailed product description" },
      { name: "price", description: "Current price (in paise/cents)" },
      { name: "originalPrice", description: "Original price before discount" },
      { name: "discount", description: "Discount percentage" },
      { name: "category", description: "Product category" },
      { name: "tags", description: "Array of product tags" },
      { name: "mainImage", description: "Containing the main product image URL" },
      { name: "sideAngleImages", description: "Array of objects containing different angles image URLs & unique key" },
      { name: "color", description: "Available colors" },
      { name: "sizes", description: "Available sizes" },
      { name: "stock", description: "Current stock count" },
      { name: "dimensions", description: "Product dimensions" },
      { name: "material", description: "Primary material used" },
      { name: "secondaryMaterial", description: "Secondary material used" },
      { name: "configuration", description: "Product configuration" },
      { name: "upholsteryMaterial", description: "Upholstery material" },
      { name: "upholsteryColor", description: "Upholstery color" },
      { name: "fillingMaterial", description: "Filling material" },
      { name: "finishType", description: "Finish type" },
      { name: "originOfManufacture", description: "Origin of manufacture" },
      { name: "warranty", description: "Warranty details" },
      { name: "rating", description: "Product rating details" },
      { name: "salesPackage", description: "Items included in sales package" },
      { name: "modelNumber", description: "Product model number" },
      { name: "sku", description: "Stock Keeping Unit" },
      { name: "features", description: "Array of product features" },
    ],
    exampleResponse: `{
  "id": "SS002",
  "name": "Modern Leather Sofa",
  "description": "A sleek and luxurious leather sofa...",
  "price": 320000,
  "originalPrice": 350000,
  "discount": 8.57,
  "category": "Sofas",
  "tags": ["Leather", "Modern", "Luxury", "Home"],
  
    "mainImage": "https://template-6-api.vercel.app/images/bed-main.jpeg",

    "sideAngleImages": [
      { "key": "side1", "url": "https://template-6-api.vercel.app/images/bed%20(5).jpeg" },
      { "key": "side2", "url": "https://template-6-api.vercel.app/images/bed%20(4).jpeg" },
      { "key": "side3", "url": "https://template-6-api.vercel.app/images/bed%20(2).jpeg" },
      { "key": "side4", "url": "https://template-6-api.vercel.app/images/bed%20(1).jpeg" }
    ],
 
  "color": ["Black", "Brown"],
  "sizes": ["L", "XL"],
  "stock": 8,
  "dimensions": {
    "width": "280 cm",
    "height": "80 cm",
    "depth": "170 cm",
    "weight": "50 kg",
    "seatHeight": "42 cm",
    "legHeight": "6 cm"
  },
  "material": "Genuine Leather",
  "secondaryMaterial": "Stainless Steel",
  "configuration": "Straight",
  "upholsteryMaterial": "Genuine Leather",
  "upholsteryColor": "Black",
  "fillingMaterial": "High-Density Foam",
  "finishType": "Glossy",
  "originOfManufacture": "Italy",
  "warranty": {
    "summary": "2 Years Warranty",
    "serviceType": "Email at support@luxurysofas.com for claims",
    "covered": "Manufacturing defects",
    "notCovered": "Damage due to misuse",
    "domesticWarranty": "2 Years"
  },
  "rating": {
    "average": 4.6,
    "breakdown": {
      "fiveStars": 180,
      "fourStars": 120,
      "threeStars": 30,
      "twoStars": 5,
      "oneStar": 2
    }
  },
  "salesPackage": "1 Leather Sofa, 2 Cushions",
  "modelNumber": "LSBLK001",
  "sku": "SS002",
  "features": [
    "Adjustable Headrest: No",
    "Maximum Load Capacity: 300 KG",
    "Handmade: Yes"
  ]
}`,
  },
  {
    title: "Get All Images",
    method: "GET",
    path: "/api/images",
    description: "Retrieve a list of all available images.",
    responseFields: [
      { name: "images", description: "Array of image objects" },
      { name: "name", description: "Image filename" },
      { name: "url", description: "Full URL to image including base URL" },
    ],
    exampleResponse: `{
  "images": [
    {
      "name": "bed-main.jpeg",
      "url": "https://template-6-api.vercel.app/images/bed-main.jpeg"
    },
    {
      "name": "bed%20(5).jpeg",
      "url": "https://template-6-api.vercel.app/images/bed%20(5).jpeg"
    }
  ]
}`,
  },
  {
    title: "Access Individual Images",
    method: "GET",
    path: "/images/[filename]",
    description: "Retrieve a specific image by its filename.",
    responseFields: [
      { name: "name", description: "Image filename" },
      { name: "url", description: "Relative path to image" },
    ],
    exampleResponse: `{
  "name": "bed-main.jpeg",
  "url": "/images/bed-main.jpeg"
}`,
  },
];

interface EndpointProps {
  endpoint: {
    title: string;
    method: string;
    path: string;
    description: string;
    responseFields: { name: string; description: string }[];
    exampleResponse: string;
  };
  index: number;
  isOpen: boolean;
  toggleEndpoint: (index: number) => void;
}

const Endpoint: React.FC<EndpointProps> = ({
  endpoint,
  index,
  isOpen,
  toggleEndpoint,
}) => {
  return (
    <div className="mb-6">
      <button
        onClick={() => toggleEndpoint(index)}
        className="flex items-center justify-between w-full text-left text-xl font-semibold bg-indigo-300 p-4 rounded-lg hover:bg-indigo-200 transition-colors duration-200"
      >
        <span>{`${endpoint.method} ${endpoint.path} - ${endpoint.title}`}</span>
        {isOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
      </button>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-4 pl-4 border-l-2 border-indigo-200"
        >
          <p className="mb-2 text-gray-700">{endpoint.description}</p>
          <h4 className="font-semibold text-indigo-700 mb-2">Response Fields:</h4>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            {endpoint.responseFields.map((field, i) => (
              <li key={i}>
                <code className="bg-indigo-100 px-1 rounded">{field.name}</code> -{" "}
                {field.description}
              </li>
            ))}
          </ul>
          <h4 className="font-semibold text-indigo-700 mb-2">Example Response:</h4>
          <SyntaxHighlighter language="json" style={atomDark} className="rounded-md">
            {endpoint.exampleResponse}
          </SyntaxHighlighter>
        </motion.div>
      )}
    </div>
  );
};

const DocsPage = () => {
  const [openEndpoints, setOpenEndpoints] = useState<boolean[]>(
    new Array(endpoints.length).fill(false)
  );

  const toggleEndpoint = (index: number) => {
    setOpenEndpoints((prev) =>
      prev.map((isOpen, i) => (i === index ? !isOpen : isOpen))
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br pt-40 from-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.h1
          className="text-4xl font-bold text-center text-indigo-900 mb-20"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className={`${marcellus.className}`}>Furniture API Documentation</h1>
        </motion.h1>
        <motion.div
          className="bg-white rounded-xl text-indigo-900 shadow-lg p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {endpoints.map((endpoint, index) => (
            <Endpoint
              key={index}
              endpoint={endpoint}
              index={index}
              isOpen={openEndpoints[index]}
              toggleEndpoint={toggleEndpoint}
            />
          ))}
        </motion.div>
        <div className="mt-8 text-center">
          <a
            href="https://template-6-api.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
          >
            Visit API Base URL
            <ExternalLink size={20} className="ml-2" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default DocsPage;