# 設計書
## DNCL2の構築と実行の仕組み
本アプリでは、同じプログラムを以下の2種類で表現しています。
- UI実現用(型: DNCL2UI)

    UIを表示するために適切な構造
- プログラム実行用(型: DNCL2Program)

    プログラム的に実行しやすい構造

`DNCL2UI`は`DNCL2Program`から変換できます。したがって、実装的にはユーザーは`DNCL2Program`を変更することでUIの変更とプログラムの実行を行っています。また、プログラムを保存する際は、`DNCL2Program`の書き方を用います。

`DNCL2Program`から`DNCL2UI`への変更を`ProgramConverter`クラスが行っています。また、`DNCL2Program`の実行は`ProgramRunner`クラスが行います。また、プログラムの実行結果は、`ProgramRunner`クラスの`result`プロパティに代入されており、その型は`ProgramResult`です。
```ts
// クラスのインスタンス化
const runner = new ProgramRunner();
// 実行
runner.run(program);
// 結果
const result: ProgramResult = runner.result;
```