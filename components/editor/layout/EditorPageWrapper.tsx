"use client";

import { motion } from "framer-motion";

type Props = {
  layoutId: string;
  children: React.ReactNode
}

const EditorPageWrapper = ({ layoutId, children }: Props) => {
  return (
    <motion.div
      layoutId={layoutId}
      className="bg-1"
    >
      {children}
    </motion.div>
  );
}

export default EditorPageWrapper;