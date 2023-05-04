export default async function handler(req, res) {
  const username = process.env.CLOUDINARY_API_KEY;
  const password = process.env.CLOUDINARY_API_SECRET;
  const cloudname = process.env.CLOUDINARY_CLOUDNAME;
  const headers = new Headers();
  headers.set(
    "Authorization",
    "Basic " + Buffer.from(username + ":" + password).toString("base64")
  );
  try {
    const data = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudname}/resources/image`,
      {
        method: "GET",
        headers: headers,
      }
    );
    const result = await data.json();
    return res.json(result);
  } catch (err) {
    console.log(err);
  }
}
