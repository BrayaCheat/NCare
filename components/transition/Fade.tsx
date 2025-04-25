'use client'

import {motion} from 'framer-motion'

export default function FadeTransition({children, className}: {children: React.ReactNode, className?: string}){
  return (
    <motion.div
      className={className}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.75 }}
    >
      {children}
    </motion.div>
  )
}