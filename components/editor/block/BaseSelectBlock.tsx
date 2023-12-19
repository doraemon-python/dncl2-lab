type Props = {
  type?: "変数" | "関数";
  className: string;
  choices: { [id: string]: string };
  value: string;
  setValue: (value: string) => void;
}

const BaseSelectBlock = ({ type, className, choices, value, setValue }: Props) => {
  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
  }

  return (
    <label className={"relative flex pl-3 py-1 rounded-xl outline outline-[1px] " + className}>
      <p>{value in choices ? choices[value] : `削除された${type || "値"}`}</p>
      <svg className="w-6 h-6 mx-1"
        viewBox="0 0 24 24" fill="currentColor">
        <path d="M7 10l5 5 5-5z" />
      </svg>
      <select
        onChange={onChange}
        value={value}
        className="absolute top-0 left-0 w-full opacity-0"
      >
        {Object.keys(choices).map(id => <option key={id} value={id} disabled={!(id in choices)}>{id in choices ? choices[id] : `削除された${type || "値"}`}</option>)}
      </select>
    </label>
  );
}

export default BaseSelectBlock;