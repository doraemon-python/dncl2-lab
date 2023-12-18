import Link from "next/link";

const EditorHeader = () => {
  return (
    <header className="py-2 bg-2 border-b flex gap-2">
      <Link href="/">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </Link>
      <input type="text" defaultValue="プログラム1" className="font-bold text-center flex-grow" />
      {/* 上のinputタグを左右対称にするための見えない要素 */}
      <div className="w-6 h-6 invisible" />
    </header>
  );
}

export default EditorHeader;