import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Cloudinary } from "@cloudinary/url-gen";
import { crop } from "@cloudinary/url-gen/actions/resize";
import { focusOn } from "@cloudinary/url-gen/qualifiers/gravity";
import Image from "next/image";

const cld = new Cloudinary({
  cloud: {
    cloudName: "dnwnw3z4z",
  },
});

export default function CarouselComp({ images }) {
  let processedImages = images.map((image) => {
    return cld
      .image(image.cloudinary_id)
      .resize(crop().gravity(focusOn("custom")));
  });

  return (
    <Carousel showThumbs={false}>
      {processedImages.map((image, index) => {
        let newUrl = image.toURL();
        return (
          <div key={index} className="relative h-72">
            <Image
              src={newUrl}
              alt={"eventimage" + index}
              fill
              style={{ objectFit: "fit" }}
            />
          </div>
        );
      })}
    </Carousel>
  );
}
