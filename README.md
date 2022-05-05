# Ticket manager

## Műkődés
Nevével ellentétben ez nem egy ticketeket kezelő rendszer, hanem egy wrapper alkalmazás, ami a **youtrack** és **redmine** oldalakon kezelt ticketeket figyeli.

Fő működési elve, hogy munka közben ha -helyesen- állítgatjuk a ticketek státuszát, akkor egy lokális json fájlban annak száma elmentődik egy kezdési dátummal, illetve ha a felhasználó befejezte a feladatát, akkor egy felfelé kerekített óraszámmal.
A nap végén, így már nem kell egyesével visszakeresgélni a megoldott ticketeket, illetve kiszámolni hogy mennyi időbe telt, hanem az Arpy megnyitására automatikusan beíródnak, feladatonként. Ezáltal a felhasználónak elég csupán átnéznie az entry-ket és a végén a "Mentés" gombra nyomni.

## Felépítés
Egy **electron** alkalmazás végzi a perzisztenciát, valamit futtatja a **React** frontendet, ami a megjelenítést végzi, illetve a kommunikáció összekapcsolását az electron és az iframe-ek között. Az oldalak **iframe**-ben töltődnek be, amelyek közül mindegyikhez íródott böngészős bővítmény, hogy a program megfelelően tudjon működni.
Ezeket a bővítményeket a böngészőbe is be lehet húzni, viszont a mentési lehetőség nélkül nem fog működni az Arpy automatikus töltése.

Bővítmények helye: `src/frontend/scripts/{oldal}`

## Szükséges csomagok az elindításhoz:
- nvm
- node (legalább 14)

## Elindítás menete
1. A ticket-manager mappában ki kell adni ezt a parancsot: `$ nvm install` ezzel beállítódik a megfelelő node verzió
2. Ugyanitt: `$ npm install` ami letölti a szükséges csomagokat
3. Végül `$ npm start`-tal elindul az alkalmazás

## Buildelés
A ticket-manager mappában kiadott `$ npm run make` paranccsal lehet megbuildelni a teljes alkalmazást. A kimeneti fájlok az **out** mappába fognak kerülni.
Fontos, hogy olyan verzió fog buildelődni, amilyen operációs rendszerünk van. Tehát például Linux-on build-elve Linux fájlokat fog kiadni.

## Helyes státuszállítások
### Youtrack
#### Kezdő státuszok
- Develop
- Review
- Functional Test
- In Progress
#### Záró státuszok
- Develop Done
- Review Done
- Waiting for Functional Test
- Waiting for Packaging
- Done (Released)
- To Verify

### Redmine
#### Kezdő státuszok
- minden ami nem záró státusz
#### Záró státuszok
- Resolved
- Closed
- Rejected

## Ismert hibák/kényelmetlenségek
- Csak a mai napot tölti ki, visszafelé nem működik
- Nem lehet szüneteltetni a számolást
- Egy feladatot nem lehet újrakezdeni ugyanazon a napon
