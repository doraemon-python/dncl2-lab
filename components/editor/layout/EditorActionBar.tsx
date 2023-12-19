"use client";

import { useState } from "react";
import { DNCL2Program, ProgramResult } from "@/types/program";
import ProgramRunner from "@/functions/programRanner";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

type Props = {
  program: DNCL2Program
}

const EditorActionBar = ({ program }: Props) => {
  const [result, setResult] = useState<ProgramResult>([]);
  const [running, setRunning] = useState(false);

  const runCode = () => {
    setRunning(true);
    const runner = new ProgramRunner();
    const error: ProgramResult = [];
    try {
      runner.run(program);
    } catch (e: any) {
      error.push({
        index: runner.runningIndex,
        text: e.message,
        type: "error"
      });
    } finally {
      setResult([...runner.result, ...error]);
    }
  }

  const close = () => {
    setResult([]);
    setRunning(false);
  }

  return (
    <div className="flex gap-4">
      {running ? (
        <button onClick={close} className="bg-gray-500 text-white p-2 flex gap-2 rounded-xl">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 animate-spin">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
          </svg>
          <p>実行中</p>
        </button>
      ) : (
        <button onClick={runCode} className="p-2 flex gap-2 bg-main hover:bg-main-hover text-white rounded-xl">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm14.024-.983a1.125 1.125 0 010 1.966l-5.603 3.113A1.125 1.125 0 019 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113z" clipRule="evenodd" />
          </svg>
          <p>実行</p>
        </button>
      )}
      <Link href="/" className="p-2 flex gap-2 bg-2 hover:bg-2-hover rounded-xl shadow-xl">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path fillRule="evenodd" d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z" clipRule="evenodd" />
        </svg>
        <p>保存</p>
      </Link>
      <AnimatePresence>
        {result.length > 0 && (
          <motion.div
            initial={{ y: "-100%", scale: 0.3, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
            className="w-full p-4 fixed top-0 left-0"
          >
            <div className="p-4 flex flex-col gap-4 bg-2 rounded-3xl shadow-xl">
              <h1 className="pb-2 text-xl font-bold text-center border-b">実行結果</h1>
              {result.map((r, i) => (
                <div key={i} className={r.type === "error" ? "text-danger" : ""}>
                  <p className="mb-1">{`${r.index + 1}行目での${r.type === "error" ? "エラー" : "出力"}`}</p>
                  <p className={`${r.type === "error" ? "bg-danger/10" : "bg-3"} p-2 rounded-md`}>{r.text}</p>
                </div>
              ))}
              <button onClick={close} className="w-fit mx-auto px-2 py-1 bg-main text-white rounded-md">閉じる</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence >
    </div>
  );
}

export default EditorActionBar;