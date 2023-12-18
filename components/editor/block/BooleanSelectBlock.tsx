import BaseSelectBlock from "./BaseSelectBlock";

type Props = {
  value: boolean;
  setValue: (value: string) => void;
}

const BooleanSelectBlock = ({ value, setValue }: Props) => {
  return (
    <BaseSelectBlock
      className="text-boolean bg-boolean/10"
      choices={{ "false": { name: "false" }, "true": { name: "true" } }}
      value={value ? "true" : "false"}
      setValue={setValue}
    />
  );
}

export default BooleanSelectBlock;