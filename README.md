# 設計書
## DNCL2の構築と実行の仕組み
本アプリでは、プログラム実行用の連想配列とUI実現用の配列に分けており、それぞれに適した型を使用しています。
例えば、`x = 2 + 3`というコードに対して、プログラムを実行するには、「xは変数で、それに数字2と数字3の和を代入する」ということを理解しないといけませんが、UIを実現するためには、「xは変数,2と3は数字,=と+はテキストであること」と「これらの順番」の情報が必要です。以下では、それぞれの型と構造を説明します。
> プログラム実行用をProgram、UI実現用をCodeと名付けていますが、これらはわかりにくいので改名するかもしれません。

### Program: `@/type/program.ts`
プログラム全体の型を`Program`に定義しておりこれは各行を表す`ProgramLine`複数個からなっています。これらは順番に実行されていきます。

`ProgramLine`には二種類あり、ネストが不必要な`NormalLine`(変数宣言、変数代入、関数実行、ループ処理の離脱)と、不必要な`NestedLine`(条件分岐、ループ処理)からなります。`NestedLine`はネストしている行たちの情報(`ProgramLine[]`)を含んでいるため、どこからどこまでがifやwhileの内部なのがが判別できるようになっています。

`ProgramLine`はプログラムの行の型であるため、他の行と区別できる、つまりその行を特定できる必要があります。このため、`lineId`を属性に持っています。また、自身が前述の6種類のどれであるかを表す`type`という属性を持っています。その他の属性は行の種類により異なります。

#### NormalLine
- AssignVariableLine

    新しい変数を割り当てる行の型です。`target`属性は変数の情報の型`{name: string, id: string}`です。ユーザーが自由にリネームできるようにidとnameを分けて管理しており、idは最初にランダムな文字列が代入され以降変更することができません。`value`属性は型`Value`(後述)です。
    ```ts
    type AssignVariableLine = {
        lineId: string,
        type: "assign-variable",
        target: { name: string, id: string },
        value: Value
    }
    ```
- ReassignVariableLine

    既存の変数に新しい代入する行の型です。`AssignVariableLine`とは異なり、`target`はどの変数か特定できれはいいため`{id: string}`のみが設定されています。
    ```ts
    export type ReassignVariableLine = {
        lineId: string,
        type: "reassign-variable",
        target: { id: string },
        value: Value,
    }
    ```

- FunctionLine

    関数を実行するための関数です。`ReassignVariableLine`と似ていますが`target`にname属性があります。これは必要ないと思います。
    ```ts
    type FunctionLine = {
        lineId: string,
        type: "function",
        target: { name: string, id: string },
        value: Value,
    }
    ```

- BreakLine

    行がループ処理の中にある場合、その行でループを終了するための行の型です。必要な情報量が少ないです。
    ```ts
    type BreakLine = {
        lineId: string,
        type: "break",
    }
    ```

#### NestedLine
- BranchLine

    if, else if, elseの一連の情報を含んだ行の型です。`lineId`, `type`に加え、`if`,`elif`,`else`属性を持ちます。
    - if

        ifは条件を指定する`condition`属性(`string`)とその時の実行内容を指定する`lines`属性(`ProgramLine[]`)を持ちます。
    - elif

        elifは複数指定されることがあるため、配列として与えられます。この配列の各要素は`condition`,`lines`属性に加え、
        自身を特定するための`elifId`属性(`string`)を持ちます。また、一つも与えられなくてもいいため(ifの内容だけでもいい)、`?`をつけています。

    - else
        elseは条件を指定する必要がないため、`condition`属性を持たず、`lines`属性のみを持ちます。elifと同様に`?`をつけています。

    ```ts
    type BranchLine = {
        lineId: string,
        type: "branch",
        if: {
            condition: Value,
            lines: ProgramLine[]
        },
        elif?: Array<{
            elifId: string,
            condition: Value,
            lines: ProgramLine[]
        }>,
        else?: {
            lines: ProgramLine[]
        }
    }
    ```
- WhileLine

    ifと同じように条件を指定するための`condition`属性と実行内容を指定するための`lines`属性を持ちます。
    ```ts
    type WhileLine = {
        lineId: string,
        type: "while",
        condition: Value,
        lines: ProgramLine[],
    }
    ```

Valueとは

### Code: `@/types/code.ts`

Codeは先ほどのProgramから変換されてできるもので、UI実現に適した構造を持ちます。