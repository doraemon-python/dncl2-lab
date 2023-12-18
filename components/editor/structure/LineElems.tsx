import { ProgramLine, NormalLine, AssignVariableLine } from "@/types/program";
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
  programLine: NormalLine;
  setProgramLine: (programLine: NormalLine) => void;
}

const LineElems = ({ lineContents, programLine, setProgramLine }: Props) => {
  const updateObj = (arr: any, key: Array<string | number>, value: any) => {
    if (key.length === 1) {
      arr[key[0]] = value;
      return
    }
    updateObj(arr[key[0]], key.slice(1), value);
  }

  const setValiableName = (value: string) => {
    setProgramLine({ ...programLine as AssignVariableLine, target: { name: value, id: (programLine as AssignVariableLine).target.id } })
  }

  const createSetBySelector = (selector: Array<string | number>) => {
    return (value: any) => {
      const newProgramLine = { ...programLine };
      updateObj(newProgramLine, selector, value);
      setProgramLine(newProgramLine);
    }
  }

  const createSetNumber = (selector: Array<string | number>) => {
    return (value: string) => {
      const number = Number(value);
      createSetBySelector(selector)(Number.isNaN(number) ? value : number);
    }
  }

  const createSetBoolean = (selector: Array<string | number>) => {
    return (value: string) => {
      createSetBySelector(selector)(Boolean(value));
    }
  }

  return (
    <>
      {lineContents.map((elem, index) => {
        switch (elem.type) {
          case "variable":
            return <VariableBlock key={index} value={elem.value} setValue={setValiableName} />
          case "number":
            return <NumberBlock key={index} value={elem.value} setValue={createSetNumber(elem.selector)} />
          case "string":
            return <StringBlock key={index} value={elem.value} setValue={createSetBySelector(elem.selector)} />
          case "variable-select":
            return <VariableSelectBlock choices={elem.choices} key={index} value={elem.value} setValue={createSetBySelector(elem.selector)} />
          case "function-select":
            return (
              <FunctionSelectBlock choices={elem.choices} key={index} value={elem.value} setValue={createSetBySelector(elem.selector)}>
                {elem.children && <LineElems lineContents={elem.children} programLine={programLine} setProgramLine={setProgramLine} />}
              </FunctionSelectBlock>
            )
          case "boolean-select":
            return <BooleanSelectBlock key={index} value={elem.value} setValue={createSetBoolean(elem.selector)} />
          case "plain":
            return <p key={index}>{elem.value}</p>
          case "reserved":
            return <ReservedText key={index} text={elem.value} />
        }
      })}
    </>
  );
}

export default LineElems;