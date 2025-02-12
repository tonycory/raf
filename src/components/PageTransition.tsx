import { motion } from 'framer-motion';
import styled from 'styled-components';

export const PageTransition = styled(motion.div).attrs(() => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3 }
}))`
  width: 100%;
`; 