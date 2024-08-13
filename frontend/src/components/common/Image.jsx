import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Image = ({ alt, src }) => (
  <LazyLoadImage
    alt={alt}
    effect="blur"
    wrapperProps={{
      style: { transitionDelay: "1s", height: "100%", width: "100%", display:"block" },
    }}
    src={src}
  />
);

export default Image;
