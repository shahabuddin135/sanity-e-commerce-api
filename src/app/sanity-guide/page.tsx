"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism"
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react"
import { Marcellus } from "next/font/google"

const marcellus = Marcellus({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-marcellus",
})


const steps = [
    {
      title: "Login to Sanity and Create API Token",
      content: [
        "1. Go to Sanity.io and log in to your account.",
        "2. Navigate to your project where you want to upload data.",
        "3. Click on the API tab.",
        "4. Under Tokens, click Add API Token.",
        "5. Name your token and select Editor permissions.",
        "6. Copy the generated token."
      ]
    },
    {
      title: "Set Up Environment Variables",
      content: [
        "1. Open your project in VS Code.",
        "2. In the root of your project, create a file named .env.local if it doesn&apos;t already exist.",
        "3. Add the following variables to the .env.local file:"
      ],
      code: `NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_TOKEN=your_sanity_token`
    },
    {
      title: "Install Required Packages",
      content: [
        "Run the following commands in your terminal to install the necessary packages:"
      ],
      code: "npm install @sanity/client axios dotenv"
    },
    {
      title: "Create Sanity Schema",
      content: [
        "1. In your Sanity studio, create a new schema for your products.",
        "2. Navigate to the schemas directory.",
        "3. Create a new file named product.js.",
        "4. Define your product schema:"
      ],
      code: `export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'id',
      title: 'ID',
      type: 'string',
    },
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
    },
    {
      name: 'images',
      title: 'Images',
      type: 'object',
      fields: [
        {
          name: 'mainImage',
          title: 'Main Image',
          type: 'string',
        },
        {
          name: 'sideAngleImages',
          title: 'Side Angle Images',
          type: 'array',
          of: [{ type: 'string' }],
        },
      ],
    },
    // Add other fields as needed
  ],
}`
    },
    {
      title: "Create the Import Script",
      content: [
        "1. In the root of your project, create a folder named scripts.",
        "2. Inside the scripts folder, create a file named importSanityData.mjs.",
        "3. Paste the following code into importSanityData.mjs:"
      ],
      code: `import { createClient } from '@sanity/client'
import axios from 'axios'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import path from 'path'

// Load environment variables from .env.local
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config({ path: path.resolve(__dirname, '../.env.local') })

// Create Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
  apiVersion: '2021-08-31'
})

async function uploadImageToSanity(imageUrl) {
  try {
    console.log(\`Uploading image: \${imageUrl}\`)
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' })
    const buffer = Buffer.from(response.data)
    const asset = await client.assets.upload('image', buffer, {
      filename: imageUrl.split('/').pop()
    })
    console.log(\`Image uploaded successfully: \${asset._id}\`)
    return asset._id
  } catch (error) {
    console.error('Failed to upload image:', imageUrl, error)
    return null
  }
}

async function importData() {
  try {
    console.log('Fetching products from API...')

    // Replace this URL with your API endpoint
    const response = await axios.get('https://template-6-api.vercel.app/api/products')

    const products = response.data

    console.log(\`Fetched \${products.length} products\`)

    for (const product of products) {
      console.log(\`Processing product: \${product.name}\`)

      let imageRef = null

      if (product.image) {
        imageRef = await uploadImageToSanity(product.image)
      }

      const sanityProduct = {
        _type: 'product',
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        originalPrice: product.originalPrice,
        discount: product.discount,
        category: product.category,
        tags: product.tags,
        images: {
          mainImage: product.images.mainImage,
          sideAngleImages: product.images.sideAngleImages,
        },
        color: product.color,
        sizes: product.sizes,
        stock: product.stock,
        dimensions: product.dimensions,
        material: product.material,
        configuration: product.configuration,
        warranty: product.warranty,
        reviews: product.reviews,
        rating: product.rating,
        salesPackage: product.salesPackage,
        modelNumber: product.modelNumber,
        sku: product.sku,
        features: product.features,
        relatedProducts: product.relatedProducts,
      }

      console.log('Uploading product to Sanity:', sanityProduct.name)
      const result = await client.create(sanityProduct)
      console.log(\`Product uploaded successfully: \${result.id}\`)
    }

    console.log('Data import completed successfully!')
  } catch (error) {
    console.error('Error importing data:', error)
  }
}

importData()`
    },
    {
      title: "Add Script to package.json",
      content: [
        "1. Open your package.json file.",
        "2. Add the following script to the \"scripts\" section:"
      ],
      code: `"scripts": {
    "import-data": "node scripts/importSanityData.mjs"
  }`
    },
    {
      title: "Execute the Import",
      content: [
        "1. Make sure all previous steps are completed.",
        "2. Run the import script using the following command:",
        "3. Wait for the process to complete - you'll see progress logs in the terminal."
      ],
      code: "npm run import-data"
    },
    {
      title: "Best Practices and Safety Precautions",
      content: [
        "1. Environment Variables:",
        "   • Never commit .env files to version control",
        "   • Use different tokens for development and production",
        "   • Regularly rotate your API tokens",
        "",
        "2. Data Validation:",
        "   • Validate data before uploading to Sanity",
        "   • Handle missing or malformed data gracefully",
        "   • Add error logging for failed uploads",
        "",
        "3. Performance:",
        "   • Consider batching uploads for large datasets",
        "   • Implement rate limiting to avoid API throttling",
        "   • Add progress indicators for long-running imports",
        "",
        "4. Backup:",
        "   • Always backup your Sanity dataset before bulk imports",
        "   • Keep a copy of your source data",
        "   • Test the import process with a small dataset first",
        "",
        "5. Monitoring:",
        "   • Log all operations for debugging",
        "   • Implement proper error handling",
        "   • Set up alerts for failed imports"
      ]
    },
    {
      title: "Conclusion",
      content: [
        "By following these steps, you&apos;ve successfully imported your data into Sanity CMS.",
        "You can now manage and query your content using Sanity&apos;s powerful features.",
        "Make sure to follow the best practices for maintaining and updating your data."
      ]
    }
  ]

