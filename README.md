# Grove-DHT22
Grove DHT22 makecode extension for  microbit

Extension MakeCode pour micro:bit (capteur Grove DHT22), avec blocs personnalisés.

## Utiliser cette extension dans MakeCode

1. Ouvrir [https://makecode.microbit.org](https://makecode.microbit.org)
2. Aller dans **Extensions**
3. Coller l’URL de ce dépôt GitHub
4. Ajouter les blocs **Grove DHT22** au projet

⚠️ **Important matériel (micro:bit)** : mettez le switch du module DHT22 sur **3V / 3.3V** (pas 5V) quand DATA est connecté sur une broche micro:bit.

⚠️ Le DHT22 a besoin d'environ **1 à 2 secondes après l'alimentation** avant la première mesure valide.

---


## Dépannage MakeCode (erreurs `; expected` / `) expected`)

Si MakeCode affiche des erreurs de syntaxe juste après un collage, c’est souvent que vous avez collé un **patch Git** au lieu du code TypeScript.

⚠️ Dans MakeCode, collez uniquement du TypeScript valide (ex: le contenu de `main.ts`).

Ne pas coller les lignes de patch/terminal, par exemple:
- `diff --git ...`
- `--- a/main.ts` / `+++ b/main.ts`
- `@@ ... @@`
- lignes shell (`cd ...`, `git ...`)

Si nécessaire:
1. Ouvrez `main.ts` dans ce dépôt.
2. Copiez uniquement le code TypeScript.
3. Collez ce code dans l’éditeur MakeCode.

## Créer votre propre extension avec des blocs personnalisés

Si vous souhaitez créer vos propres blocs (comme dans ce dépôt), voici le flux recommandé.

### 1) Créer le dépôt d’extension

- Créez un dépôt GitHub (public)
- Ajoutez au minimum:
  - `pxt.json`
  - `main.ts`
  - `README.md`

Exemple minimal de `pxt.json`:

```json
{
  "name": "mon-extension",
  "version": "0.0.1",
  "description": "Mon extension MakeCode micro:bit",
  "dependencies": {
    "core": "*"
  },
  "files": ["main.ts", "README.md"],
  "public": true
}
```

### 2) Déclarer un namespace bloc

Dans `main.ts`, créez un `namespace` avec les annotations MakeCode:

```typescript
//% color=#2F5597 icon="\uf2c9" block="Mon Extension"
namespace monExtension {
}
```

- `block="..."` définit le nom de la catégorie de blocs
- `color` et `icon` personnalisent l’apparence dans l’éditeur

### 3) Exposer une fonction comme bloc

```typescript
//% block="lire valeur sur broche %pin"
export function lire(pin: DigitalPin): number {
    return pins.digitalReadPin(pin)
}
```

Bonnes pratiques:

- Utiliser des noms simples côté bloc (`block="..."`)
- Garder des fonctions courtes et robustes
- Retourner `NaN` ou une valeur sentinelle si la mesure échoue

### 4) Créer des menus déroulants (enum)

Les `enum` deviennent des listes déroulantes dans les blocs:

```typescript
export enum Mesure {
    //% block="température"
    Temperature = 0,
    //% block="humidité"
    Humidite = 1
}

//% block="lire %what"
export function lireMesure(what: Mesure): number {
    return 0
}
```

### 5) Tester dans MakeCode

- Importez votre dépôt via **Extensions**
- Vérifiez que:
  - La catégorie apparaît
  - Les blocs sont lisibles
  - Les paramètres ont les bons menus/labels

### 6) Versionner et publier

- Commitez vos changements sur GitHub
- Incrémentez `version` dans `pxt.json` pour chaque release
- Gardez `public: true` pour faciliter l’ajout en extension

---

## Ce que montre ce dépôt

Ce dépôt illustre plusieurs techniques utiles pour des blocs MakeCode:

- Namespace unique de blocs (`groveDHT22`)
- Menus déroulants avec `enum` (choix type de donnée, choix du port)
- Fonctions publiques annotées `//% block="..."`
- Validation des données (checksum) et cache temporel
