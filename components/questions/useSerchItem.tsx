"use client"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import QuestionsData from "./ReturnQuestionsData";

type Props = {
  title: string;
  href: string;
}
const useSerchItem = () => {
  const [serchInput, setSerchInput] = useState("");
  //予測されるtitle
  const [expectedItems, setExpectedItems] = useState<Props[]>([]);
  const InputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSerchInput(e.target.value);
  }

  useEffect(() => {
    setExpectedItems([]);
    let _expect = [{ title: "", href: "" }];
    QuestionsData.forEach(e => {
      e.questions.forEach((subE) => {
        if (subE.title.includes(serchInput) && serchInput != "") {
          _expect.push({ title: subE.title, href: subE.href });
        }
      });
    });
    _expect.shift();
    setExpectedItems(_expect);
    console.log(_expect);
  }, [serchInput]);
  return {
    serchInput,
    InputChange,
    expectedItems,
  }
}

export default useSerchItem;