import { Program, Value, RawValue, ArithmeticOperation, LogicalOperation } from "@/types/program";

type Result = Array<{
    index: number,
    text: string,
    isError: boolean,
}>

class ProgramRunner {
    variables: { [id: string]: { name: string, value: RawValue } };
    functions: { [id: string]: { name: string, action: (...arg: any[]) => any } };
    result: Result;

    runningIndex: number = 0;

    constructor() {
        this.variables = {};
        this.functions = {
            show: { name: "表示する", action: (arg: any) => { this.result.push({ index: this.runningIndex, text: String(arg), isError: false }) } },
            int: { name: "切り捨て", action: (arg: number) => Math.floor(arg) },
            str: { name: "文字", action: (arg: any) => String(arg) },
        }
        this.result = [];
    }

    run(program: Program) {
        for (const line of program) {
            this.runningIndex++;
            switch (line.type) {
                case "assign-variable":
                    this.variables[line.target.id] = { name: line.target.name, value: this.getRawValue(line.value) };
                    break;
                case "reassign-variable":
                    this.variables[line.target.id].value = this.getRawValue(line.value);
                    break;
                case "function":
                    this.functions[line.target.id].action(this.getRawValue(line.value));
                    break;
                case "branch":
                    if (this.getRawValue(line.if.condition)) {
                        const res = this.run(line.if.lines);
                        if (res === "break") { return "break"; }
                    } else {
                        let runElse = !line.elif;

                        if (line.elif) {
                            runElse = true;
                            for (const elif of line.elif) {
                                if (this.getRawValue(elif.condition)) {
                                    runElse = false;
                                    const res = this.run(elif.lines);
                                    if (res === "break") { return "break"; }
                                }
                            }
                        }
                        if (line.else) {
                            if (runElse) {
                                const res = this.run(line.else.lines);
                                if (res === "break") { return "break"; }
                            }
                        }
                    }
                    break;
                case "while":
                    while (this.getRawValue(line.condition)) {
                        const whileReturn = this.run(line.lines);
                        if (whileReturn === "break") {
                            break;
                        }
                    }
                    break;
                case "break":
                    return "break";
            }
        }
    }

    getRawValue = (value: Value): RawValue => {
        if (typeof value !== "object") { return value; }

        if (value.operation === "variable") {
            if (!this.variables[value.id]) {
                throw new Error("この変数は存在しません。");
            }
            return this.variables[value.id].value;
        } else if (value.operation === "function") {
            if (!this.functions[value.functionId]) {
                throw new Error("この関数は存在しません。");
            }
            return this.functions[value.functionId].action(this.getRawValue(value.argValue));
        }

        const value1 = this.getRawValue(value.values[0]) as any;
        const value2 = this.getRawValue(value.values[1]) as any;
        checkType(value1, value2, value.operation);

        switch (value.operation) {
            case "add":
                return value1 + value2;
            case "subtract":
                return value1 - value2;
            case "multiply":
                return value1 * value2;
            case "divide":
                return value1 / value2;
            case "and":
                return value1 && value2;
            case "or":
                return value1 || value2;
            case "bigger":
                return value1 > value2;
            case "smaller":
                return value1 < value2;
            case "equal":
                return value1 === value2;
            case "not-equal":
                return value1 !== value2;
            case "bigger-equal":
                return value1 >= value2;
            case "smaller-equal":
                return value1 <= value2;
        }
    }
}

export default ProgramRunner;

const checkType = (value1: any, value2: any, operation: ArithmeticOperation | LogicalOperation): void => {
    switch (operation) {
        case "add":
            if (typeof value1 !== typeof value2) {
                throw new Error("種類の違う変数を足し合わせることはできません。");
            }
            break;
        case "subtract":
        case "multiply":
        case "divide":
            if (typeof value1 !== "number" || typeof value2 !== "number") {
                throw new Error("この計算は数値以外で行うことはできません。");
            }
            break;
        case "and":
        case "or":
            if (typeof value1 !== "boolean" || typeof value2 !== "boolean") {
                throw new Error("この計算は真偽値以外で行うことはできません。");
            }
            break;
        case "bigger":
        case "smaller":
        case "bigger-equal":
        case "smaller-equal":
            if (typeof value1 !== "number" || typeof value2 !== "number") {
                throw new Error("この計算は数値以外で行うことはできません。");
            }
            break;
        case "equal":
        case "not-equal":
            break;
    }
}