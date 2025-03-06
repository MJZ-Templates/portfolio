import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { HTMLMotionProps } from 'framer-motion';

interface MotionLinkProps extends HTMLMotionProps<'a'> {
  href: string;
}

const MotionLink = React.forwardRef<HTMLAnchorElement, MotionLinkProps>(({ href, children, ...props }, ref) => (
  <Link href={href} passHref legacyBehavior>
    <motion.a ref={ref} {...props}>
      {children}
    </motion.a>
  </Link>
));

MotionLink.displayName = 'MotionLink';

export default MotionLink;
