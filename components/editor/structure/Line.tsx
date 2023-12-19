import { CodeLine } from "@/types/code";
import { ProgramLine } from "@/types/program";
import LineUI from "./LineUI";

type Props = {
  codeLine: CodeLine;
  program: ProgramLine[];
  setProgram: (program: ProgramLine[]) => void;
}

const Line = ({ codeLine, program, setProgram }: Props) => {
  const onClick = () => {
    confirm("この行を削除しますか？");
  }

  return (
    <div className="relative p-2 bg-2 rounded-2xl flex gap-2 items-center overflow-x-auto whitespace-nowrap"    >
      <LineUI
        lineContents={codeLine.contents}
        program={program}
        setProgram={setProgram}
      />
      <button onClick={onClick} className="sticky ml-auto right-0 text-danger rounded-full backdrop-blur-xl shadow">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 p-1">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}

export default Line;