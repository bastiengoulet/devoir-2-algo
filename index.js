#!/usr/bin/env node
const path = require("path");
const codec = require("./src/encodageUtf32VersUtf8.js");
const codec2 = require("./src/encodageUtf8VsUtf32");
const args = process.argv.slice(2)

if (args.length == 1 && args[0] === "-h")
{
    console.log("index.js : prends 2 ou 3 arguments selon le premier argument qui peut etre +, - ou =");
    console.log("+ => prend 1 argument (chemin du fichier) et transforme un unicode32 en utf8");
    console.log("- => prend 1 argument (chemin du fichier) et transforme un utf8 en unicode32");
    console.log("+ => prend 2 argument (chemin du fichier) et returne un boolean pour savoir si les fichiers sont exactements les memes");
} else if (args.length == 2)
{
    var nomFichier = path.parse(args[1]).name;
    var fichierDest = "./output/" + nomFichier + ".utf8";

    if (args[0] == "+")
    {
        codec.convertirUnicode32VersUtf8(args[1], fichierDest);
    }
    else if (args[0] == "-")
    {
        var des = "./output/" + nomFichier + ".unicode32";
        codec2.convertirUtf8VsUnicode32(args[1], des);
    }
    else
    {
        console.log("Le premier argument doit être {+} pour convertir UTF-32 à UTF-8, ou {-} pour convertir UTF-8 à UTF-32.");
    }
}
else if (args.length == 3 && args[0] == "=")
{
    codec2.testFichiers(args[1], args[2]);
} else
{
    console.log("Veuillez fournir 2 arguments: node index.js {+/-} {Nom du fichier source}");
}