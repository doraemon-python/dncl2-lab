import { CodeLine } from "@/types/code";
import { NormalLine } from "@/types/program";
import LineElems from "./LineElems";

type Props = {
  codeLine: CodeLine;
  programLine: NormalLine;
  setProgramLine: (programLine: NormalLine) => void;
  deleteLine: () => void;
}

const Line = ({ codeLine, programLine, setProgramLine, deleteLine }: Props) => {
  const onClick = () => {
    confirm("この行を削除しますか？") && deleteLine();
  }

  return (
    <div className="relative p-2 bg-2 rounded-2xl flex gap-2 items-center overflow-x-auto whitespace-nowrap"    >
      <LineElems
        lineContents={codeLine.contents}
        programLine={programLine}
        setProgramLine={setProgramLine}
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