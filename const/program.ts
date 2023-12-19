import { DNCL2Program } from "@/types/program";

const program: DNCL2Program = [
    { lineId: "line1", type: "assign-variable", target: { name: "判定する数", id: "var1" }, value: { type: "number", value: "4" } },
    { lineId: "line2", type: "assign-variable", target: { name: "割る数", id: "var2" }, value: { type: "number", value: "2" } },
    { lineId: "few", type: "assign-variable", target: { name: "素数か", id: "var3" }, value: { type: "boolean", value: "true" } },
    {
        lineId: "line3", type: "while", condition: { operation: "smaller", values: [{ operation: "variable", id: "var2" }, { operation: "variable", id: "var1" }] }, lines: [
            { lineId: "line3-1", type: "assign-variable", target: { name: "変数", id: "var4" }, value: { operation: "divide", values: [{ operation: "variable", id: "var1" }, { operation: "variable", id: "var2" }] } },
            {
                type: "branch",
                if: {
                    ifId: "line3-2-if",
                    condition: {
                        operation: "equal",
                        values: [
                            { operation: "variable", id: "var4" },
                            { operation: "function", id: "int", arg: { operation: "variable", id: "var4" } }
                        ]
                    },
                    lines: [
                        { lineId: "line3-2-1", type: "reassign-variable", target: { id: "var3" }, value: { type: "boolean", value: "false" } },
                        { lineId: "line3-2-2", type: "break" },
                    ]
                },
                else: {
                    elseId: "line3-2-else",
                    lines: [{ lineId: "line3-2-2", type: "reassign-variable", target: { id: "var2" }, value: { operation: "add", values: [{ operation: "variable", id: "var2" }, { type: "number", value: "1" }] } }]
                }
            },
        ]
    },
    {
        type: "branch",
        if: {
            ifId: "line6-1-if",
            condition: { operation: "variable", id: "var3" },
            lines: [
                // 表示するの例
                { lineId: "line6-1", type: "function", id: "show", arg: { type: "string", value: "素数です。" } },
            ]
        },
        else: {
            elseId: "line6-1-else",
            lines: [
                { lineId: "line6-2", type: "function", id: "show", arg: { type: "string", value: "素数ではありません。" } },
                { lineId: "line6-3", type: "function", id: "show", arg: { operation: "add", values: [{ operation: "function", id: "str", arg: { operation: "variable", id: "var2" } }, { type: "string", value: "で割り切れます。" }] } },
            ]
        }
    },
]

export default program;