#!/usr/bin/env node
const codec = require("./src/encodageUtf32VersUtf8.js");

/*var buff = Buffer.alloc(4);
buff[0] = 0x01;
buff[1] = 0xF6;
buff[2] = 0x01;
buff[3] = 0x00;

var utf8Char = codec.convertirCharUnicode32VersUtf8(buff);
console.log(utf8Char);*/

codec.convertirUnicode32VersUtf8("./ressources/texte3.unicode32", "./output/texte3.utf8");