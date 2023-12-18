type Props = {
  title: string;
  children: React.ReactNode;
}

const IntroductionBox = ({ title, children }: Props) => {
  return (
    <div className="py-8 mx-4">
      <h2 className="ml-4 mb-2 font-bold text-2xl">{title}</h2>
      <div className="p-4 bg-2 rounded-xl">
        {children}
      </div>
    </div>
  )
}

export default IntroductionBox;