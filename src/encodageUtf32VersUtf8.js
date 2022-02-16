const fs = require('fs');
const constants = require("./constants.js");
const shared = require("./shared.js");

module.exports.convertirUnicode32VersUtf8 = (fichierSource, fichierDest) =>
{
    fs.open(fichierSource, "r", (erreur, fd) => 
    {
        if (erreur) {
            console.log(erreur);
            return;
        }

        var unicode32Char = Buffer.alloc(4);
        var buffer = Buffer.alloc(0);

        while (fs.readSync(fd, unicode32Char, 0, 4, null) != 0)
        {   
            let utf8Char = this.convertirCharUnicode32VersUtf8(unicode32Char);
            buffer = Buffer.concat([buffer, utf8Char]);
        }

        fs.writeFile(fichierDest, buffer, { flag: "w" }, erreur => {
            if (erreur) {
                console.log(erreur);
                return;
            }
        })
    });
}

module.exports.convertirCharUnicode32VersUtf8 = unicode32Char =>
{
    var utf8Char = [];

    if (shared.isUnicode32(unicode32Char)) 
    {
        var codeChar = shared.readInt32LE(unicode32Char);

        if (codeChar < constants.LIMITE_1_OCTET)
        {
            // Le caractère UTF-8 n'a besoin que d'un
            utf8Char.push(unicode32Char[0]);
        } 
        else if (codeChar < constants.LIMITE_2_OCTET) 
        {
            // Le caractère UTF-8 doit être encodé sur 2 octets
            utf8Char = encoderUtf8(codeChar, 1, constants.MASQUE_MISE_A_ZERO_OCTET_1_POUR_PAIRE, constants.MASQUE_OCTET_1_POUR_PAIRE);
        } 
        else if (codeChar < constants.LIMITE_3_OCTET) 
        {
            // Le caractère UTF-8 doit être encodé sur 3 octets
            utf8Char = encoderUtf8(codeChar, 2, constants.MASQUE_MISE_A_ZERO_OCTET_1_POUR_TRIPLE, constants.MASQUE_OCTET_1_POUR_TRIPLE);
        } 
        else 
        {
            // Le caractère UTF-8 doit être encodé sur 4 octets
            utf8Char = encoderUtf8(codeChar, 3, constants.MASQUE_MISE_A_ZERO_OCTET_1_POUR_QUADRUPLE, constants.MASQUE_OCTET_1_POUR_QUADRUPLE);
        }
    } 
    else 
    {
        utf8Char.push(shared.charInvalide());
    }

    return Buffer.from(utf8Char);
}

const encoderUtf8 = (code, nbOctetsSupp, miseAZero, header) =>
{
    var utf8Char = [];

    for (var i = nbOctetsSupp; i > 0; i--) {
        utf8Char[i] = encoderOctetSuppEnUtf8(code);
        code = rightShift(code);
    }

    utf8Char[0] = encoderOctetEnUtf8(code, miseAZero, header);
    return utf8Char;
}

const encoderOctetSuppEnUtf8 = code =>
{
    return encoderOctetEnUtf8(code, constants.MASQUE_MISE_A_ZERO_OCTET_SUPP, constants.MASQUE_HEADER_OCTET_SUPP);
}

const encoderOctetEnUtf8 = (code, miseAZero, header) =>
{
    return (code & miseAZero) | header;
}

const rightShift = valeur =>
{
    if (isNaN(valeur)) {
        return valeur;
    }

    return valeur >> constants.RIGHT_SHIFT_OCTET_SUPP;
}