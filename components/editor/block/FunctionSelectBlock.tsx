import BaseSelectBlock from "./BaseSelectBlock";

type Props = {
  choices: { [id: string]: string },
  value: string,
  setValue: (value: string) => void,
  children?: React.ReactNode,
}

const FunctionSelectBlock = ({ choices, value, setValue, children }: Props) => {
  return (
    <div className="flex">
      <BaseSelectBlock
        className="bg-function/10 text-function"
        type="関数"
        choices={choices}
        value={value}
        setValue={setValue}
      />
      <p className="editor-text text-xl mx-1 text-function">{"("}</p>
      <div className="flex gap-2">
        {children}
      </div>
      <p className="editor-text text-xl ml-1 text-function">{")"}</p>
    </div>
  );
}

export default FunctionSelectBlock;