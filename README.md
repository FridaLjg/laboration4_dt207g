# Laboration 4 - DT207G
Detta repository innehåller kod för en REST-webbtjänst skapad med Node.js, Express, MongoDB och Mongoose för hantering av användarkonton och autentisering med JWT (JSON Web Token).

## Av: Frida Ljungberg, 2026

## Länk
API:et är tillgängligt på följande adress vid lokal körning: 
http://localhost:3001

## Installation, databas
APIet använder databasen MongoDB tillsammans med Mongoose.
Klona ner källkodsfilerna, kör kommando npm install för att installeranödvändiga npm-paket. Kör installations-skriptet install.js. 

Databasen har följande schema:
- username (String, obligatoriskt, unikt)
- password (String, obligatoriskt)

## Funktionalitet
- Registrera användarkonto
- Logga in med användarkonto
- Generering av JWT-token vid inloggning
- Skyddade routes som kräver giltig JWT
- Validering av användaruppgifter

## Användning
|Metod  |Endpoint     |Beskrivning                                                                           |
|-------|-------------|--------------------------------------------------------------------------------------|
|POST   |/api/register   |Skapar ett nytt konto               |
|POST   |/api/login |Loggar in en användare och retunerar JWT|
|GET |/api/protected |Skyddad route som kräver giltig JWT

Exempel på regristrering:
```
{
    "username": "Frida",
    "password": "password"
}
```