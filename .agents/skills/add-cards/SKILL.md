---
name: add-cards
description: Skill para añadir cartas nuevas a WebFutbol. Usar siempre que el usuario pida meter cartas nuevas de un personaje.
---

# Añadir Cartas a WebFutbol

## Proceso obligatorio

**SIEMPRE** usar el script `add_cards.js` del proyecto. NUNCA editar HTMLs ni cards.js a mano.

## Pasos

1. **Crear un archivo JSON temporal** `card_config.json` con esta estructura:

```json
{
    "fileName": "nombre_del_archivo",
    "arrayName": "nombreDelArchivoCards",
    "series": "tsubasa",
    "cards": [
        {
            "id": "IdUnico",
            "name": "NOMBRE PERSONAJE",
            "version": "NombreVersion",
            "rarity": "Oro",
            "rating": 86,
            "position": "CB",
            "league": "J-League",
            "nationFlag": "https://flagcdn.com/w40/jp.png",
            "teamIcon": "teams/NombreEquipo.png",
            "image": "assets/characters/Carpeta/Imagen.png",
            "background": "assets/Cartas/Fondo.png"
        }
    ]
}
```

2. **Ejecutar**: `node add_cards.js card_config.json`

3. **Verificar** que la salida muestra `[OK]` en todo y `8/8 HTMLs actualizados`

## Campos importantes

- `fileName`: nombre en snake_case (sin `_cards.js`, se añade solo)
- `arrayName`: nombre en camelCase terminado en `Cards`
- `series`: `"tsubasa"` para Inazuma/Captain Tsubasa, `"bluelock"` para Blue Lock
- `league`: Usar las ligas del proyecto: `"J-League"`, `"Ligue 1"`, `"Serie A"`, `"Bundesliga"`, `"La Liga"`, `"Premier League"`
- `nationFlag`: URL de flagcdn, ej: `jp.png`, `fr.png`, `es.png`
- `background`: Consultar `assets/Cartas/` para los fondos disponibles
- `secondaryPositions`: campo opcional, array de strings `["RB", "CDM"]`

## Ligas por equipo conocidas

| Equipo | Liga |
|--------|------|
| Raimon, Teikoku, Zeus, Occult, Farm, Brain, Shuriken, Kirkwood | J-League |
| Monaco, PXG | Ligue 1 |
| Bastard, Manshine | Bundesliga |
| Ubers, Inter | Serie A |
| Barcha, Real | La Liga |

## Lo que hace el script automáticamente

1. Crea `database/NOMBRE_cards.js` con formato multi-línea correcto
2. Añade `<script>` en **TODOS** los HTML que cargan `cards.js` (8 archivos)
3. Añade `...nombreCards` al array correcto en `cards.js`
4. Actualiza `DB_VERSION` para invalidar caché
5. Verifica sintaxis y presencia en todos los archivos
