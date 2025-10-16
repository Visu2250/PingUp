// import mongoose from "mongoose";

// const connectDB= async () => {
//     try{
//         mongoose.connection.on('connected',()=>console.log('Database connected'))
//         await mongoose.connect(`${process.env.MONGODB_URL}/pingup`)

//     }catch(error){
//         console.log(error.message)
//     }

// }
// export default connectDB



import mongoose from "mongoose";

// MongoDB Atlas connection function
const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI, // .env file me MongoDB URI rakho
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    console.log("✅ Database connected to MongoDB Atlas");

    mongoose.connection.on("error", (err) => {
      console.error("❌ MongoDB connection error:", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.warn("⚠️ MongoDB disconnected!");
    });
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    process.exit(1); // server ko stop kar do agar DB connect na ho
  }
};

export default connectDB;

// --------------------
// Example: User Schema & Save Function
// --------------------
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

// Function to save user
export const saveUser = async (name, email) => {
  await connectDB(); // DB se connect
  const user = new User({ name, email });
  await user.save(); // MongoDB me save
  console.log(`✅ User ${name} saved to MongoDB Atlas`);
};
