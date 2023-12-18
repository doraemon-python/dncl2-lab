import { CodeLine, NestInfo } from "@/types/code";
import { ProgramLine, NormalLine, NestedLine, BranchLine, WhileLine } from "@/types/program";
import { Line, Nested } from "@/components/editor/structure";
import LineWrapper from "./LineWrapper";

type Props = {
  codeLines: CodeLine[];
  programLines: ProgramLine[];
  setProgramLines: (programLines: ProgramLine[]) => void;
};

export const LineGroup = ({ codeLines, programLines, setProgramLines }: Props) => {
  const getNestedLine = (lineId: string, info: NestInfo) => {
    const thisLine = programLines.find(programLine => programLine.lineId === lineId) as NestedLine;

    switch (info.why) {
      case "if":
        return (thisLine as BranchLine)["if"].lines;
      case "else":
        return (thisLine as BranchLine)["else"]?.lines;
      case "elif":
        return (thisLine as BranchLine)["elif"]?.find(l => l.elifId === info.elifId)?.lines;
      case "while":
        return (thisLine as WhileLine).lines;
    }
  }

  const createSetProgramLine = (lineId: string) => {
    return (_programLine: ProgramLine) => {
      setProgramLines(programLines.map(programLine => programLine.lineId === lineId ? _programLine : programLine))
    }
  }

  const createSetProgramLines = (lineId: string, info: NestInfo) => {
    return (_programLines: ProgramLine[]) => {
      setProgramLines(programLines.map(programLine => {
        if (programLine.lineId === lineId) {
          const newProgramLine = { ...programLine };

          switch (info.why) {
            case "if":
              (newProgramLine as Required<BranchLine>).if.lines = _programLines;
              break;
            case "else":
              (newProgramLine as Required<BranchLine>).else.lines = _programLines;
              break;
            case "elif":
              (newProgramLine as Required<BranchLine>).elif.forEach(elifLine => {
                if (elifLine.elifId === info.elifId) {
                  elifLine.lines = _programLines
                }
              })
              break;
            case "while":
              (newProgramLine as Required<WhileLine>).lines = _programLines;
              break;
          }

          return newProgramLine;
        } else {
          return programLine
        }
      }))
    }
  }

  const createDeleteLine = (lineId: string) => {
    return () => {
      setProgramLines(programLines.filter(programLine => programLine.lineId !== lineId))
    }
  }

  return (
    <>
      {codeLines.map((codeLine, index) => {
        const thisLine = programLines.find(programline => programline.lineId === codeLine.lineId);
        return (
          <LineWrapper key={index}>
            <Line
              codeLine={codeLine}
              programLine={thisLine as NormalLine}
              setProgramLine={createSetProgramLine(codeLine.lineId)}
              deleteLine={createDeleteLine(codeLine.lineId)}
            />
            {codeLine.nest && (
              <Nested>
                <LineGroup
                  codeLines={codeLine.nest.lines}
                  programLines={getNestedLine(codeLine.lineId, codeLine.nest.info) as ProgramLine[]}
                  setProgramLines={createSetProgramLines(codeLine.lineId, codeLine.nest.info)}
                />
              </Nested>
            )}
          </LineWrapper>
        )
      })}
    </>
  );
}

export default LineGroup;