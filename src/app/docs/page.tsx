'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Marcellus } from 'next/font/google';

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

interface EndpointProps {
  title: string;
  method: string;
  path: string;
  responseFields: { name: string; description: string }[];
  exampleResponse: string;
}

interface CodeExampleProps {
  title: string;
  code: string;
}

interface ErrorCodeProps {
  code: string;
  description: string;
}

const marcellus = Marcellus({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
});

const DocsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-4 px-4 sm:py-6 sm:px-6 lg:py-8 lg:px-8">
      <motion.div 
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className={`text-center mt-36 mb-12 ${marcellus.className}`}>
          <h1 className={`text-4xl sm:text-5xl font-bold text-indigo-900 mb-4`}>Furniture API Documentation</h1>
          <p className="text-xl text-indigo-600">Complete guide to using the Furniture Catalog API</p>
        </div>

        <Section title="Overview">
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-600 mb-4">
              This API provides comprehensive access to a furniture catalog database, featuring detailed product information,
              high-quality images, and complete specifications for various furniture items.
            </p>
            <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4">
              <p className="text-indigo-700">Base URL: <code className="bg-indigo-100 px-2 py-1 rounded">https://template-6-api.vercel.app</code></p>
            </div>
          </div>
        </Section>

        <Section title="Authentication">
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-600 mb-4">
              No authentication is required. All endpoints are publicly accessible.
            </p>
          </div>
        </Section>

        <Section title="Endpoints">
          <div className="space-y-8">
            <Endpoint
              title="1. Get All Products"
              method="GET"
              path="/api/products"
              responseFields={[
                { name: 'id', description: 'Unique product identifier' },
                { name: 'name', description: 'Product name' },
                { name: 'description', description: 'Detailed product description' },
                { name: 'price', description: 'Current price (in paise/cents)' },
                { name: 'originalPrice', description: 'Original price before discount' },
                { name: 'discount', description: 'Discount percentage' },
                { name: 'category', description: 'Product category' },
                { name: 'images', description: 'Object containing image URLs' },
                { name: 'dimensions', description: 'Product dimensions' },
                { name: 'reviews', description: 'Array of customer reviews' },
              ]}
              exampleResponse={`{
  "id": "SS001",
  "name": "Modern Leather Sofa",
  "description": "A sleek and luxurious leather sofa...",
  "price": 320000,
  "originalPrice": 350000,
  "discount": 8.57,
  "category": "Sofas",
  "images": {
    "mainImage": "/images/sofa-main.jpeg",
    "sideAngleImages": [
      "/images/sofa-angle1.jpeg",
      "/images/sofa-angle2.jpeg"
    ]
  },
  "dimensions": {
    "width": "280 cm",
    "height": "80 cm",
    "depth": "170 cm"
  },
  "reviews": [
    {
      "rating": 4.8,
      "comment": "Excellent quality!",
      "user": "John Doe"
    }
  ]
}`}
            />

            <Endpoint
              title="2. Get Single Product"
              method="GET"
              path="/api/products/[id]"
              responseFields={[
                { name: 'id', description: 'Product identifier' },
                { name: 'name', description: 'Product name' },
                { name: 'description', description: 'Detailed product description' },
                { name: 'price', description: 'Current price (in paise/cents)' },
                { name: 'originalPrice', description: 'Original price before discount' },
                { name: 'discount', description: 'Discount percentage' },
                { name: 'category', description: 'Product category' },
                { name: 'images', description: 'Object containing image URLs' },
                { name: 'dimensions', description: 'Product dimensions' },
                { name: 'reviews', description: 'Array of customer reviews' },
              ]}
              exampleResponse={`{
  "id": "SS001",
  "name": "Modern Leather Sofa",
  "description": "A sleek and luxurious leather sofa...",
  "price": 320000,
  "originalPrice": 350000,
  "discount": 8.57,
  "category": "Sofas",
  "images": {
    "mainImage": "/images/sofa-main.jpeg",
    "sideAngleImages": [
      "/images/sofa-angle1.jpeg",
      "/images/sofa-angle2.jpeg"
    ]
  },
  "dimensions": {
    "width": "280 cm",
    "height": "80 cm",
    "depth": "170 cm"
  },
  "reviews": [
    {
      "rating": 4.8,
      "comment": "Excellent quality!",
      "user": "John Doe"
    }
  ]
}`}
            />

            <Endpoint
              title="3. Get All Images"
              method="GET"
              path="/api/images"
              responseFields={[
                { name: 'name', description: 'Image filename' },
                { name: 'url', description: 'Relative path to image' },
              ]}
              exampleResponse={`[
  {
    "name": "sofa-main.jpeg",
    "url": "/images/sofa-main.jpeg"
  },
  {
    "name": "sofa-angle1.jpeg",
    "url": "/images/sofa-angle1.jpeg"
  }
]`}
            />

            <Endpoint
              title="4. Access Individual Images"
              method="GET"
              path="/images/[filename]"
              responseFields={[
                { name: 'name', description: 'Image filename' },
                { name: 'url', description: 'Relative path to image' },
              ]}
              exampleResponse={`[
  {
    "name": "sofa-main.jpeg",
    "url": "/images/sofa-main.jpeg"
  },
  {
    "name": "sofa-angle1.jpeg",
    "url": "/images/sofa-angle1.jpeg"
  }
]`}
            />
          </div>
        </Section>

        <Section title="Usage Examples">
          <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
            <CodeExample
              title="JavaScript/Fetch"
              code={`
// Get all products
fetch('https://template-6-api.vercel.app/api/products')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));

// Get all images
fetch('https://template-6-api.vercel.app/api/images')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
      `.trim()}
            />

            <CodeExample
              title="Axios"
              code={`
import axios from 'axios';

// Get all products
const getProducts = async () => {
  try {
    const response = await axios.get('https://template-6-api.vercel.app/api/products');
    console.log(response.data);
  } catch (error) {
    console.error('Error:', error);
  }
};
      `.trim()}
            />
          </div>
        </Section>

        <Section title="Error Handling">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="space-y-4">
              <ErrorCode code="404" description="Resource not found" />
              <ErrorCode code="500" description="Internal server error" />
            </div>
          </div>
        </Section>

        <Section title="Important Notes">
          <div className="bg-white rounded-lg shadow-md p-6">
            <ul className="list-disc list-inside text-gray-600 space-y-3">
              <li>All prices are in paise/cents (divide by 100 for actual price in rupees/dollars)</li>
              <li>Images can be accessed by appending the image URL to the base URL</li>
              <li>The API implements CORS and allows requests from any origin</li>
              <li>All responses are in JSON format</li>
              <li>Rate limiting may be implemented in the future</li>
            </ul>
          </div>
        </Section>

        <div className="mt-12 text-center">
          <Link href="/" className="text-indigo-500 hover:text-indigo-600 underline text-sm sm:text-base transition-colors duration-200">
            Return to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

