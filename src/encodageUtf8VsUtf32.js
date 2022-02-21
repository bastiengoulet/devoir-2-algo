const fs = require('fs');
const constants = require("./constants.js");

module.exports.convertirUtf8VsUnicode32 = (fichierSource, fichierDest) =>
{
    fs.open(fichierSource, "r", (erreur, fd) => 
    {
        if (erreur) {
            console.log(erreur);
            return;
        }

        var utf8Char = Buffer.alloc(1);
        var buffer = Buffer.alloc(0);
        var inc = 1;
        var copie = Buffer.alloc(1);

        while (fs.readSync(fd, utf8Char, 0, 1, null) != 0)
        {   
            copie = Buffer.alloc(1);
            copie[0] = utf8Char[0];
            let unicode32Char = this.convertirCharUtf8VsUnicode32(utf8Char);
            for (inc = inc; inc != 0 && unicode32Char.length != 4; inc++) {
                inc = fs.readSync(fd, utf8Char, 0, 1, null);
                copie = Buffer.concat([copie, utf8Char]);
                unicode32Char = this.convertirCharUtf8VsUnicode32(copie);
            }
            buffer = Buffer.concat([buffer, unicode32Char]);
        }

        fs.writeFile(fichierDest, buffer, "utf-8", erreur => {
            if (erreur) {
                console.log(erreur);
                return;
            }
        })
    });
}

module.exports.testFichiers = (file1, file2) =>
{
    var tmpBuf = fs.readFileSync(file1);
    var testBuf = fs.readFileSync(file2);
    var index = 0,
    length = tmpBuf.length,
    length2 = testBuf.length;
    let match = true;

    while (index < length) {
        if (tmpBuf[index] === testBuf[index]) {
            index++;
        } else {
            console.log(tmpBuf[index], "|", testBuf[index], "|index:",index)
            match = false;
            break;
        }
    }
    if (length != length2) {
        console.log("taille differentes");
        console.log(length);
        console.log(length2);
        match = false;
    }
    console.log(match);
}

/**
 * Fonction pour transformet les Utf8 en Unicode32
 * Il faut envoyer les octets utf8 (au maximum 4)
 * si jamais l'octet ou les octet envoyés ne sont pas suffisant, ils vont être renvoyés.
 * Pour savoir du coup si tout a bien marché, il suffit de voir si la longueur du buffer renvoyer par la fonction 
 * est égale à 4. Si ce n'est pas le cas, c'est qu'il faut renvoyer des octets.
 */
module.exports.convertirCharUtf8VsUnicode32 = (utf8Char) =>
{
    var unicode32Char = Buffer.alloc(4);
    
    if (utf8Char[0] < constants.MASQUE_HEADER_OCTET_SUPP) {
        unicode32Char[0] = utf8Char[0];
        return unicode32Char;
    } else if (utf8Char[0] < constants.MAX_OCTET_2 && utf8Char.length == 2 && isBufferNewChar(utf8Char)) {
        return octet_Paire(utf8Char, unicode32Char);
    } else if (utf8Char[0] < constants.MAX_OCTET_3 && utf8Char.length == 3 && isBufferNewChar(utf8Char)) {
        return octet_Triple(utf8Char, unicode32Char);
    } else if (utf8Char[0] < constants.MAX_OCTET_4 && utf8Char.length == 4 && isBufferNewChar(utf8Char)) {
        return octet_Quadruple(utf8Char, unicode32Char);
    } else {
        return utf8Char;
    }
    return unicode32Char;
}

const octet_Paire = (utf8Char, unicode32Char) =>
{
    var copie = resetByte(utf8Char);
    let temp = 0;

    copie[0] = copie[0]%constants.MASQUE_OCTET_1_POUR_PAIRE;
    unicode32Char[0] = copie[1];
    temp = copie[0]%constants.MODULO_OCTET_1;
    unicode32Char[0] = unicode32Char[0] + (temp*constants.MULTIPLICATION_OCTET_1);

    unicode32Char[1] = copie[0]/constants.MODULO_OCTET_1;
    return unicode32Char;
}

const octet_Triple = (utf8Char, unicode32Char) =>
{
    var copie = resetByte(utf8Char);
    let temp = 0;

    copie[0] = copie[0]%constants.MASQUE_OCTET_1_POUR_TRIPLE;
    unicode32Char[0] = copie[2];
    temp = copie[1]%constants.MODULO_OCTET_1;
    unicode32Char[0] = unicode32Char[0] + (temp*constants.MULTIPLICATION_OCTET_1);

    unicode32Char[1] = copie[1]/constants.MODULO_OCTET_1;
    unicode32Char[1] = unicode32Char[1] + copie[0]*constants.MULTIPLICATION_OCTET_2;
    return unicode32Char;
}

const octet_Quadruple = (utf8Char, unicode32Char) =>
{
    var copie = resetByte(utf8Char);
    let temp = 0;
 
    copie[0] = copie[0]%constants.MASQUE_OCTET_1_POUR_QUADRUPLE;
    unicode32Char[0] = copie[3];
    temp = copie[2]%constants.MODULO_OCTET_1;
    unicode32Char[0] = unicode32Char[0] + (temp*constants.MULTIPLICATION_OCTET_1);

    unicode32Char[1] = copie[2]/constants.MODULO_OCTET_1;
    temp = copie[1]%constants.MODULO_OCTET_3;
    unicode32Char[1] = unicode32Char[1]+(temp*constants.MULTIPLICATION_OCTET_2);

    unicode32Char[2] = copie[1]/constants.MODULO_OCTET_3;
    unicode32Char[2] = unicode32Char[2] + copie[0]*constants.MULTIPLICATION_OCTET_3;
    return unicode32Char;
}

const isBufferNewChar = (utf8Char, unicode32Char) =>
{
    let mem = true;

    if (utf8Char.length < 2 || utf8Char.length > 4)
        return false;
    for (let i = 1; i < utf8Char.length; i++) {
        if (utf8Char[i] > constants.MASQUE_OCTET_1_POUR_PAIRE || utf8Char[i] < constants.MASQUE_HEADER_OCTET_SUPP)
            mem = false;
    }
    return mem;
}

const resetByte = (utf8Char) =>
{
    var copie = Buffer.alloc(utf8Char.length);

    if (!isBufferNewChar(utf8Char))
        return Buffer.alloc(0);
    copie[0] = utf8Char[0];
    for (let i = 1; i < utf8Char.length; i++) {
        copie[i] = utf8Char[i] - constants.MASQUE_HEADER_OCTET_SUPP;
    }
    return copie;
}