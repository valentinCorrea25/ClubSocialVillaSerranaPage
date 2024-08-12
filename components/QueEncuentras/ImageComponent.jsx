import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const ImageComponent = ({ src, alt }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: inView ? 0 : 100, opacity: inView ? 1 : 0 }}
      transition={{ duration: 1.2 }}  
    >
      <img src={src} alt={alt} style={{ width: '100%', borderRadius: '8px' }} />
    </motion.div>
  );
};

export default ImageComponent;
