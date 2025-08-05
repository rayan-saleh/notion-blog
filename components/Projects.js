import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const Projects = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-[1001]">
      
      <Link href="https://supercomplete.ai" target="_blank">
        <div 
          className="project-container relative inline-block cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Icon */}
          <motion.div 
            className="project-icon-wrapper"
            animate={isHovered ? { y: 8, scale: 0.85 } : { y: 0, scale: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 300,
              damping: 15,
              duration: 0.4
            }}
          >
            <Image
              src="/square_logo.png"
              alt="Supercomplete"
              width={45}
              height={45}
              className="project-icon"
            />
          </motion.div>

        </div>
      </Link>
    </div>
  );
};

export default Projects;