let target = "/aaaaaa/{?id}/bbbb/{code}/value/{number}";

const convert = (target, offsets) => {

    target = target.replace(/\/{([^}]+)}/g, "{!!!}");
    
    for(let n = 0 ; n < offsets.length ; n++){
        target = target.replace("{!!!}",  "/" + offsets[n]);
    }

    target = target.split("{!!!}").join("");

    return target;
}

console.log(convert("/aaa/{id}", [ 123 ]));
console.log(convert("/bbbbb/{a}/{b}/cccc/{z}", [ 2, 3, 4 ]));
console.log(convert("/o/{n}/{?aaa}", [ 15, 2 ]));
console.log(convert("/o/{n}/{?aaa}", [ 30 ]));
