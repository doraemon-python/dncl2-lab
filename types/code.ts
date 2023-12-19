export type Code = CodeLine[];
export type CodeLine = {
    lineId: string;
    contents: LineContents;
    nest?: {
        info: NestInfo;
        lines: CodeLine[];
    }
};
export type LineContents = Array<BlockElem | TextElem>;
export type NestInfo = {
    why: "if" | "else" | "while";
} | {
    why: "elif";
    elifId: string;
}

export type BaseBlockElem<T extends string> = {
    type: T;
    selector: Array<string | number>;
    value: string
}
export type BaseSelectBlockElem<T extends string> = BaseBlockElem<T> & {
    choices: { [id: string]: string }
}

export type WriteBlockElem = (
    BaseBlockElem<"variable"> |
    BaseBlockElem<"number" | "string">
)
export type SelectBlockElem = (
    BaseSelectBlockElem<"variable-select"> |
    BaseSelectBlockElem<"function-select"> & { children?: Array<BlockElem | TextElem> } |
    Omit<BaseSelectBlockElem<"boolean-select">, "choices">
)

export type BlockElem = WriteBlockElem | SelectBlockElem;

export type TextElem = {
    type: "plain" | "reserved";
    value: string;
}