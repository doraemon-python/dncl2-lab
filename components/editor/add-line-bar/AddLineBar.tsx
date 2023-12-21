"use client"

import { motion } from "framer-motion";
import AddLineBtn from "./AddLineBtn";
import { DNCL2Program } from "@/types/program";
import generateRandomId from "@/functions/generateRandomId";
import { LINE_ID_LENGTH } from "@/const";

const getId = () => {
  return generateRandomId(LINE_ID_LENGTH);
}

type Props = {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
  program: DNCL2Program;
  setProgram: (program: DNCL2Program) => void;
}

const AddLineBar = ({ isVisible, setIsVisible, program, setProgram }: Props) => {
  const addAssignVariable = () => {
    setProgram([...program, { lineId: getId(), type: "assign-variable", target: { id: getId(), name: "変数" }, value: { type: "number", value: "1" } }])
  }

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
        <AddLineBtn onClick={addAssignVariable} className="bg-variable/80" text="変数の追加" />
        <AddLineBtn onClick={addAssignVariable} className="bg-number/80" text="演算" />
        <AddLineBtn onClick={addAssignVariable} className="bg-reserved/80" text="もし～なら" />
        <AddLineBtn onClick={addAssignVariable} className="bg-reserved/80" text="条件繰り返し" />
        <AddLineBtn onClick={addAssignVariable} className="bg-reserved/80" text="順次繰り返し" />
        <AddLineBtn onClick={addAssignVariable} className="bg-function/80" text="表示する" />
      </motion.div>
    </div>
  );
}

export default AddLineBar;