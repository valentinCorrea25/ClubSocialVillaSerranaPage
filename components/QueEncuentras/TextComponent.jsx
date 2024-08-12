import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const TextComponent = ({ children }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: inView ? 0 : -100, opacity: inView ? 1 : 0 }}
      transition={{ duration: 1.2 }}  
      style={{ padding: '20px' }}
    >
      {children}
    </motion.div>
  );
};

export default TextComponent;
