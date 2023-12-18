import { LineWrapper, LineGroup } from "@/components/editor/structure";
import { Program } from "@/types/program";
import { Code } from "@/types/code";

type Props = {
  code: Code;
  program: Program;
  setProgram: (program: Program) => void;
  isSelected: boolean;
  setIsSelected: (isSelected: boolean) => void;
}

export const Editor = ({ code, program, setProgram, isSelected, setIsSelected }: Props) => {
  return (
    <div className="flex flex-col gap-4 mb-4 drop-shadow">
      <LineWrapper>
        <LineGroup codeLines={code} programLines={program} setProgramLines={setProgram} />
      </LineWrapper>
      <button
        onClick={() => setIsSelected(!isSelected)}
        className={`
          block mx-auto p-1 w-fit rounded-full duration-300 ${isSelected ? "rotate-45 bg-danger text-white" : "bg-2"}
        `}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
}

export default Editor;