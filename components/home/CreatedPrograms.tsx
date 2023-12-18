"use client"
import ProgramData from "./ProgramData";
import { motion } from "framer-motion";

const CreatedPrograms = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, y: [90, -10, 0] }}
      transition={{ duration: 1.3 }}>
      <p className="mb-2 ml-2">作成したプログラム</p>
      <div className="p-4 pb-2 bg-2 rounded-xl grid grid-cols-3 gap-4 duration-300">
        <ProgramData title="プログラム1" />
        <ProgramData title="プログラム2" />
        <ProgramData title="プログラム3" />
        <ProgramData title="プログラム4" />
        <ProgramData title="プログラム5" />
        <ProgramData title="プログラム6" />
      </div>
    </motion.div>
  );
}

export default CreatedPrograms;