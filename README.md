# FokusKompis

FokusKompis är en offline-webbapp för korta fokuspass med barn. Appen kombinerar ritning, rörelse, lugna pauser, belöningar, barnprofil och föräldrainställningar i ett enkelt gränssnitt som går att köra direkt i webbläsaren.

Jag byggde projektet som ett praktiskt portfolio-projekt under min utbildning till utvecklare inom AI och maskininlärning. Målet var att bygga något som går att använda hemma: en trygg, reklamfri app som min dotter kan använda med mitt stöd när hon är rastlös eller behöver landa i ett kort fokuspass.

## GitHub-presentation

Kort repo-beskrivning:

> Offline focus app for children with drawing, movement breaks, local rewards, parent settings and a safe AI exercise-idea prototype.

Föreslagna topics:

`javascript`, `html`, `css`, `education`, `kids`, `offline-first`, `localstorage`, `canvas`, `web-audio`, `web-speech`, `ai-prototype`

Demo:

- Repo: https://github.com/Ibrahimorfali/fokuskompis
- Live-demo efter att GitHub Pages är aktiverat: https://ibrahimorfali.github.io/fokuskompis/
- Appen kan också köras genom att öppna `index.html` lokalt.

## Varför jag byggde den

Jag ville träna på att bygga något som är användbart i vardagen, inte bara en teknisk demo. FokusKompis är i första hand tänkt för barn som behöver hjälp att komma igång, ta en paus eller byta aktivitet på ett lugnt sätt. Jag som förälder finns med i bakgrunden, till exempel för att starta ett pass, välja längd eller anpassa övningarna.

Projektet passar också mitt AI/ML-spår: nästa steg är att undersöka hur AI kan hjälpa en förälder att skapa nya barnvänliga övningar, utan konton, reklam eller onödig datainsamling.

## Skärmbilder

![FokusKompis desktop](screenshot-desktop.png)

![FokusKompis mobil](screenshot-mobile.png)

## Funktioner

- Fokuspass med timer, aktivitetssteg och paus.
- Barnprofil med namn som används i appens texter.
- Dagens mål med klistermärkesprogress.
- Tre aktivitetstyper: rita, dansa och lekbana.
- AI-idéverkstad som skapar trygga övningsförslag lokalt och lägger dem i aktivitetsbanken.
- Aktivitetsbank som visar övningar och hur ofta varje aktivitet klarats.
- Märken/achievements för första passet, klistermärken, alla aktiviteter och streak.
- Teman: djungel, hav och lekland.
- Talstöd och enkla ljudsignaler via Web Speech API och Web Audio API.
- Ritcanvas med pointer events.
- Belöningar, statistik, AI-förslag och streak sparas lokalt i webbläsaren.
- Föräldraläge med PIN, tidsinställningar, energinivå, rörelseläge, ljud och aktivitetstyper.
- Körs offline utan reklam, konton eller köp.

## Teknik

- HTML
- CSS
- JavaScript
- LocalStorage
- Canvas API
- Web Audio API
- Web Speech API
- Responsiv design

## AI-spår

Appen innehåller en lokal AI-idéverkstad i föräldraläget. Den är byggd som en säker produktprototyp: föräldern väljer fokusområde och aktivitetstyp, appen skapar barnvänliga övningsförslag och sparar dem lokalt.

I den här versionen är generatorn regelbaserad för att appen ska fungera helt offline. Tanken är att visa hur ett AI-flöde kan designas innan en riktig språkmodell kopplas in:

- inga barnkonton
- ingen extern datadelning
- korta instruktioner
- vuxen som godkänner innan övningar används
- tydlig koppling mellan behov, övning och aktivitetstyp

## Kör appen

Öppna `index.html` i en modern webbläsare.

Föräldraläge: PIN `1234`.

## Vad jag lärde mig

Det här projektet gjorde mig bättre på att bygga färdigt något litet men användbart. Jag fick tänka igenom hela kedjan: starta ett pass, visa rätt aktivitet, pausa, ge en liten belöning och spara enkla inställningar lokalt i webbläsaren.

Kodmässigt fick jag träna på state i ren JavaScript, timerlogik, DOM-uppdateringar, localStorage, Canvas API, Web Audio/Web Speech och responsiv CSS. Jag märkte också att mobilvyn tog mer tid än jag först trodde, eftersom text, knappar och aktivitetsytor snabbt känns trånga när appen ska användas bredvid ett barn.

## Nästa steg

- Aktivera GitHub Pages så appen går att testa direkt från repot.
- Testa appen mer hemma och justera texter, passlängd och aktiviteter efter vad som faktiskt fungerar.
- Bygga en enkel historikvy så man kan se tidigare pass och vilka aktiviteter som används mest.
- Göra AI-idéverkstaden mer riktig, till exempel genom att koppla den till en språkmodell i föräldraläget och låta föräldern godkänna förslag innan de sparas.
