import React from "react";

const AOSWrapper = ({
  animation = "fade-up",
  delay = 0,
  duration = 700,
  offset = 120,
  children,
}) => {
  return (
    <div
      data-aos={animation}
      data-aos-delay={delay}
      data-aos-duration={duration}
      data-aos-offset={offset}
    >
      {children}
    </div>
  );
};

export default AOSWrapper;
