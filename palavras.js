export const palavras = [
    "AMIGO", "ANEXO", "ANJOS", "ASTRO", "BEIJO", "BORDA", "BRISA", "BROTO", "BURRO", "CABRA",
    "CAIXA", "CALOR", "CAMPO", "CARRO", "CHAVE", "CHUVA", "CIRCO", "CLARO", "COBRA", "CORVO",
    "CURVA", "DANOS", "DEDOS", "DENTE", "DISCO", "DEVER", "DOLAR", "DRAMA", "DUPLA", "ECOAR",
    "FALAR", "FARDO", "FESTA", "FIQUE", "FORTE", "GANSO", "GARRA", "GARFO", "GELAR", "GENTE",
    "GRATO", "GRUPO", "HOMEM", "IDOLO", "INDIO", "JANTA", "JOGAR", "JUNTA", "LARGA", "LIMPA",
    "LINCE", "LISTA", "LONGE", "MAGIA", "MANGA", "MARCO", "MANTA", "MOEDA", "NINHO", "NOBRE",
    "NUVEM", "ONDAS", "OGIVA", "OLHOS", "ORDEM", "OUTRO", "PACTO", "PADRE", "POEMA", "PODER",
    "PRATO", "PRESA", "PRAIA", "PRETO", "QUASE", "QUEDA", "RAIVA", "RAMPA", "RENDA", "RISCO",
    "SALTO", "SAQUE", "SINAL", "SOBRE", "SOLAR", "SONHO", "TANTO", "TARDE", "TIGRE", "TINTA",
    "TREVO", "LAUDO", "VELHO", "VENTO", "VISTA", "VAZIO", "VIRAR", "SUBIR", "NUNCA", "COUVE"
];
    
var indiceAleatorio = Math.floor(Math.random() * (100 - 1)) + 1;
export const palavraAleatoria = palavras[indiceAleatorio];