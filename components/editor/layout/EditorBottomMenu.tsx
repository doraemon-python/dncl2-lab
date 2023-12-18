const EditorBottomMenu = () => {
  return (
    <div className="fixed w-full left-0 bottom-0 p-4">
      <div className="rounded-2xl bg-2 shadow-xl flex gap-4 p-2">
        <button className="px-4 text-variable rounded-xl bg-variable/10">変数</button>
        <button className="px-4 text-number rounded-xl bg-number/10">数値</button>
        <button className="px-4 text-string rounded-xl bg-string/10">文字列</button>
      </div>
    </div>
  );
}

export default EditorBottomMenu;