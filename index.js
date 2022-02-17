#!/usr/bin/env node
const path = require("path");
const codec = require("./src/encodageUtf32VersUtf8.js");
const args = process.argv.slice(2)

if (args.length == 2)
{
    var nomFichier = path.parse(args[1]).name;
    var fichierDest = "./output/" + nomFichier + ".utf8";

    if (args[0] == "+")
    {
        codec.convertirUnicode32VersUtf8(args[1], fichierDest);
    }
    else if (args[0] == "-")
    {

    }
    else
    {
        console.log("Le premier argument doit être {+} pour convertir UTF-32 à UTF-8, ou {-} pour convertir UTF-8 à UTF-32.");
    }
}
else
{
    console.log("Veuillez fournir 2 arguments: node index.js {+/-} {Nom du fichier source}");
}