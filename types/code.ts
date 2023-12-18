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

export type BaseBlockElem = {
    type: "variable";
    value: string;
} | {
    selector: Array<string | number>;
    type: "number" | "string";
    value: string;
};

export type SelectBlockElem = {
    selector: Array<string | number>;
    type: "variable-select";
    value: string;
    choices: { [id: string]: { name: string } };
} | {
    selector: Array<string | number>;
    type: "function-select";
    value: string;
    choices: { [id: string]: { name: string } };
    children?: Array<BlockElem | TextElem>;
} | {
    selector: Array<string | number>;
    type: "boolean-select";
    value: boolean;
};
export type BlockElem = BaseBlockElem | SelectBlockElem;

export type TextElem = {
    type: "plain" | "reserved";
    value: string;
}

