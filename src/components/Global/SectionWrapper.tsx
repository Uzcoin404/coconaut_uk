import styled from 'styled-components';
import { useInView } from 'react-intersection-observer';
import * as React from 'react';
import { motion } from 'framer-motion';

interface sectionWrapperStyleProps {
  cover?: boolean;
}

export const SectionWrapperStyle = styled(motion.div).attrs(
  (props: sectionWrapperStyleProps) => ({
    cover: props.cover,
  })
)`
  margin: auto;
  padding: 5rem 0;

  ${(props) => !props.cover && 'max-width: 1400px;'}
`;

const sectionWrapperVariants = {
  shown: {
    opacity: 1,
    transition: {
      duration: 1,
    },
  },
  hidden: {
    opacity: 0,
  },
};

interface sectionWrapperProps {
  children: React.ReactNode;
  cover?: boolean;
  id?: string;
}

export const SectionWrapper = (props: sectionWrapperProps) => {
  const { ref, inView } = useInView();
  return (
    <SectionWrapperStyle
      ref={ref}
      variants={sectionWrapperVariants}
      animate={inView ? 'shown' : 'hidden'}
      {...props}
    >
      {props.children}
    </SectionWrapperStyle>
  );
};
