import { DNCL2Program, Value, RawValue, ArithmeticOperation, LogicalOperation, ProgramResult } from "@/types/program";

class ProgramRunner {
    variables: { [id: string]: { name: string, value: RawValue } };
    functions: { [id: string]: { name: string, action: (...arg: any[]) => any } };
    result: ProgramResult;
    idList: string[];

    runningIndex: number = 0;

    constructor() {
        this.variables = {};
        this.functions = {
            show: { name: "表示する", action: (arg: any) => { this.result.push({ index: this.runningIndex, text: String(arg), type: "log" }) } },
            int: { name: "切り捨て", action: (arg: number) => Math.floor(arg) },
            str: { name: "文字", action: (arg: any) => String(arg) },
        }
        this.result = [];
        this.idList = [];
    }

    run(program: DNCL2Program, isNested: boolean = false): "break" | undefined {
        if (!isNested) {
            this.idList = this.createIdList(program);
        }

        for (const line of program) {
            switch (line.type) {
                case "assign-variable":
                    this.runningIndex = this.idList.indexOf(line.lineId);
                    this.variables[line.target.id] = { name: line.target.name, value: this.getRawValue(line.value) };
                    break;
                case "reassign-variable":
                    this.runningIndex = this.idList.indexOf(line.lineId);
                    this.variables[line.target.id].value = this.getRawValue(line.value);
                    break;
                case "function":
                    this.runningIndex = this.idList.indexOf(line.lineId);
                    if (line.arg) {
                        this.functions[line.id].action(this.getRawValue(line.arg));
                    } else {
                        this.functions[line.id].action();
                    }
                    break;
                case "branch":
                    let isFinished = false;
                    this.runningIndex = this.idList.indexOf(line.if.ifId);
                    if (this.getRawValue(line.if.condition)) {
                        isFinished = true;
                        const res = this.run(line.if.lines, true);
                        if (res === "break") { return "break"; }
                    }
                    if (!isFinished && line.elif) {
                        for (const elif of line.elif) {
                            this.runningIndex = this.idList.indexOf(elif.elifId);
                            if (this.getRawValue(elif.condition)) {
                                isFinished = true;
                                const res = this.run(elif.lines, true);
                                if (res === "break") { return "break"; }
                            }
                        }
                    }
                    if (!isFinished && line.else) {
                        this.runningIndex = this.idList.indexOf(line.else.elseId);
                        const res = this.run(line.else.lines, true);
                        if (res === "break") { return "break"; }
                    }
                    break;
                case "while":
                    this.runningIndex = this.idList.indexOf(line.lineId);
                    while (this.getRawValue(line.condition)) {
                        const whileReturn = this.run(line.lines, true);
                        if (whileReturn === "break") { break; }
                    }
                    break;
                case "break":
                    this.runningIndex = this.idList.indexOf(line.lineId);
                    return "break";
            }
        }

        return undefined;
    }

    getRawValue = (value: Value): RawValue => {
        if (typeof value !== "object") { return value; }

        if (value.operation === "variable") {
            if (!this.variables[value.id]) {
                throw new Error("この変数は存在しません。");
            }
            return this.variables[value.id].value;
        } else if (value.operation === "function") {
            if (!this.functions[value.id]) {
                throw new Error("この関数は存在しません。");
            }
            return this.functions[value.id].action(this.getRawValue(value.arg));
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

    createIdList(program: DNCL2Program) {
        const IdList: string[] = [];

        for (const line of program) {
            switch (line.type) {
                case "function":
                case "assign-variable":
                case "reassign-variable":
                case "break":
                    IdList.push(line.lineId);
                    break;
                case "branch":
                    IdList.push(line.if.ifId);
                    IdList.push(...this.createIdList(line.if.lines));
                    line.elif?.forEach(elif => {
                        IdList.push(elif.elifId, ...this.createIdList(elif.lines));
                    });
                    line.else && IdList.push(line.else.elseId, ...this.createIdList(line.else.lines));
                    break;
                case "while":
                    IdList.push(line.lineId, ...this.createIdList(line.lines));
                    break;
            }
        }

        return IdList;
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