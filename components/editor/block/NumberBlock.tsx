import BaseBlock from "./BaseBlock";

type Props = {
  value: string;
  setValue: (value: string) => void;
}

const NumberBlock = ({ value, setValue }: Props) => {
  return (
    <BaseBlock
      className="text-number bg-number/10"
      inputMode="decimal"
      value={value}
      setValue={setValue}
    />
  );
}

export default NumberBlock;