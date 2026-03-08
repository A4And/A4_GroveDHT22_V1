```typescript
//% color=#2F5597 icon="\uf2c9" block="Mon Extension"
namespace monExtension {
}
```

- `block="..."` définit le nom de la catégorie de blocs
- `color` et `icon` personnalisent l’apparence dans l’éditeur

//% block="lire valeur sur broche %pin"
export function lire(pin: DigitalPin): number {
    return pins.digitalReadPin(pin)
}
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
