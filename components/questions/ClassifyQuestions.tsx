"use client"

import QuestionsData from "./ReturnQuestionsData";
import PreparedQuestion from "./PreparedQuestion";

type Props = {
  theme: string;
}

const ClassifyQuestions = ({ theme }: Props) => {
  return (
    <div className="mt-8">
      <p className="px-2 mb-1 font-bold">{theme}</p>
      <div className="bg-2 rounded-xl p-4 flex flex-col gap-2 hover:scale-[0.99] duration-300 ease-out">
        {QuestionsData.map((item) => (
          item.theme === theme && item.questions.map(item => <PreparedQuestion key={item.title} href={item.href} title={item.title}>{item.children}</PreparedQuestion>)
        ))}
      </div>
    </div>
  );
}

export default ClassifyQuestions;