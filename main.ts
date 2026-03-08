/**
 * Grove DHT22 (Temperature & Humidity Sensor Pro) - micro:bit MakeCode extension
 * - Protocole single-bus DHT22 (timing µs)
 * - Checksum
 * - Cache 2s (respect période mini d'acquisition)
 * - Dropdown BitMaker V2 avec choix explicite de la broche DATA
 */
// Grove DHT22 (Temperature & Humidity Sensor Pro) - extension MakeCode micro:bit
// - Protocole single-bus DHT22 (timing us)
// - Checksum
// - Cache 2s (respect de la periode mini d'acquisition)
// - Dropdown BitMaker V2 avec choix explicite de la broche DATA

//% color=#2F5597 icon="\uf2c9" block="Grove DHT22"
namespace groveDHT22 {

    export enum DHT22Data {
        //% block="température (°C)"
        TemperatureC = 0,
        //% block="humidité (%RH)"
        Humidity = 1
    }

    /**
     * Sélection explicite de la broche DATA sur les ports Grove "doubles" du BitMaker V2.
     * Le DHT22 n’utilise qu’1 fil DATA.
     */
    export enum BitMakerPortData {
        //% block="P0 / P1 (DATA = P0)"
        P0P1_DataP0 = 0,
        //% block="P0 / P1 (DATA = P1)"
        P0P1_DataP1 = 1,

        //% block="P1 / P2 (DATA = P1)"
        P1P2_DataP1 = 2,
        //% block="P1 / P2 (DATA = P2)"
        P1P2_DataP2 = 3,
      * Sélection explicite de la broche DATA sur les ports Grove "doubles" du BitMaker V2.
      * Le DHT22 n’utilise qu’1 fil DATA.
      */
     export enum BitMakerPortData {
         //% block="P0 / P1 (DATA = P0)"
         P0P1_DataP0 = 0,
         //% block="P0 / P1 (DATA = P1)"
         P0P1_DataP1 = 1,
 
         //% block="P1 / P2 (DATA = P1)"
         P1P2_DataP1 = 2,
         //% block="P1 / P2 (DATA = P2)"
         P1P2_DataP2 = 3,
 
EOF
)
