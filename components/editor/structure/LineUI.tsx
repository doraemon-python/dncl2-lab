import { ProgramLine } from "@/types/program";
import { LineContents } from "@/types/code";
import {
  VariableBlock,
  VariableSelectBlock,
  StringBlock,
  NumberBlock,
  FunctionSelectBlock,
  BooleanSelectBlock,
} from "@/components/editor/block";
import { ReservedText } from "@/components/editor/text";

type Props = {
  lineContents: LineContents;
  program: ProgramLine[];
  setProgram: (program: ProgramLine[]) => void;
}

const LineUI = ({ lineContents, program, setProgram }: Props) => {
  const updateObj = (arr: any, key: Array<string | number>, value: any) => {
    if (key.length === 1) {
      arr[key[0]] = value;
      return
    }
    updateObj(arr[key[0]], key.slice(1), value);
  }

  const createSetBySelector = (selector: Array<string | number>) => {
    return (value: any) => {
      const newProgram = [...program];
      updateObj(newProgram, selector, value);
      setProgram(newProgram);
    }
  }

  return (
    <>
      {lineContents.map((elem, index) => {
        switch (elem.type) {
          case "variable":
            return <VariableBlock key={index} value={elem.value} setValue={createSetBySelector(elem.selector)} />
          case "number":
            return <NumberBlock key={index} value={elem.value} setValue={createSetBySelector(elem.selector)} />
          case "string":
            return <StringBlock key={index} value={elem.value} setValue={createSetBySelector(elem.selector)} />
          case "variable-select":
            return <VariableSelectBlock choices={elem.choices} key={index} value={elem.value} setValue={createSetBySelector(elem.selector)} />
          case "function-select":
            return (
              <FunctionSelectBlock choices={elem.choices} key={index} value={elem.value} setValue={createSetBySelector(elem.selector)}>
                {elem.children && <LineUI lineContents={elem.children} program={program} setProgram={setProgram} />}
              </FunctionSelectBlock>
            )
          case "boolean-select":
            return <BooleanSelectBlock key={index} value={elem.value} setValue={createSetBySelector(elem.selector)} />
          case "plain":
            return <p key={index}>{elem.value}</p>
          case "reserved":
            return <ReservedText key={index} text={elem.value} />
        }
      })}
    </>
  );
}

export default LineUI;