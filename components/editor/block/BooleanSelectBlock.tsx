import BaseSelectBlock from "./BaseSelectBlock";

type Props = {
  value: string;
  setValue: (value: string) => void;
}

const BooleanSelectBlock = ({ value, setValue }: Props) => {
  return (
    <BaseSelectBlock
      className="text-boolean bg-boolean/10"
      choices={{ "false": "False", "true": "True" }}
      value={value}
      setValue={setValue}
    />
  );
}

export default BooleanSelectBlock;