export type Program = Array<ProgramLine>;
export type ProgramLine = NormalLine | NestedLine;
export type NormalLine = AssignVariableLine | ReassignVariableLine | FunctionLine | BreakLine;
export type NestedLine = BranchLine | WhileLine;

/**
 * 算術演算
 */
export type ArithmeticOperation = "add" | "subtract" | "multiply" | "divide";
/**
 * 論理演算
 */
export type LogicalOperation = "and" | "or" | "bigger" | "smaller" | "equal" | "not-equal" | "bigger-equal" | "smaller-equal";

export type RawValue = string | number | boolean;
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
    functionId: string,
    argValue: Value,
};
export type Value = RawValue | CalculatedValue;

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
    target: { name: string, id: string },
    value: Value,
}

export type BreakLine = {
    lineId: string,
    type: "break",
}

export type BranchLine = {
    lineId: string,
    type: "branch",
    if: {
        condition: Value,
        lines: ProgramLine[]
    },
    elif?: Array<{
        elifId: string,
        condition: Value,
        lines: ProgramLine[]
    }>,
    else?: {
        lines: ProgramLine[]
    }
}

export type WhileLine = {
    lineId: string,
    type: "while",
    condition: Value,
    lines: ProgramLine[],
}