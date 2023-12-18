"use client"
import Link from "next/link";
import IntroductionBox from "@/components/introduction/IntroductionBox";
import { motion, useAnimation } from "framer-motion";
import InViewMotion from "@/components/introduction/InViewMotion";

const Page = () => {
  const prosesscolor = " text-yellow-500 p-1 bg-function/10 w-1/5 my-2";
  const variablecolor = "text-blue-600 p-1 rounded-lg bg-variable/10";
  const numbercolor = "text-green-400 p-1 rounded-lg bg-number/10";
  const stringcolor = "text-string p-1 rounded-lg bg-string/10";

  // const control=useAnimation();
  // const ref=useRef(null);
  // const isInView=useInView(ref);

  // useEffect(()=>{

  // },[isInView])
  return (
    <div className="mt-8 max-w-xl mx-auto">
      <h1 className="my-8 text-center text-3xl font-bold bg-var">DNCL2の説明</h1>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [50, -10, 0] }}
        transition={{ duration: 0.6 }}>
        <p className="m-4 p-4 border border-black bg-2">以下で共通テスト用プログラム用表記(通称DNCL2)の文法の解説をしますが、本サイトはこの文法を知らなくても操作できるよう設計されています。</p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [80, -10, 0] }}
        transition={{ duration: 0.8 }}>
        <IntroductionBox title="0. DNCL2とは">
          <p>
            DNCL2とは、大学入学共通テスト『情報』で採用される予定の独自のプログラミング言語です。<br />
            センター試験、共通テストで出題されている『情報関連基礎』で使用されているのはDNCLであり、DNCL2とは異なる部分があります。<br />
            以下では私たちのアプリを使用していただくにあたり重要となるであろうDNCL2の文法を簡潔に説明します。
          </p>
        </IntroductionBox>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [110, -10, 0] }}
        transition={{ duration: 1.1 }}>
        <IntroductionBox title="1.変数と値">
          <p>
            変数名は英字で始まる、英数字と&quot;_&quot;の並びです。配列は、<span className={variablecolor}>Data</span>[2,4]のように表し、配列の要素は『<span className={variablecolor}>Tokuten</span>[2]』のように要素の番号を当てて表します。<br />
            文字列は、&quot;&quot;でくくって表現します。<br />
            （例）<span className={stringcolor}>&quot;こんにちは&quot;</span>
          </p>
        </IntroductionBox>
      </motion.div>
      <InViewMotion>
        <IntroductionBox title="2.表示文">
          <p>
            表示文では数値や文字列や変数の値を表示します。<br />
            （例）<span className={"font-bold" + prosesscolor}>表示する(<span className={stringcolor}>&quot;こんにちは&quot;</span>)</span><br />
            このように、<span className={"font-bold" + prosesscolor}>表示する(<span className={variablecolor}>変数</span>)</span>と、表示したい値、変数、文字列を書くことで表示できます。
          </p>
        </IntroductionBox>
      </InViewMotion>
      <InViewMotion>
        <IntroductionBox title="3.代入文">
          <p>代入文は変数に値を設定します。左辺に変数や配列、右辺に代入する値を書きます。<br /></p>
          <p className="flex justify-evenly">
            <div>（例）<span className={variablecolor}>Tokuten</span>[4]=<span className={numbercolor}>100</span></div>
            <div><span className={variablecolor}>kazu</span>=<span className={numbercolor}>2</span></div>
            <div><span className={variablecolor}>Data</span>=[10,20,30,20]</div>
          </p>
        </IntroductionBox>
      </InViewMotion>
      <InViewMotion>
        <IntroductionBox title="4.演算">
          <p>
            加減乗除の四則演算は，『＋』，『－』，『×』，『 / 』で指定します。整数同士の演算では商は『÷』余りは『%』です。また、（）の使用も可能です。<br />
            数値や文字列は『==』(等しい)、『!=』(等しくない)で比較できます。『and』(かつ)や『or』(または)や『not』(でない)を用いることや、『＜』(より小さい)や『＞＝』(以上)で論理式の真偽を記述することができます。<br />
            <div className="flex flex-col gap-4 m-4">
              <div><span className={stringcolor}>&quot;red&quot;</span>!=<span className={stringcolor}>&quot;blue&quot;</span></div>
              <div><span className={variablecolor}>kosu</span>＜<span className={numbercolor}>12</span>and<span className={variablecolor}>kosu</span>%<span className={numbercolor}>2</span>==<span className={numbercolor}>0</span></div>
              <div><span className={variablecolor}>nyuryoku</span>=【外部からの入力】</div>
            </div>
            <span className="border-b border-gray-600 pb-1">=(代入)と==(等しい)の混同に注意してください。</span>
          </p>
        </IntroductionBox>
      </InViewMotion>
      <InViewMotion>
        <div className="py-8 mx-4">
          <h2 className="ml-4 mb-2 font-bold text-2xl ">5.制御文</h2>
          <h3 className="ml-4 mb-2 text-xl font-bold">5.1.条件分岐文</h3>
          <div className="p-4 bg-2 rounded-xl">
            <p>条件分岐文は、条件が満たされているならば、処理を行います。条件を満たさない場合の処理を書くことも可能です。</p><br />
            <p>もし<span className=" text-reserved">[条件]</span>ならば:</p>
            <div className={" border-l border-black ml-2 pl-2" + prosesscolor}>[処理1]</div>
            <p>そうでなくもし<span className=" text-reserved">[条件2]</span>ならば:</p>
            <div className={" border-l border-black ml-2 pl-2" + prosesscolor}>[処理2]</div>
            <p>そうでなければ:</p>
            <div className="flex">
              <span className=" ml-2 w-2 border-l border-b border-black"></span>
              <div className={" ml-2 pl-2 " + prosesscolor}>[処理3]</div>
            </div>
          </div>
        </div>
      </InViewMotion>
      <InViewMotion>
        <div className="py-8 mx-4">
          <h3 className="ml-4 mb-2 text-xl font-bold ">5.2.条件繰り返し文</h3>
          <div className="p-4 bg-2 rounded-xl">
            <p>条件繰り返し文は、条件が満たされている間、処理を繰り返し行います。処理から抜け出せないプログラムを組まないように注意しなければいけません。</p><br />
            <p><span className=" text-reserved">[条件]</span>の間繰り返す:</p>
            <div className="flex">
              <span className=" ml-2 w-2 border-l border-b border-black"></span>
              <div className={" ml-2 pl-2 " + prosesscolor}>[処理]</div>
            </div>
          </div>
        </div>
      </InViewMotion>
      <InViewMotion>
        <div className="py-8 mx-4">
          <h3 className="ml-4 mb-2 text-xl font-bold ">5.3.順次繰り返し文</h3>
          <div className="p-4 bg-2 rounded-xl">
            <p>順次繰り返し文は、変数の値を増やしながら、処理を繰り返し行います。</p><br />
            <p><span className={variablecolor}>[変数]</span>を<span className={numbercolor}>[初期値]</span>から<span className={numbercolor}>[終了値]</span>まで<span className=" text-yellow-600">[差分]</span>ずつ増やしながら繰り返す:</p>
            <div className="flex">
              <span className=" ml-2 w-2 border-l border-b border-black"></span>
              <div className={" ml-2 pl-2 " + prosesscolor}>[処理]</div>
            </div>
            <p>(減らしながらの場合もあります。)</p>
          </div>
        </div>
      </InViewMotion>
      <InViewMotion>
        <div className="py-8 mx-4">
          <h2 className="ml-4 mb-2 font-bold text-2xl ">6.用意された関数の呼び出し</h2>
          <h3 className="ml-4 mb-2 text-xl font-bold">6.1.値を返す関数</h3>
          <div className="p-4 bg-2 rounded-xl">
            関数とは、値(文字列)を代入すると、新たな値(文字列)を生成したり、新たな処理を行なったりするものです。ここではまず値を返す関数の例を紹介します。<br />
            以下、指定された値の二乗を返す関数、『<span className={"font-bold" + prosesscolor}>二乗</span>』を用意したとします。<br /><br />
            <span className={variablecolor}>y</span>=<span className={"font-bold" + prosesscolor}>二乗</span>(<span className={variablecolor}>x</span>)......この場合、<span className={variablecolor}>y</span>に<span className={variablecolor}>x</span>の二乗が代入されます。
          </div>
        </div>
      </InViewMotion>
      <InViewMotion>
        <div className="py-8 mx-4">
          <h3 className="ml-4 mb-2 text-xl font-bold">6.2.値を返さない関数</h3>
          <div className="p-4 bg-2 rounded-xl">
            6.1と同様に今度は、指定された値の2進表現を表示する関数、『<span className={"font-bold" + prosesscolor}>二進で表示する</span>』を用意したとします。このとき、<br /><br />
            <span className={"font-bold" + prosesscolor}>二進で表示する</span>(<span className={numbercolor}>11</span>)......この場合、「1011」と表示されます。
            <div className="my-2"><span className={"font-bold" + prosesscolor}>表示する</span>(&quot;私は&quot;,<span className={variablecolor}>name</span>[2],&quot;年齢は&quot;,<span className={variablecolor}>age</span>[2])</div>
          </div>
        </div>
      </InViewMotion>
      <InViewMotion>
        <IntroductionBox title="7.新しい関数の定義(旧DNCLの場合)">
          6.1、6.2ではすでに定義された関数の利用について説明しましたが、次は関数を自作する場合についてです。構文の形は以下のようになります。<br /><br />
          <p>関数 <span className={"font-bold" + prosesscolor}>関数名</span>(<span className={variablecolor}>引数列</span>)を</p>
          <div className={" border-l border-black ml-2 pl-2" + prosesscolor}>[処理]</div>
          <p>と定義する</p><br />
          つまり、例えば6.1で紹介した『<span className={"font-bold" + prosesscolor}>二乗</span>』という関数を自作するならば、<br /><br />
          <p>関数 <span className={"font-bold" + prosesscolor}>二乗</span>(<span className={variablecolor}>x</span>)を</p>
          <div className={" border-l border-black ml-2 pl-2"}>
            <div className="my-2"><span className={variablecolor}>y</span>=<span className={variablecolor}>x</span>*<span className={variablecolor}>x</span></div>
            y<span className=" text-reserved">を返す</span>
          </div>
          <p>と定義する</p><br />
          と、このように関数を自作することができます。
        </IntroductionBox>
      </InViewMotion>
      <InViewMotion>
        <IntroductionBox title="8.コメントアウト">
          <p>
            プログラム上に実行されない部分を書きたい場合（メモなど）は、#の後にその文言を書くことでその部分が実行されずにコメントアウトされます。<br />
            しかし、コメントアウトばかりでは見にくいのでなるべくコメントアウトをしなくてすむわかりやくプログラムを書くことが望まれます。<br /><br />
            <span className={variablecolor}>atai</span>=<span className={prosesscolor}>乱数()</span>　　<span className=" bg-green-300/40 p-2 rounded-lg">#0以上1未満の数をataiに代入</span>
          </p>
        </IntroductionBox>
      </InViewMotion>
      <InViewMotion>
        <Link href={"/"} className="flex gap-2 justify-center items-center my-8 ">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          <p className="text-lg">戻る</p>
        </Link>
      </InViewMotion>
    </div>

  )
}

export default Page;
