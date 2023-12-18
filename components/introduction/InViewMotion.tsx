"use client"
import { motion, useAnimation } from "framer-motion";
import { useInView } from "framer-motion";
import { useEffect, useRef } from "react";
type Props = {
  children: React.ReactNode;
}

const InViewMotion = ({ children }: Props) => {
  const control = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref);
  const scrollVariants = {
    visible: {
      y: [70, -30, 0],
      opacity: 1,
      transition: {
        //duration（アニメーションの長さ）とdelay（アニメーションを遅らせる）をイイカンジに設定する。
        //そうしないとスクロールアニメーションっぽくない。
        duration: 0.7,
        delay: 0.2,
        type: "spring",
      },
    },
    hidden: {
      y: 120,
      opacity: 0,
    },
  }

  useEffect( //useEffectを使って、要素が画面内に入ったらcontrolをvisibleにする
    () => {
      if (isInView) {
        control.start("visible");
      }
    },
    [isInView]
  );
  return (
    <motion.div
      ref={ref}
      variants={scrollVariants}
      initial="hidden"
      animate={control}>
      {children}
    </motion.div>
  )
}

export default InViewMotion;