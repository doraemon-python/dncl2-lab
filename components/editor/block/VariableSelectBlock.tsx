import BaseSelectBlock from "./BaseSelectBlock";

type Props = {
  choices: { [id: string]: string };
  value: string;
  setValue: (value: string) => void;
}

const VariableSelectBlock = ({ choices, value, setValue }: Props) => {
  return (
    <BaseSelectBlock
      className="text-variable bg-variable/10"
      type="変数"
      choices={choices}
      value={value}
      setValue={setValue}
    />
  );
}

export default VariableSelectBlock;