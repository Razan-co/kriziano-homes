const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDb = require("../config/db/connectDb");
const fs = require("fs").promises;
const path = require("path");
const ProductModel = require("../models/productModel");

dotenv.config();

async function seedProductsFromJson() {
  console.log("🚀 Seeding products from JSON to Cloud DB...\n");

  try {
    // Connect to Cloud DB
    await connectDb();
    console.log("✅ Connected to Cloud DB");

    // Read JSON file
    const dataDir = path.join(__dirname, "../data");
    const filePath = path.join(dataDir, "products.json");

    const rawData = await fs.readFile(filePath, 'utf8');
    const products = JSON.parse(rawData);

    console.log(`✅ Loaded ${products.length} products from JSON`);

    // Clear existing products
    await ProductModel.deleteMany({});
    console.log("🗑️ Cleared existing products");

    // Map quantity to stock and insert
    const productsToSeed = products.map(product => ({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.quantity,  // Map quantity → stock
      image_url: product.image_url,
      category: product.category
    }));

    // Insert all products
    const result = await ProductModel.insertMany(productsToSeed);
    console.log(`✅ Seeded ${result.length} products!`);

    console.log("\n🎉 SEEDING COMPLETE!");

  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log("🔌 Database disconnected");
  }
}

// Run
seedProductsFromJson();




// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// const connectDb = require("../config/db/connectDb");
// const fs = require("fs").promises;
// const path = require("path");
// const ProductModel = require("../models/productModel");

// dotenv.config();

// async function exportProductsToJson() {
//   console.log("🚀 Exporting products to JSON...\n");

//   try {
//     // Connect to DB
//     await connectDb();
//     console.log("✅ Connected to database");

//     // Fetch products with ONLY required fields (exclude _id, reviews, timestamps)
//     console.log("📥 Fetching products...");
//     const products = await ProductModel.find({})
//       .select('name description price quantity image_url category')
//       .lean();

//     console.log(`✅ Found ${products.length} products`);

//     // Filter and clean data
//     const cleanProducts = products
//       .map(product => ({
//         name: product.name || "Unnamed Product",
//         description: product.description || "No description",
//         price: Number(product.price) || 0,
//         quantity: Number(product.quantity) || 1,
//         image_url: product.image_url || product.imageUrl || "",
//         category: product.category || "Uncategorized"
//       }))
//       .filter(p => p.name && p.image_url);

//     console.log(`📊 Valid products: ${cleanProducts.length}/${products.length}`);

//     // Create data folder
//     const dataDir = path.join(__dirname, "../data");
//     await fs.mkdir(dataDir, { recursive: true });

//     // Write to JSON file
//     const filePath = path.join(dataDir, "products.json");
//     await fs.writeFile(filePath, JSON.stringify(cleanProducts, null, 2));

//     console.log(`✅ Exported to: ${filePath}`);
//     console.log("\n🎉 EXPORT COMPLETE!");

//   } catch (error) {
//     console.error("❌ Error:", error.message);
//     process.exit(1);
//   } finally {
//     // Close DB connection
//     await mongoose.connection.close();
//     console.log("🔌 Database disconnected");
//   }
// }

// // Run
// exportProductsToJson();
