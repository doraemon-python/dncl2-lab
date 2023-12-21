"use client"

import { motion } from "framer-motion";

type Props = {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
}

const AddLineBtns = ({ isVisible, setIsVisible }: Props) => {
  return (
    <div className={`w-full fixed bottom-0 left-0 p-4 ${!isVisible && "pointer-events-none"}`}>
      <div
        className="mb-4 flex justify-end"
      >
        <motion.button
          initial={{ x: "200%" }}
          animate={{ x: isVisible ? 0 : "200%" }}
          className="bg-string/80 py-2 px-4 rounded-xl text-white"
          onClick={() => (setIsVisible(false))}
        >
          追加をやめる
        </motion.button>
      </div>
      <motion.div
        className="flex gap-4 overflow-x-auto whitespace-nowrap drop-shadow-xl"
        initial={{ y: "100%" }}
        animate={{ y: isVisible ? 0 : "200%" }}
      >
        <button className="px-4 py-2 rounded-xl backdrop-blur-3xl bg-variable/80 text-white">変数の追加</button>
        <button className="px-4 py-2 rounded-xl backdrop-blur-3xl bg-number/80 text-white">演算</button>
        <button className="px-4 py-2 rounded-xl backdrop-blur-3xl bg-reserved/80 text-white">もし~なら</button>
        <button className="px-4 py-2 rounded-xl backdrop-blur-3xl bg-reserved/80 text-white">条件繰り返し</button>
        <button className="px-4 py-2 rounded-xl backdrop-blur-3xl bg-reserved/80 text-white">順次繰り返し</button>
        <button className="px-4 py-2 rounded-xl backdrop-blur-3xl bg-yellow-400/80 text-white">表示する</button>
      </motion.div>
    </div>
  );
}

export default AddLineBtns;