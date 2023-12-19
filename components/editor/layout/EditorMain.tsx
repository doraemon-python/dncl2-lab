"use client"


import { DNCL2Program } from "@/types/program";
import ProgramConverter from "@/functions/programConverter";
import p from "@/const/program";
import { useState } from "react";
import Editor from "./Editor";
import EditorActionBar from "./EditorActionBar";
import EditorAddCode from "./EditorAddCode";


export const EditorMain = () => {
  const [isSelected, setIsSelected] = useState(false);
  const [program, setProgram] = useState<DNCL2Program>(p);
  const code = new ProgramConverter().convert(program);

  return (
    <main className="p-4 pb-20">
      <Editor
        code={code}
        program={program}
        setProgram={setProgram}
        isSelected={isSelected}
        setIsSelected={setIsSelected}
      />
      <div className="mb-4 h-[2px] bg-gray-300 rounded" />
      <EditorActionBar program={program} />
      <EditorAddCode isSelected={isSelected} setIsSelected={setIsSelected} />
    </main>
  );
}

export default EditorMain;