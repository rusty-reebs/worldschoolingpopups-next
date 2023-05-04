export default async function handler(req, res) {
  const username = process.env.CLOUDINARY_API_KEY;
  const password = process.env.CLOUDINARY_API_SECRET;
  const cloudname = process.env.CLOUDINARY_CLOUDNAME;
  const headers = new Headers();
  headers.set(
    "Authorization",
    "Basic " + Buffer.from(username + ":" + password).toString("base64")
  );
  const body = JSON.parse(req.body);
  //* req.body should contain array of Cloudinary public ID strings eg. ["image1", "image2"]
  try {
    const data = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudname}/resources/image/upload/`,
      {
        method: "DELETE",
        headers: headers,
        body: JSON.stringify(body),
      }
    );
    const result = await data.json();
    //* if result true return res.status(200) instead
    return res.json(result);
  } catch (err) {
    console.log(err);
  }
}
