"use client"

import Link from "next/link";
import ClassifyQuestions from "@/components/questions/ClassifyQuestions";
import useSerchItem from "@/components/questions/useSerchItem";
import { easeInOut, motion } from "framer-motion"

const Page = () => {
  const {
    serchInput,
    InputChange,
    expectedItems,
  } = useSerchItem();
  return (
    <div className="px-4 max-w-xl mx-auto">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [80, -15, 0] }}
        transition={{ duration: 0.6, ease: "easeOut" }}>

        <h1 className="my-12 text-3xl font-bold text-center">問題一覧</h1>
        <label className="p-2 flex items-center rounded-full bg-2 shadow-md">
          <input required value={serchInput} onChange={InputChange} type="text" className="flex-grow bg-transparent outline-none px-2" placeholder="問題を検索" />
          <button>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 p-2 bg-main hover:bg-main-hover text-white rounded-full">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </button>
        </label>
        {expectedItems.length ? <p className=" text-center mt-4">検索結果</p> : <span></span>}
        <div className=" mt-1 flex flex-col bg-2 rounded-2xl">
          {expectedItems.map((items, index) =>
            <Link key={index} className="border-b border-gray-300 last:border-none" href={items.href}>
              <motion.div className="py-2  block justify-center text-center"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 0.6, delay: 1.5 + index * 0.3, ease: easeInOut }}>
                {items.title}
              </motion.div>
            </Link>
          )}
        </div>
        <ClassifyQuestions theme="プログラムの構文"></ClassifyQuestions>
        <ClassifyQuestions theme="複雑なプログラム"></ClassifyQuestions>
        <Link href={"/"} className="flex gap-2 justify-center items-center my-8 ">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          <p className="text-lg">戻る</p>
        </Link>
      </motion.div>
    </div >
  )
}

export default Page;