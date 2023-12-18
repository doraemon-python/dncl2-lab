import BaseBlock from './BaseBlock';

type Props = {
  value: string;
  setValue: (value: string) => void;
}

const VariableBlock = ({ value, setValue }: Props) => {
  return (
    <BaseBlock
      className="text-variable bg-variable/10"
      value={value}
      setValue={setValue}
    />
  );
}

export default VariableBlock;