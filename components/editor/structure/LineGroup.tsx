import { CodeLine } from "@/types/code";
import { ProgramLine } from "@/types/program";
import { Line, Nested } from "@/components/editor/structure";
import LineWrapper from "./LineWrapper";

type Props = {
  codeLines: CodeLine[];
  program: ProgramLine[];
  setProgram: (program: ProgramLine[]) => void;
};

export const LineGroup = ({ codeLines, program, setProgram }: Props) => {
  return (
    <>
      {codeLines.map(codeLine => {
        return (
          <LineWrapper key={codeLine.lineId}>
            <Line
              codeLine={codeLine}
              program={program}
              setProgram={setProgram}
            />
            {codeLine.nest && (
              <Nested>
                <LineGroup
                  codeLines={codeLine.nest.lines}
                  program={program}
                  setProgram={setProgram}
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