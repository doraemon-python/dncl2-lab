import { DNCL2Program, Value } from "@/types/program"
import { Code, LineContents, BlockElem, TextElem } from "@/types/code"

class ProgramConverter {
    variables: { [id: string]: string };
    functions: { [id: string]: string };

    constructor() {
        this.variables = {};
        this.functions = {
            show: "表示する",
            int: "切り捨て",
            str: "文字",
        }
    }

    convert(program: DNCL2Program, selector: Array<string | number> = []): Code {
        const code: Code = []

        program.map((programLine, index) => {
            switch (programLine.type) {
                case "assign-variable":
                    this.variables[programLine.target.id] = programLine.target.name
                    code.push({
                        lineId: programLine.lineId,
                        contents: [
                            { type: "variable", value: programLine.target.name, selector: [...selector, index, "target", "name"] },
                            { type: "plain", value: "=" },
                            ...this.valueToUI(programLine.value, [...selector, index, "value"]),
                        ]
                    })
                    break;
                case "reassign-variable":
                    code.push({
                        lineId: programLine.lineId,
                        contents: [
                            {
                                selector: [...selector, index, "target", "id"],
                                type: "variable-select",
                                choices: { ...this.variables },
                                value: programLine.target.id,
                            },
                            { type: "plain", value: "=" },
                            ...this.valueToUI(programLine.value, [...selector, index, "value"]),
                        ]
                    })
                    break;
                case "function":
                    code.push({
                        lineId: programLine.lineId,
                        contents: [
                            {
                                selector: [...selector, index, "id"],
                                type: "function-select",
                                choices: this.functions,
                                value: programLine.id,
                                children: programLine.arg === undefined ? undefined : this.valueToUI(programLine.arg, [...selector, index, "arg"]),
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
                        lineId: programLine.if.ifId,
                        contents: [
                            { type: "reserved", value: "もし" },
                            ...this.valueToUI(programLine.if.condition, [...selector, index, "if", "condition"]),
                            { type: "reserved", value: "なら" },
                        ],
                        nest: {
                            info: { why: "if" },
                            lines: this.convert(programLine.if.lines, [...selector, index, "if", "lines"]),
                        }
                    })
                    if (programLine.elif) {
                        programLine.elif.forEach((elifLine, _index) => {
                            code.push({
                                lineId: elifLine.elifId,
                                contents: [
                                    { type: "reserved", value: "そうでなくもし" },
                                    ...this.valueToUI(elifLine.condition, [...selector, index, "elif", _index, "condition"]),
                                    { type: "reserved", value: "なら" },
                                ],
                                nest: {
                                    info: { why: "elif", elifId: elifLine.elifId },
                                    lines: this.convert(elifLine.lines, [...selector, index, "elif", _index, "lines"]),
                                }
                            })
                        })
                    }
                    if (programLine.else) {
                        code.push({
                            lineId: programLine.else.elseId,
                            contents: [
                                { type: "reserved", value: "そうでなければ" },
                            ],
                            nest: {
                                info: { why: "else" },
                                lines: this.convert(programLine.else.lines, [...selector, index, "else", "lines"]),
                            }
                        })
                    }
                    break;
                case "while":
                    code.push({
                        lineId: programLine.lineId,
                        contents: [
                            ...this.valueToUI(programLine.condition, [...selector, index, "condition"]),
                            { type: "reserved", value: "の間繰り返す" },
                        ],
                        nest: {
                            info: { why: "while" },
                            lines: this.convert(programLine.lines, [...selector, index, "lines"]),
                        }
                    })
            }
        });

        return code;
    }

    valueToUI = (value: Value, selector: Array<string | number>): LineContents => {
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
                            value: value.id,
                            children: this.valueToUI(value.arg, [...selector, "arg"]),
                            choices: this.functions,
                        }
                    )
                    break;
                case "equal":
                    codeValue.push(...this.valuesToUIWithOperator(value.values, [...selector, "values"], "=="))
                    break;
                case "add":
                    codeValue.push(...this.valuesToUIWithOperator(value.values, [...selector, "values"], "+"))
                    break;
                case "subtract":
                    codeValue.push(...this.valuesToUIWithOperator(value.values, [...selector, "values"], "-"))
                    break;
                case "multiply":
                    codeValue.push(...this.valuesToUIWithOperator(value.values, [...selector, "values"], "*"))
                    break;
                case "divide":
                    codeValue.push(...this.valuesToUIWithOperator(value.values, [...selector, "values"], "/"))
                    break;
                case "and":
                    codeValue.push(...this.valuesToUIWithOperator(value.values, [...selector, "values"], "and"))
                    break;
                case "or":
                    codeValue.push(...this.valuesToUIWithOperator(value.values, [...selector, "values"], "or"))
                    break;
                case "bigger":
                    codeValue.push(...this.valuesToUIWithOperator(value.values, [...selector, "values"], ">"))
                    break;
                case "smaller":
                    codeValue.push(...this.valuesToUIWithOperator(value.values, [...selector, "values"], "<"))
                    break;
                case "not-equal":
                    codeValue.push(...this.valuesToUIWithOperator(value.values, [...selector, "values"], "!="))
                    break;
                case "bigger-equal":
                    codeValue.push(...this.valuesToUIWithOperator(value.values, [...selector, "values"], ">="))
                    break;
                case "smaller-equal":
                    codeValue.push(...this.valuesToUIWithOperator(value.values, [...selector, "values"], "<="))
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

    valuesToUIWithOperator = (values: [Value, Value], selector: Array<string | number>, operation: string): Array<BlockElem | TextElem> => {
        const [value1, value2] = values;

        return [
            ...this.valueToUI(value1, [...selector, 0]),
            { type: "plain", value: operation },
            ...this.valueToUI(value2, [...selector, 1]),
        ]
    }
}

export default ProgramConverter;

