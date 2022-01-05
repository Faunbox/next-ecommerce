const cloudinary = require("cloudinary").v2;

export default async function Cloud(req, res) {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const api = process.env.CLOUDINARY_API_KEY;
  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp: timestamp,
    },
    process.env.CLOUDINARY_SECRET
  );
  res.status(200).json({ signature, timestamp, api });
}
