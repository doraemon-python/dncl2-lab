import LineWrapper from "./LineWrapper";

const Nested = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid grid-cols-[auto_1fr] [&>*]:last:overflow-hidden">
      <div className="w-1 mx-4 bg-gray-300" />
      <LineWrapper>
        {children}
      </LineWrapper>
    </div>
  );
}

export default Nested;