import ProgramPreview from "./ProgramPreview";

type Props = {
  title: string;
}

const ProgramData = ({ title }: Props) => {
  return (
    <div>
      <ProgramPreview title={title} />
      <p className="text-sm text-center">{title}</p>
    </div>
  )
}

export default ProgramData;