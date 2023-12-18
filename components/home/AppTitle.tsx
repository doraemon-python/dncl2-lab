"use client"
import { easeOut, motion } from "framer-motion";
const AppTitle = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, y: [70, -10, 0] }}
      transition={{ duration: 0.7 }}>
      <div className="flex items-center">
        <h1 className="text-3xl font-bold my-8 mr-8">DNCL2 Lab</h1>
        <motion.div className="w-8 h-8  border border-black select-none"
          whileHover={{ scale: 1.5, rotate: 270, borderRadius: 100 + "%" }}
          transition={{ duration: 0.6, ease: easeOut }}
          initial={{ scale: 1.5, rotate: 270, borderRadius: 100 + "%" }}
          animate={{ scale: 1, rotate: 0, borderRadius: 0 + "%", opacity: 1 }}>
          <motion.div className="w-full h-full border border-black"
            initial={{ scale: 1.5, rotate: 180, borderRadius: 0 + "%", opacity: 0.7 }}
            animate={{ scale: 1, rotate: 0, borderRadius: 100 + "%", opacity: 1 }}
            whileHover={{ scale: 1.5, rotate: 180, borderRadius: 0, opacity: 0.7 }}
            transition={{ duration: 0.8, ease: easeOut }}>
            <motion.div className="w-full h-full border border-black"
              initial={{ scale: 1.5, rotate: 270, borderRadius: 100 + "%", opacity: 0.4 }}
              animate={{ scale: 1, rotate: 0, borderRadius: 0 + "%", opacity: 1 }}
              whileHover={{ scale: 1.5, rotate: 270, borderRadius: 100 + "%", opacity: 0.4 }}
              transition={{ duration: 1.0, ease: easeOut }}>
              <motion.div className="w-full h-full border border-black"
                initial={{ scale: 1.5, rotate: 180, borderRadius: 0 + "%", opacity: 0.1 }}
                animate={{ scale: 1, rotate: 0, borderRadius: 100 + "%", opacity: 1 }}
                whileHover={{ scale: 1.5, rotate: 180, borderRadius: 0 + "%", opacity: 0.1 }}
                transition={{ duration: 1.2, ease: easeOut }}>

              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
      <p>共通テスト「情報」受験生のためのプログラミング学習ツール</p>

    </motion.div>
  );
}

export default AppTitle;