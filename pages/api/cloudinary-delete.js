export default async function handler(req, res) {
  const username = process.env.CLOUDINARY_API_KEY;
  const password = process.env.CLOUDINARY_API_SECRET;
  const cloudname = process.env.CLOUDINARY_CLOUDNAME;
  const headers = new Headers();

  headers.append("Content-Type", "application/json");
  headers.append(
    "Authorization",
    "Basic " + Buffer.from(username + ":" + password).toString("base64")
  );

  const bod = JSON.parse(req.body);
  const myNewBod = {
    public_ids: bod,
  };
  const requestOptions = {
    method: "DELETE",
    headers: headers,
    body: JSON.stringify(myNewBod),
  };
  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudname}/resources/image/upload/`,
      requestOptions
    );
    if (response.status == 200) {
      return res.status(200).send();
    }
  } catch (err) {
    console.log(err);
  }
}
