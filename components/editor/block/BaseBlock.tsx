type Props = {
  className: string;
  value: string;
  setValue: (value: string) => void;
  inputMode?: "decimal" | "text";
  wrapText?: boolean;
}

const BaseBlock = ({ className, value, setValue, inputMode, wrapText }: Props) => {
  const start = wrapText ? `"` : "";
  const end = wrapText ? `"` : "";

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }

  return (
    <label className={"relative rounded-xl " + className}>
      {/* value部にスペースをいれることで最低限のinputに幅を確保かつSafariでの見切れを対処 */}
      <div className="px-3 py-1 h-8 flex invisible">
        <p>{start}</p>
        <p className="px-[1px]">{value}</p>
        <p>{end}</p>
      </div>
      <div className="px-3 py-1 h-8 flex absolute top-0 left-0 w-full">
        <p>{start}</p>
        <input
          inputMode={inputMode || "text"}
          className="w-full bg-transparent"
          value={value}
          onChange={onChange}
        />
        <p>{end}</p>
      </div>
    </label>
  );
}

export default BaseBlock;