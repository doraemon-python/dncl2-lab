export type DNCL2Program = Array<ProgramLine>;

export type ProgramResult = Array<{
    index: number,
    text: string,
    type: "log" | "warn" | "error",
}>;

// Lineの定義
export type ProgramLine = NormalLine | NestedLine;
export type NormalLine = AssignVariableLine | ReassignVariableLine | FunctionLine | BreakLine;
export type NestedLine = BranchLine | WhileLine;

export type AssignVariableLine = {
    lineId: string,
    type: "assign-variable",
    target: { name: string, id: string },
    value: Value
}

export type ReassignVariableLine = {
    lineId: string,
    type: "reassign-variable",
    target: { id: string },
    value: Value,
}

export type FunctionLine = {
    lineId: string,
    type: "function",
    id: string,
    arg?: Value,
}

export type BreakLine = {
    lineId: string,
    type: "break",
}

export type BranchLine = {
    type: "branch",
    if: {
        ifId: string,
        condition: Value,
        lines: ProgramLine[]
    },
    elif?: Array<{
        elifId: string,
        condition: Value,
        lines: ProgramLine[]
    }>,
    else?: {
        elseId: string,
        lines: ProgramLine[]
    }
}

export type WhileLine = {
    lineId: string,
    type: "while",
    condition: Value,
    lines: ProgramLine[],
}

// Valueの定義
export type NormalValue = {
    type: "string" | "number" | "boolean",
    value: string
};
export type CalculatedValue = {
    operation: ArithmeticOperation,
    values: [Value, Value]
} | {
    operation: LogicalOperation,
    values: [Value, Value]
} | {
    operation: "variable",
    id: string,
} | {
    operation: "function",
    id: string,
    arg: Value,
};

export type Value = NormalValue | CalculatedValue;


// Operationの定義
/**
 * 算術演算
*/
export type ArithmeticOperation = "add" | "subtract" | "multiply" | "divide";
/**
 * 論理演算
*/
export type LogicalOperation = "and" | "or" | "bigger" | "smaller" | "equal" | "not-equal" | "bigger-equal" | "smaller-equal";

export type BaseOperation = ArithmeticOperation | LogicalOperation;