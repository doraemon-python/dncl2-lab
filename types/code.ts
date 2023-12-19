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

export type BaseBlockElem<T extends string, V> = {
    type: T;
    selector: Array<string | number>;
    value: V
}
export type BaseSelectBlockElem<T extends string, V> = BaseBlockElem<T, V> & {
    choices: { [id: string]: string }
}

export type WriteBlockElem = (
    BaseBlockElem<"variable", string> |
    BaseBlockElem<"number" | "string", string>
)
export type SelectBlockElem = (
    BaseSelectBlockElem<"variable-select", string> |
    BaseSelectBlockElem<"function-select", string> & { children?: Array<BlockElem | TextElem> } |
    Omit<BaseSelectBlockElem<"boolean-select", boolean>, "choices">
)

export type BlockElem = WriteBlockElem | SelectBlockElem;

export type TextElem = {
    type: "plain" | "reserved";
    value: string;
}