export const chatCardVariants = {
  initial: {
    opacity: 0,
    width: "6rem",
    height: "6rem",
  },
  enter: {
    opacity: 1,
    transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
    width: "400px",
    height: "550px",
  },
  closed: {
    opacity: 0,
    transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] },
    width: "6rem",
    height: "6rem",
  },
};