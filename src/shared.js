const constants = require("./constants.js");

// Nous retournons un point d'interrogation dans le cas ou
// l'argument passé n'est pas une valeur sur 32 bits.
module.exports.charInvalide = () =>
{
    return constants.CODE_POINT_INTERROGATION;
}

module.exports.isUnicode32 = unicode32Char =>
{
    return Buffer.isBuffer(unicode32Char) && unicode32Char.length == constants.NOMBRE_OCTETS_UNICODE_32;
}

module.exports.readInt32LE = unicode32Char =>
{
    if (!this.isUnicode32(unicode32Char)) {
        return 0;
    }

    return ((unicode32Char[3] << 24) | ((unicode32Char[2] << 16) | ((unicode32Char[1] << 8) | unicode32Char[0])))
}

module.exports.readInt32BE = unicode32Char =>
{
    if (!this.isUnicode32(unicode32Char)) {
        return 0;
    }

    return ((unicode32Char[0] << 24) | ((unicode32Char[1] << 16) | ((unicode32Char[2] << 8) | unicode32Char[3])))
}