# FokusKompis

FokusKompis är en liten webapp för korta fokuspass med barn. Den samlar timer, ritning, rörelsepauser, belöningar, barnprofil och föräldrainställningar i en app som kan köras direkt i webbläsaren.

Jag byggde projektet som ett praktiskt portfolio-projekt under min utbildning till utvecklare inom AI och maskininlärning. Målet var att bygga något jag kan använda hemma med min dotter när hon är rastlös eller behöver komma in i ett kort fokuspass.

## Demo

- Repo: https://github.com/Ibrahimorfali/fokuskompis
- Live-demo efter att GitHub Pages är aktiverat: https://ibrahimorfali.github.io/fokuskompis/
- Appen kan också köras genom att öppna `index.html` lokalt.

## Varför jag byggde den

Jag ville träna på att bygga något som är användbart i vardagen, inte bara en teknisk demo. FokusKompis är i första hand tänkt för barn som behöver hjälp att komma igång, ta en paus eller byta aktivitet på ett lugnt sätt. Jag som förälder finns med i bakgrunden, till exempel för att starta ett pass, välja längd eller anpassa övningarna.

Det gör också projektet relevant för min AI/ML-utbildning. Jag har byggt appen runt övningar, lokalt sparad data och ett regelbaserat förslagssystem, så att en AI-funktion skulle kunna kopplas på senare utan att hela appen behöver göras om.

## Skärmbilder

![FokusKompis desktop](screenshot-desktop.png)

![FokusKompis mobil](screenshot-mobile.png)

## Funktioner

- Timer för korta fokuspass.
- Rityta där barnet kan rita direkt i appen.
- Rörelse- och pausaktiviteter som kan varieras.
- Barnprofil, tema och enkla belöningar.
- Föräldraläge med PIN, passlängd, ljud och aktivitetstyper.
- Enkel aktivitetsbank med lokalt sparade övningar.
- Regelbaserad idéverkstad där en förälder kan skapa nya övningsförslag.
- Lokal statistik och inställningar via localStorage.
- Talstöd och ljud via Web Speech API och Web Audio API.
- Responsiv layout för dator och mobil.

## Teknik

- HTML
- CSS
- JavaScript
- LocalStorage
- Canvas API
- Web Audio API
- Web Speech API
- Responsiv design

## Koppling till min utbildning

Efter första året känner jag mig mest hemma i grunderna: Python, databehandling, statistik, databaser och grundläggande maskininlärning. FokusKompis är därför byggd som ett praktiskt sidoprojekt runt en idé, inte som ett avancerat ML-projekt.

AI-delen är med som en enkel skiss på hur ett sådant flöde skulle kunna fungera längre fram. I den här versionen är generatorn regelbaserad, vilket gör appen lättare att testa och förklara. Nästa steg vore att koppla på en språkmodell i föräldraläget och se om den kan ge bättre variation i övningsförslagen.

## Kör appen

Öppna `index.html` i en modern webbläsare.

Föräldraläge: PIN `1234`.

## Vad jag lärde mig

Det här projektet gjorde mig bättre på att bygga färdigt något litet men användbart. Jag fick tänka igenom hela kedjan: starta ett pass, visa rätt aktivitet, pausa, ge en liten belöning och spara enkla inställningar lokalt i webbläsaren.

Kodmässigt fick jag träna på state i ren JavaScript, timerlogik, DOM-uppdateringar, localStorage, Canvas API, Web Audio/Web Speech och responsiv CSS. Det mest lärorika var att många små beslut påverkar helheten: vad som visas först, vad som händer när ett pass tar slut och hur mycket information som får plats på en mobilskärm.

## Nästa steg

- Testa appen mer hemma och justera texter, passlängd och aktiviteter efter vad som faktiskt fungerar.
- Bygga en enkel historikvy så man kan se tidigare pass och vilka aktiviteter som används mest.
- Koppla idéverkstaden till en språkmodell i föräldraläget och jämföra förslagen med den regelbaserade versionen.
- Se om genomförda pass kan användas för att föreslå vilka aktiviteter som passar bäst.
