const generateRandomId = (len: number) => {
    const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < len; i++) {
        result += characters[Math.floor(Math.random() * characters.length)];
    }
    return result;
}

export default generateRandomId;