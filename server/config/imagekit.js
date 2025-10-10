import ImageKit from "imagekit";
import { config } from "dotenv";


config(); // Load .env file

console.log("Public Key:", process.env.IMAGEKIT_PUBLIC_KEY);

const imagekit=new ImageKit({
    publicKey:process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey:process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint:process.env.IMAGEKIT_URL_ENDPOINT
});

export default imagekit;