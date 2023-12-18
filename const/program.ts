import { Program } from "@/types/program";

const program: Program = [
    { lineId: "line1", type: "assign-variable", target: { name: "判定する数", id: "var1" }, value: 4 },
    { lineId: "line2", type: "assign-variable", target: { name: "割る数", id: "var2" }, value: 2 },
    { lineId: "few", type: "assign-variable", target: { name: "素数か", id: "var3" }, value: true },
    {
        lineId: "line3", type: "while", condition: { operation: "smaller", values: [{ operation: "variable", id: "var2" }, { operation: "variable", id: "var1" }] }, lines: [
            { lineId: "line3-1", type: "assign-variable", target: { name: "変数", id: "var4" }, value: { operation: "divide", values: [{ operation: "variable", id: "var1" }, { operation: "variable", id: "var2" }] } },
            {
                lineId: "line3-2",
                type: "branch",
                if: {
                    condition: {
                        operation: "equal",
                        values: [
                            { operation: "variable", id: "var4" },
                            { operation: "function", functionId: "int", argValue: { operation: "variable", id: "var4" } }
                        ]
                    },
                    lines: [
                        { lineId: "line3-2-1", type: "reassign-variable", target: { id: "var3" }, value: false },
                        { lineId: "line3-2-2", type: "break" },
                    ]
                },
                else: {
                    lines: [{ lineId: "line3-2-2", type: "reassign-variable", target: { id: "var2" }, value: { operation: "add", values: [{ operation: "variable", id: "var2" }, 1] } }]
                }
            },
        ]
    },
    {
        lineId: "line6",
        type: "branch",
        if: {
            condition: { operation: "variable", id: "var3" },
            lines: [
                // 表示するの例
                { lineId: "line6-1", type: "function", target: { name: "表示する", id: "show" }, value: "素数です" },
            ]
        },
        else: {
            lines: [
                { lineId: "line6-2", type: "function", target: { name: "表示する", id: "show" }, value: "素数ではありません。" },
                { lineId: "line6-3", type: "function", target: { name: "表示する", id: "show" }, value: { operation: "add", values: [{ operation: "function", functionId: "str", argValue: { operation: "variable", id: "var2" } }, "で割り切れます。"] } },
            ]
        }
    },
]

export default program;