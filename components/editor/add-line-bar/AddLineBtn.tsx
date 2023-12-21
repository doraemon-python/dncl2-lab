type Props = {
  onClick: () => void;
  className: string;
  text: string;
}

const AddLineBtn = ({ onClick, className, text }: Props) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-xl backdrop-blur-3xl ${className} text-white`}
    >
      {text}
    </button>
  );
}

export default AddLineBtn;