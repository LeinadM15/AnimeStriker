// cards.js - Catálogo Maestro
// Este archivo reúne todos los arrays definidos en los archivos de la carpeta database/ y asigna la serie

const tsubasaAll = [
    ...tsubasaCards,
    ...genzoCards,
    ...kojiroCards,
    ...holandaCards,
    ...wakashimazuCards,
    ...urabeCards,
    ...sorimachiCards,
    ...sanoCards,
    ...sawadaCards,
    ...takasugiCards,
    ...izawaCards,
    ...kishidaCards,
    ...kisugiCards,
    ...takiCards,
    ...levinCards,
    ...gentileCards,
    ...ginoCards,
    ...krausCards,
    ...dinamarcaCards,
    ...pierreCards,
    ...napoleonCards,
    ...amorosCards,
    ...jeanCards,
    ...mexicoCards,
    ...tailandiaCards,
    ...uruguayCards,
    ...chinaCards,
    ...croaciaCards,
    ...eeuuCards,
    ...portoCards,
    ...makeloloCards,
    ...thoramCards,
    ...italiaCards,
    ...espanaCards,
    ...holandaCardsNuevos,
    ...duschampsCards,
    ...mbappaCards,
    ...zedaneCards,
    ...sueciaCards,
    ...argentinaCards,
    ...otrosFranciaCards
];
tsubasaAll.forEach(c => c._series = 'tsubasa');

const bluelockAll = [
    ...isagiCards,
    ...yukimiyaCards,
    ...karasuCards,
    ...nagiCards,
    ...kiyoraCards,
    ...hiiragiCards,
    ...himizuCards,
    ...hioriCards,
    ...sub20Cards,
    ...chigiriCards,
    ...hugoCards,
    ...lokiCards,
    ...tresagaCards,
    ...baptisteCards,
    ...hidalgoCards,
    ...chevalierCards,
    ...noaCards,
    ...franciaBLCards,
    ...franciaHieloCards,
    ...kunigamiCards
];
bluelockAll.forEach(c => c._series = 'bluelock');

const coachesAll = typeof coachesDB !== 'undefined' ? [...coachesDB] : [];
coachesAll.forEach(c => c._series = 'coach');

const cardsDB = [...tsubasaAll, ...bluelockAll, ...coachesAll];
