module.exports = Object.freeze({
    NOMBRE_OCTETS_UTF_8: 1,
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
    MASQUE_MISE_A_ZERO_OCTET_1_POUR_QUADRUPLE: 0x07,

    //Masques utiles pour les multiplications et modulos afin de réarranger les bytes
    //Permet de coller tous les bytes entre eux 
    MODULO_OCTET_1: 0x04,
    MODULO_OCTET_3: 0x10,
    MULTIPLICATION_OCTET_1: 0x40,
    MULTIPLICATION_OCTET_2: 0x10,
    MULTIPLICATION_OCTET_3: 0x08,

    //Max pour verifier les octets
    MAX_OCTET_2: 0xE0,
    MAX_OCTET_3: 0xF0,
    MAX_OCTET_4: 0xF8,
});