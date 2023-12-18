import { Program, Value } from "@/types/program"
import { Code, CodeLine, LineContents, BlockElem, TextElem } from "@/types/code"

class ProgramConverter {
    variables: { [id: string]: { name: string } };
    functions: { [id: string]: { name: string, action: (...arg: any[]) => any } };

    constructor() {
        this.variables = {};
        this.functions = {
            show: { name: "表示する", action: (arg: any) => { console.log(arg) } },
            int: { name: "切り捨て", action: (arg: number) => Math.floor(arg) },
            str: { name: "文字", action: (arg: any) => String(arg) },
        }
    }

    convert(program: Program): Code {
        const code: Code = []

        program.map(programLine => {
            switch (programLine.type) {
                case "assign-variable":
                    this.variables[programLine.target.id] = { name: programLine.target.name }
                    code.push({
                        lineId: programLine.lineId,
                        contents: [
                            { type: "variable", value: programLine.target.name },
                            { type: "plain", value: "=" },
                            ...this.valueToCodeElems(programLine.value, ["value"]),
                        ]
                    })
                    break;
                case "reassign-variable":
                    code.push({
                        lineId: programLine.lineId,
                        contents: [
                            {
                                selector: ["target", "id"],
                                type: "variable-select",
                                choices: { ...this.variables },
                                value: programLine.target.id,
                            },
                            { type: "plain", value: "=" },
                            ...this.valueToCodeElems(programLine.value, ["value"]),
                        ]
                    })
                    break;
                case "function":
                    code.push({
                        lineId: programLine.lineId,
                        contents: [
                            {
                                selector: ["target", "id"],
                                type: "function-select",
                                choices: this.functions,
                                value: programLine.target.id,
                                children: this.valueToCodeElems(programLine.value, ["value"]),
                            },
                        ]
                    })
                    break;
                case "break":
                    code.push({
                        lineId: programLine.lineId,
                        contents: [
                            { type: "reserved", value: "処理から抜け出す" },
                        ]
                    })
                    break;
                case "branch":
                    code.push({
                        lineId: programLine.lineId,
                        contents: [
                            { type: "reserved", value: "もし" },
                            ...this.valueToCodeElems(programLine.if.condition, ["if", "condition"]),
                            { type: "reserved", value: "なら" },
                        ],
                        nest: {
                            info: { why: "if" },
                            lines: this.convert(programLine.if.lines),
                        }
                    })
                    if (programLine.elif) {
                        programLine.elif.forEach((elifLine, index) => {
                            code.push({
                                lineId: programLine.lineId,
                                contents: [
                                    { type: "reserved", value: "そうでなくもし" },
                                    ...this.valueToCodeElems(elifLine.condition, ["elif", index, "condition"]),
                                    { type: "reserved", value: "なら" },
                                ],
                                nest: {
                                    info: { why: "elif", elifId: elifLine.elifId },
                                    lines: this.convert(elifLine.lines),
                                }
                            })
                        })
                    }
                    if (programLine.else) {
                        code.push({
                            lineId: programLine.lineId,
                            contents: [
                                { type: "reserved", value: "そうでなければ" },
                            ],
                            nest: {
                                info: { why: "else" },
                                lines: this.convert(programLine.else.lines),
                            }
                        })
                    }
                    break;
                case "while":
                    code.push({
                        lineId: programLine.lineId,
                        contents: [
                            ...this.valueToCodeElems(programLine.condition, ["condition"]),
                            { type: "reserved", value: "の間繰り返す" },
                        ],
                        nest: {
                            info: { why: "while" },
                            lines: this.convert(programLine.lines),
                        }
                    })
            }
        });

        return code;
    }

    valueToCodeElems = (value: Value, selector: Array<string | number>): LineContents => {
        const codeValue: LineContents = []

        if (typeof value !== "object") {
            switch (typeof value) {
                case "string":
                    codeValue.push({ selector, type: "string", value: value })
                    break;
                case "number":
                    codeValue.push({ selector, type: "number", value: value.toString() })
                    break;
                case "boolean":
                    codeValue.push({ selector, type: "boolean-select", value })
                    break;
            }
        } else {
            switch (value.operation) {
                case "function":
                    codeValue.push(
                        {
                            selector: [...selector, "functionId"],
                            type: "function-select",
                            choices: this.functions,
                            children: this.valueToCodeElems(value.argValue, [...selector, "argValue"]),
                            value: value.functionId,
                        }
                    )
                    break;
                case "equal":
                    codeValue.push(...this.codeElemsWithOperator(value.values, [...selector, "values"], "=="))
                    break;
                case "add":
                    codeValue.push(...this.codeElemsWithOperator(value.values, [...selector, "values"], "+"))
                    break;
                case "subtract":
                    codeValue.push(...this.codeElemsWithOperator(value.values, [...selector, "values"], "-"))
                    break;
                case "multiply":
                    codeValue.push(...this.codeElemsWithOperator(value.values, [...selector, "values"], "*"))
                    break;
                case "divide":
                    codeValue.push(...this.codeElemsWithOperator(value.values, [...selector, "values"], "/"))
                    break;
                case "and":
                    codeValue.push(...this.codeElemsWithOperator(value.values, [...selector, "values"], "and"))
                    break;
                case "or":
                    codeValue.push(...this.codeElemsWithOperator(value.values, [...selector, "values"], "or"))
                    break;
                case "bigger":
                    codeValue.push(...this.codeElemsWithOperator(value.values, [...selector, "values"], ">"))
                    break;
                case "smaller":
                    codeValue.push(...this.codeElemsWithOperator(value.values, [...selector, "values"], "<"))
                    break;
                case "not-equal":
                    codeValue.push(...this.codeElemsWithOperator(value.values, [...selector, "values"], "!="))
                    break;
                case "bigger-equal":
                    codeValue.push(...this.codeElemsWithOperator(value.values, [...selector, "values"], ">="))
                    break;
                case "smaller-equal":
                    codeValue.push(...this.codeElemsWithOperator(value.values, [...selector, "values"], "<="))
                    break;
                case "variable":
                    codeValue.push(
                        {
                            selector: [...selector, "id"],
                            type: "variable-select",
                            choices: { ...this.variables },
                            value: value.id,
                        }
                    )
                    break;

            }
        }

        return codeValue;
    }

    codeElemsWithOperator = (values: [Value, Value], selector: Array<string | number>, operation: string): Array<BlockElem | TextElem> => {
        const [value1, value2] = values;

        return [
            ...this.valueToCodeElems(value1, [...selector, 0]),
            { type: "plain", value: operation },
            ...this.valueToCodeElems(value2, [...selector, 1]),
        ]
    }
}

export default ProgramConverter;