interface StepProps {
  step: {
    title: string;
    content: string[];
    code?: string;
  };
  index: number;
  isOpen: boolean;
  toggleStep: (index: number) => void;
}

const Step: React.FC<StepProps> = ({ step, index, isOpen, toggleStep }) => {
  return (
    <div className="mb-6">
      <button
        onClick={() => toggleStep(index)}
        className="flex items-center justify-between w-full text-left text-xl font-semibold bg-indigo-100 p-4 rounded-lg hover:bg-indigo-200 transition-colors duration-200"
      >
        <span>{`Step ${index + 1}: ${step.title}`}</span>
        {isOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
      </button>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-4 pl-4 border-l-2 border-indigo-200"
        >
          {step.content.map((item, i) => (
            <p key={i} className="mb-2 text-gray-700">{item}</p>
          ))}
          {step.code && (
            <SyntaxHighlighter language="javascript" style={atomDark} className="rounded-md mt-4">
              {step.code}
            </SyntaxHighlighter>
          )}
        </motion.div>
      )}
    </div>
  )
}

const SanityUploadGuide = () => {
  const [openSteps, setOpenSteps] = useState<boolean[]>(() => 
    new Array(steps.length).fill(false)
  )

  const toggleStep = (index: number) => {
    setOpenSteps(prev => 
      prev.map((isOpen, i) => i === index ? !isOpen : isOpen)
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br pt-40 from-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.h1 
          className="text-4xl font-bold text-center text-indigo-900 mb-20"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
         <h1 className={`${marcellus.className}`}> Upload Data to Sanity - Beginner&apos;s Guide</h1>
        </motion.h1>
        <motion.div 
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {steps.map((step, index) => (
            <Step 
              key={index} 
              step={step} 
              index={index} 
              isOpen={openSteps[index]}
              toggleStep={toggleStep}
            />
          ))}
        </motion.div>
        <motion.div 
          className="bg-white rounded-xl shadow-lg p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-2xl font-semibold mb-4 text-indigo-900">Conclusion</h2>
          <p className="text-gray-700">
            By following these steps, you&apos;ve successfully imported your data into Sanity CMS.
            You can now manage and query your content using Sanity&apos;s powerful features.
            Make sure to follow the best practices for maintaining and updating your data.
          </p>
        </motion.div>
        <div className="mt-8 text-center">
          <a 
            href="https://www.sanity.io/docs" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
          >
            Learn more about Sanity
            <ExternalLink size={20} className="ml-2" />
          </a>
        </div>
      </div>
    </div>
  )
}

export default SanityUploadGuide

