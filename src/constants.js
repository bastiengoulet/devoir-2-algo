module.exports = Object.freeze({
    NOMBRE_OCTETS_UNICODE_32: 4,
    LIMITE_1_OCTET: 128,
    LIMITE_2_OCTET: 2048,
    LIMITE_3_OCTET: 65536,

    CODE_POINT_INTERROGATION: 0x3F,
    RIGHT_SHIFT_OCTET_SUPP: 6,

    // Masques correspondant aux derniers bits du premier
    // octet d'un caractères encodé en UTF-8, indiquant la
    // taille du caractère.
    MASQUE_HEADER_OCTET_SUPP: 0x80,
    MASQUE_OCTET_1_POUR_PAIRE: 0xC0,
    MASQUE_OCTET_1_POUR_TRIPLE: 0xE0,
    MASQUE_OCTET_1_POUR_QUADRUPLE: 0xF0,

    // Masques utiles, avec une opération de ET binaire, afin 
    // de forcer les derniers bits d'un octet à zéro, afin de
    // pouvoir appliquer le masque de la section précédente.
    MASQUE_MISE_A_ZERO_OCTET_SUPP: 0x3F,
    MASQUE_MISE_A_ZERO_OCTET_1_POUR_PAIRE: 0x1F,
    MASQUE_MISE_A_ZERO_OCTET_1_POUR_TRIPLE: 0x0F,
    MASQUE_MISE_A_ZERO_OCTET_1_POUR_QUADRUPLE: 0x07
});