const Section: React.FC<SectionProps> = ({ title, children }) => (
  <motion.section 
    className="mb-8 sm:mb-12 lg:mb-16"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <h2 className="text-2xl sm:text-3xl font-semibold text-indigo-800 mb-4 sm:mb-6">{title}</h2>
    {children}
  </motion.section>
);

const Endpoint: React.FC<EndpointProps> = ({ title, method, path, responseFields, exampleResponse }) => (
  <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
    <h3 className="text-xl sm:text-2xl font-medium text-indigo-800 mb-3 sm:mb-4">{title}</h3>
    <div className="bg-indigo-50 p-2 sm:p-3 rounded mb-3 sm:mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
      <code className="text-indigo-700 text-sm sm:text-base mb-2 sm:mb-0">{method} {path}</code>
      <span className="text-green-600 text-xs sm:text-sm font-semibold">200 OK</span>
    </div>
    
    <h4 className="font-semibold text-indigo-700 mb-2">Response Fields:</h4>
    <div className="mb-4">
      <ul className="list-disc list-inside text-gray-600 space-y-1 sm:space-y-2">
        {responseFields.map((field, index) => (
          <li key={index} className="text-sm sm:text-base"><code className="text-xs sm:text-sm bg-indigo-100 px-1">{field.name}</code> - {field.description}</li>
        ))}
      </ul>
    </div>

    <h4 className="font-semibold text-indigo-700 mb-2">Example Response:</h4>
    <div className="bg-gray-100 p-3 sm:p-4 rounded-lg overflow-x-auto">
      <pre className="text-xs sm:text-sm text-gray-800 whitespace-pre-wrap break-words">
        {exampleResponse}
      </pre>
    </div>
  </div>
);

const CodeExample: React.FC<CodeExampleProps> = ({ title, code }) => (
  <div>
    <h3 className="text-lg sm:text-xl font-medium text-indigo-800 mb-2 sm:mb-3">{title}</h3>
    <div className="bg-gray-100 p-3 sm:p-4 rounded-lg overflow-x-auto">
      <pre className="text-xs sm:text-sm text-gray-800">
        <code className="break-words whitespace-pre-wrap">{code}</code>
      </pre>
    </div>
  </div>
);

const ErrorCode: React.FC<ErrorCodeProps> = ({ code, description }) => (
  <div className="flex items-start space-x-3 sm:space-x-4">
    <span className="bg-red-100 text-red-800 px-2 sm:px-3 py-1 rounded text-sm sm:text-base">{code}</span>
    <p className="text-gray-600 text-sm sm:text-base">{description}</p>
  </div>
);

export default DocsPage;

