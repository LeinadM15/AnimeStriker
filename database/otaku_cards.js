// database/otaku_cards.js
const otakuCards = [
    { id: "anthony_woodbridge_oro", name: "ANTHONY WOODBRIDGE", version: "Oro", rarity: "Oro", rating: 78, position: "LB", league: "J-League", nationFlag: "https://flagcdn.com/w40/jp.png", teamIcon: "teams/Otaku.png", image: "assets/characters/Otaku/AnthonyWoodbridge.png", background: "assets/Cartas/Oro.png" },
    { id: "bill_formby_oro", name: "BILL FORMBY", version: "Oro", rarity: "Oro", rating: 76, position: "CB", league: "J-League", nationFlag: "https://flagcdn.com/w40/jp.png", teamIcon: "teams/Otaku.png", image: "assets/characters/Otaku/BillFormby.png", background: "assets/Cartas/Oro.png" },
    { id: "gaby_farmer_oro", name: "GABY FARMER", version: "Oro", rarity: "Oro", rating: 78, position: "LW", league: "J-League", nationFlag: "https://flagcdn.com/w40/jp.png", teamIcon: "teams/Otaku.png", image: "assets/characters/Otaku/GabyFarmer.png", background: "assets/Cartas/Oro.png" },
    { id: "grant_eldorado_oro", name: "GRANT ELDORADO", version: "Oro", rarity: "Oro", rating: 76, position: "GK", league: "J-League", nationFlag: "https://flagcdn.com/w40/jp.png", teamIcon: "teams/Otaku.png", image: "assets/characters/Otaku/GrantEldorado.png", background: "assets/Cartas/Oro.png" },
    
    { id: "gus_gamer_oro", name: "GUS GAMER", version: "Oro", rarity: "Oro", rating: 78, position: "CM", league: "J-League", nationFlag: "https://flagcdn.com/w40/jp.png", teamIcon: "teams/Otaku.png", image: "assets/characters/Otaku/GusGamerOro.png", background: "assets/Cartas/Oro.png" },
    { id: "gus_gamer_chicle", name: "GUS GAMER", version: "Chicle", rarity: "Especial", rating: 81, position: "CM", league: "J-League", nationFlag: "https://flagcdn.com/w40/jp.png", teamIcon: "teams/Otaku.png", image: "assets/characters/Otaku/GusGamer.png", background: "assets/Cartas/Chicle.png" },
    
    { id: "ham_signalman_oro", name: "HAM SIGNALMAN", version: "Oro", rarity: "Oro", rating: 77, position: "CM", league: "J-League", nationFlag: "https://flagcdn.com/w40/jp.png", teamIcon: "teams/Otaku.png", image: "assets/characters/Otaku/HamSignalman.png", background: "assets/Cartas/Oro.png" },
    
    { id: "josh_spear_oro", name: "JOSH SPEAR", version: "Oro", rarity: "Oro", rating: 78, position: "RW", league: "J-League", nationFlag: "https://flagcdn.com/w40/jp.png", teamIcon: "teams/Otaku.png", image: "assets/characters/Otaku/JoshSpearOro.png", background: "assets/Cartas/Oro.png" },
    { id: "josh_spear_chicle", name: "JOSH SPEAR", version: "Chicle", rarity: "Especial", rating: 81, position: "RW", league: "J-League", nationFlag: "https://flagcdn.com/w40/jp.png", teamIcon: "teams/Otaku.png", image: "assets/characters/Otaku/JoshSpear.png", background: "assets/Cartas/Chicle.png" },
    
    { id: "light_nobel_oro", name: "LIGHT NOBEL", version: "Oro", rarity: "Oro", rating: 80, position: "RB", league: "J-League", nationFlag: "https://flagcdn.com/w40/jp.png", teamIcon: "teams/Otaku.png", image: "assets/characters/Otaku/LightNobelOro.png", background: "assets/Cartas/Oro.png" },
    { id: "light_nobel_chicle", name: "LIGHT NOBEL", version: "Chicle", rarity: "Especial", rating: 83, position: "RB", league: "J-League", nationFlag: "https://flagcdn.com/w40/jp.png", teamIcon: "teams/Otaku.png", image: "assets/characters/Otaku/LightNobel.png", background: "assets/Cartas/Chicle.png" },
    
    { id: "marcus_train_oro", name: "MARCUS TRAIN", version: "Oro", rarity: "Oro", rating: 78, position: "CB", league: "J-League", nationFlag: "https://flagcdn.com/w40/jp.png", teamIcon: "teams/Otaku.png", image: "assets/characters/Otaku/MarcusTrain.png", background: "assets/Cartas/Oro.png" },
    
    { id: "mark_gambling_oro", name: "MARK GAMBLING", version: "Oro", rarity: "Oro", rating: 82, position: "ST", league: "J-League", nationFlag: "https://flagcdn.com/w40/jp.png", teamIcon: "teams/Otaku.png", image: "assets/characters/Otaku/MarkGamblingOro.png", background: "assets/Cartas/Oro.png" },
    { id: "mark_gambling_chicle", name: "MARK GAMBLING", version: "Chicle", rarity: "Especial", rating: 85, position: "ST", league: "J-League", nationFlag: "https://flagcdn.com/w40/jp.png", teamIcon: "teams/Otaku.png", image: "assets/characters/Otaku/MarkGambling.png", background: "assets/Cartas/Chicle.png" },
    
    { id: "mike_vox_oro", name: "MIKE VOX", version: "Oro", rarity: "Oro", rating: 76, position: "CB", league: "J-League", nationFlag: "https://flagcdn.com/w40/jp.png", teamIcon: "teams/Otaku.png", image: "assets/characters/Otaku/MikeVox.png", background: "assets/Cartas/Oro.png" },
    { id: "ollie_webb_oro", name: "OLLIE WEBB", version: "Oro", rarity: "Oro", rating: 77, position: "RB", league: "J-League", nationFlag: "https://flagcdn.com/w40/jp.png", teamIcon: "teams/Otaku.png", image: "assets/characters/Otaku/OllieWebb.png", background: "assets/Cartas/Oro.png" },
    { id: "sam_idol_oro", name: "SAM IDOL", version: "Oro", rarity: "Oro", rating: 80, position: "GK", league: "J-League", nationFlag: "https://flagcdn.com/w40/jp.png", teamIcon: "teams/Otaku.png", image: "assets/characters/Otaku/SamIdol.png", background: "assets/Cartas/Oro.png" },
    { id: "spencer_gates_oro", name: "SPENCER GATES", version: "Oro", rarity: "Oro", rating: 81, position: "CB", league: "J-League", nationFlag: "https://flagcdn.com/w40/jp.png", teamIcon: "teams/Otaku.png", image: "assets/characters/Otaku/SpencerGates.png", background: "assets/Cartas/Oro.png" },
    
    { id: "theodore_master_oro", name: "THEODORE MASTER", version: "Oro", rarity: "Oro", rating: 78, position: "CM", league: "J-League", nationFlag: "https://flagcdn.com/w40/jp.png", teamIcon: "teams/Otaku.png", image: "assets/characters/Otaku/TheodoreMasterOro.png", background: "assets/Cartas/Oro.png" },
    { id: "theodore_master_chicle", name: "THEODORE MASTER", version: "Chicle", rarity: "Especial", rating: 81, position: "CM", league: "J-League", nationFlag: "https://flagcdn.com/w40/jp.png", teamIcon: "teams/Otaku.png", image: "assets/characters/Otaku/TheodoreMaster.png", background: "assets/Cartas/Chicle.png" },
    
    { id: "walter_valiant_oro", name: "WALTER VALIANT", version: "Oro", rarity: "Oro", rating: 79, position: "CDM", league: "J-League", nationFlag: "https://flagcdn.com/w40/jp.png", teamIcon: "teams/Otaku.png", image: "assets/characters/Otaku/WalterValiantOro.png", background: "assets/Cartas/Oro.png" },
    { id: "walter_valiant_chicle", name: "WALTER VALIANT", version: "Chicle", rarity: "Especial", rating: 82, position: "CDM", league: "J-League", nationFlag: "https://flagcdn.com/w40/jp.png", teamIcon: "teams/Otaku.png", image: "assets/characters/Otaku/WalterValiant.png", background: "assets/Cartas/Chicle.png" },
];
