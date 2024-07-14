const text = "aaaaaa[short name value=aaa]bbbbbbbbb[short nnnxxx]ccczzz";
const regex = /\[short (.*?)\]/g;

const matchs = text.match(regex);
if (!matchs) return codeString;
matchs.forEach((match) => {
    const match_ = match.substring("[short ".length, match.length -1);
    const ms = match_.split(" ");
    let name;
    let args = {};
    for (let n = 0 ; n < ms.length ; n++) {
        const ms_ = ms[n];
        if (n == 0) {
            name = ms_;
            continue;
        }

        const ms__ = ms_.split("=");
        const field = ms__[0].trim();
        const value = ms__[1].trim();
        args[field] = value;
    }

    console.log({
        name: name,
        args: args,
    });

});