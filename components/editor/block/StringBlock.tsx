import BaseBlock from "./BaseBlock";

type Props = {
  value: string;
  setValue: (value: string) => void;
}

const StringBlock = ({ value, setValue }: Props) => {
  return (
    <BaseBlock
      className="text-string bg-string/10"
      wrapText={true}
      value={value}
      setValue={setValue}
    />
  );
}

export default StringBlock;