import React, { useEffect } from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { crop, scale } from "@cloudinary/url-gen/actions/resize";
import { focusOn } from "@cloudinary/url-gen/qualifiers/gravity";

const CloudinaryUploadWidget = ({ setCheckmark, images, setImages }) => {
  useEffect(() => {
    const myWidget = window.cloudinary?.createUploadWidget(
      {
        cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME,
        uploadPreset: "mfwa5awq",
        folder: process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER,
        sources: ["local", "url", "google_drive", "facebook", "instagram"],
        resourceType: "image",
        maxFileSize: 1000000,
        multiple: false,
        cropping: true,
        showSkipCropButton: false,
        croppingCoordinatesMode: "custom",
        croppingAspectRatio: 1.333,
        croppingShowDimensions: true,
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          console.log("Successfully uploaded!", result.info);
          setCheckmark((prevState) => [...prevState, "check"]);
          let imageData = {
            url: result.info.url,
            cloudinary_id: result.info.public_id,
          };
          setImages((prevState) => [...prevState, imageData]);
        }
      }
    );
    document.getElementById("upload_widget").addEventListener(
      "click",
      function () {
        myWidget.open();
      },
      false
    );
  }, []);

  return (
    <button
      type="button"
      id="upload_widget"
      disabled={images.length === 3}
      className="bg-darkblue text-white py-1 px-3 border rounded-lg disabled:opacity-50"
    >
      Upload Image
    </button>
  );
};

const transformImages = (imagesArray) => {
  const cld = new Cloudinary({
    cloud: {
      cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME,
    },
  });
  if (imagesArray.length > 1) {
    let processedImages = imagesArray.map((image) => {
      return (
        cld
          .image(image.cloudinary_id)
          // .resize(crop().gravity(focusOn("custom")));
          .resize(crop().aspectRatio(1.33).gravity(focusOn("custom")))
          .resize(scale().height(300))
      );
    });
    return processedImages;
  } else {
    let processedImage = cld
      .image(imagesArray[0].cloudinary_id)
      // .resize(crop().gravity(focusOn("custom")));
      .resize(crop().aspectRatio(1.33).gravity(focusOn("custom")))
      .resize(scale().height(300));

    return processedImage;
  }
};

export { CloudinaryUploadWidget, transformImages };
