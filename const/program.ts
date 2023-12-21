import generateRandomId from "@/functions/generateRandomId";
import { DNCL2Program } from "@/types/program";
import { LINE_ID_LENGTH } from ".";

const getId = () => {
    return generateRandomId(LINE_ID_LENGTH);
}

const program: DNCL2Program = [
    { lineId: getId(), type: "assign-variable", target: { name: "判定する数", id: "var1" }, value: { type: "number", value: "4" } },
]

export default program;