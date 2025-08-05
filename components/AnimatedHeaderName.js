import { forwardRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const AnimatedHeaderName = forwardRef(function AnimatedHeaderName(
  { siteTitle, siteDescription, postTitle, onClick },
  ref
) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFirstRender, setIsFirstRender] = useState(true);

  return (
    <div
      ref={ref}
      className="header-name font-medium text-gray-600 dark:text-gray-300 capture-pointer-events grid-rows-1 grid-cols-1 items-center relative"
      onClick={onClick}
      onMouseEnter={() => {
        setIsHovered(true);
        setIsFirstRender(false);
      }}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence>
        {!isHovered ? (
          <motion.span
            key="title"
            className="row-start-1 col-start-1 block"
            initial={{ opacity: isFirstRender ? 1 : 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <span className="site-title">{siteTitle}</span>
          </motion.span>
        ) : (
          <motion.div
            key="image"
            className="row-start-1 col-start-1 rayan-image-container flex items-center justify-center"
            initial={{ opacity: 0, y: 15, scale: 0.85, rotate: -10 }}
            animate={{ 
              opacity: 1, 
              y: -8,
              x: -10,
              scale: 1,
              rotate: 0,
              transition: {
                type: "spring",
                stiffness: 500,
                damping: 25,
                opacity: { duration: 0.3 }
              }
            }}
            exit={{ 
              opacity: 0, 
              y: 15, 
              scale: 0.85,
              rotate: -10,
              transition: { duration: 0.35 }
            }}
          >
            <div className="relative">
              <Image
                src="/rayan.png"
                alt="Rayan Saleh"
                width={120}
                height={120}
                quality={100}
                className="rayan-image"
                priority
              />
              <div className="rayan-image-gradient" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

export default AnimatedHeaderName;