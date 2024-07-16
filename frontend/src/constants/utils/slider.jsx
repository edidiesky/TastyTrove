import React from "react";

import OwlCarousel from "react-owl-carousel";
const Slider = ({children}) => {
  return (
    <OwlCarousel className="owl-theme" loop margin={10} nav>
      {children}
    </OwlCarousel>
  );
};

// #endregion

export default Slider;
