const QuestionsData = [
  {
    theme: "プログラムの構文",
    questions: [
      {
        title: "条件分岐の理解",
        href: "",
        children: <div className="flex">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-6 scale-x-75">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 19.5l-15-15m0 0v11.25m0-11.25h11.25" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-6 scale-x-75">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
          </svg>
        </div>
      },
      {
        title: "ループと反復",
        href: "",
        children: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 scale-75">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
        </svg>
      },
      {
        title: "関数の基礎",
        href: "",
        children: <div className=" italic px-2 ">f(x)</div>
      }
    ]
  },
  {
    theme: "複雑なプログラム",
    questions: [
      {
        title: "平方根を求める",
        href: "",
        children: <div className=" italic px-2">√</div>,
      },
      {
        title: "素数の判定",
        href: "",
        children: <div className=" italic px-2">p</div>,
      },
      {
        title: "フィボナッチ数列",
        href: "",
        children: <div className=" italic px-2">F<sub>n</sub></div>,
      },
    ]
  }
]

export default QuestionsData;