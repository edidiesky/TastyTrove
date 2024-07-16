export const slideup = {
  initial: {
    opacity: 0,
    y: "100%",
  },
  animate: (i) => ({
    opacity: 1,
    y: "0",
    transition: { duration: 0.7, delay: i * 0.03 },
  }),
  exit: {
    opacity: 0,
    y: "100%",
    transition: { duration: 0.6 },
  },
};
export const smallslideup2 = {
  initial: {
    opacity: 0,
    y: "80px",
  },
  animate: (i) => ({
    opacity: 1,
    y: "0",
    transition: { duration: 0.6, delay: i * 0.2 },
  }),
  exit: {
    opacity: 0,
    y: "80px",
    transition: { duration: 0.5 },
  },
};



export const clipPathRight = {
  initial: {
    opacity: 0,
    // clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
    clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
  },
  animate: (i) => ({
    opacity: 1,
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    transition: { duration: 1.2 },
  }),
  exit: {
    opacity: 0,
    transition: {duration: 0.5},
    // clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
    clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
  },
};
export const clipPathLeft2 = {
  initial: {
    opacity: 0,
    clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
    // clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
  },
  animate: (i) => ({
    opacity: 1,
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    transition: { duration: .7, delay: i * 0.4 },
  }),
  exit: {
    opacity: 0,
    transition: { duration: 0.5 },
    clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
    // clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
  },
};

export const clipPathLeft = {
  initial: {
    opacity: 0,
    clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
    // clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
  },
  animate: (i) => ({
    opacity: 1,
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    transition: { duration: 1.2, delay: i * 0.4 },
  }),
  exit: {
    opacity: 0,
    transition: { duration: 0.5 },
    clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
  },
};

export const opacity = {
  initial: {
    opacity: 0,
  },
  animate: (i) => ({
    opacity: 1,
    transition: { duration: 1.2, delay: i * 0.1 },
  }),
  exit: {
    opacity: 0,
  },
};

export const scaleAnimations = {
  initial: { scale: 0, x: "-50%", y: "-50%" },
  enter: {
    scale: 1,
    x: "-50%",
    y: "-50%",
    transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] },
  },
  closed: {
    scale: 0,
    x: "-50%",
    y: "-50%",
    transition: { duration: 0.4, ease: [0.32, 0, 0.67, 0] },
  },
};

export const slide = {
  initial: {
    y: "100vh",
  },
  enter: {
    y: "100vh",
    transition: {
      duration: 1,
      ease: [0.76, 0, 0.24, 1],
    },
  },
  exit: {
    y: "-100vh",
    transition: {
      duration: 1,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

export const opacity1 = {
  initial: {
    opacity: 0,
  },
  enter: {
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
  exit: {
    opacity: 1,
  },
};
