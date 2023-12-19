import { DNCL2Program } from "@/types/program";

export class DNCL2 {
    variables: { [id: string]: { name: string } };
    functions: { [id: string]: { name: string, action: (...arg: any[]) => any } };
    result: Array<{ index: number, text: string, type: "log" | "warn" | "err" }>

    constructor() {
        this.variables = {};
        this.functions = {
            show: { name: "表示する", action: (arg: any) => { console.log(arg) } },
            int: { name: "切り捨て", action: (arg: number) => Math.floor(arg) },
            str: { name: "文字", action: (arg: any) => String(arg) },
        };
        this.result = [];
    }

    run(program: DNCL2Program) {
        for (const line of program) {
            switch (line.type) {
                case "function":
                    if (!this.functions[line.id]) {
                        this.result.push({ index: 0, text: "この関数は存在しません。", type: "log" });
                        return;
                    }
                    this.functions[line.id].action(line.arg);
                    break;
                case "assign-variable":
                    if (!this.variables[line.target.id]) {
                        this.result.push({ index: 0, text: "この変数はすでに存在するため値を更新します。", type: "warn" });
                    }
                    this.variables[line.target.id] = { name: line.target.name };
                    break;
                case "reassign-variable":
                case "break":
                case "branch":
                case "while":
            }
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