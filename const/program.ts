import generateRandomId from "@/functions/generateRandomId";
import { DNCL2Program } from "@/types/program";
import { LINE_ID_LENGTH } from ".";

const getId = () => {
    return generateRandomId(LINE_ID_LENGTH);
}

const program: DNCL2Program = [
    { lineId: getId(), type: "assign-variable", target: { name: "判定する数", id: "var1" }, value: { type: "number", value: "4" } },
    { lineId: getId(), type: "assign-variable", target: { name: "割る数", id: "var2" }, value: { type: "number", value: "2" } },
    { lineId: getId(), type: "assign-variable", target: { name: "素数か", id: "var3" }, value: { type: "boolean", value: "true" } },
    {
        lineId: getId(), type: "while", condition: { operation: "smaller", values: [{ operation: "variable", id: "var2" }, { operation: "variable", id: "var1" }] }, lines: [
            { lineId: getId(), type: "assign-variable", target: { name: "変数", id: "var4" }, value: { operation: "divide", values: [{ operation: "variable", id: "var1" }, { operation: "variable", id: "var2" }] } },
            {
                type: "branch",
                if: {
                    ifId: getId(),
                    condition: {
                        operation: "equal",
                        values: [
                            { operation: "variable", id: "var4" },
                            { operation: "function", id: "int", arg: { operation: "variable", id: "var4" } }
                        ]
                    },
                    lines: [
                        { lineId: getId(), type: "reassign-variable", target: { id: "var3" }, value: { type: "boolean", value: "false" } },
                        { lineId: getId(), type: "break" },
                    ]
                },
                else: {
                    elseId: getId(),
                    lines: [{ lineId: getId(), type: "reassign-variable", target: { id: "var2" }, value: { operation: "add", values: [{ operation: "variable", id: "var2" }, { type: "number", value: "1" }] } }]
                }
            },
        ]
    },
    {
        type: "branch",
        if: {
            ifId: getId(),
            condition: { operation: "variable", id: "var3" },
            lines: [
                // 表示するの例
                { lineId: getId(), type: "function", id: "show", arg: { type: "string", value: "素数です。" } },
            ]
        },
        else: {
            elseId: getId(),
            lines: [
                { lineId: getId(), type: "function", id: "show", arg: { type: "string", value: "素数ではありません。" } },
                { lineId: getId(), type: "function", id: "show", arg: { operation: "add", values: [{ operation: "function", id: "str", arg: { operation: "variable", id: "var2" } }, { type: "string", value: "で割り切れます。" }] } },
            ]
        }
    },
]

export default program;