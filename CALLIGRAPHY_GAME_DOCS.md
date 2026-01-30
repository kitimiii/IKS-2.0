# Kalligraphie Quiz Game - Dokumentation

## Übersicht
Das Kalligraphie Quiz Game ist ein interaktives Spiel, bei dem Benutzer 7 Schriften auswählen müssen, die zur traditionellen Kalligraphie gehören.

## Komponente: CalligraphyGame

### Anpassbare Props

#### 1. **instructionText** (String)
- **Standard**: `"Markiere alle Wörter die man zur Kalligraphie unterordnet"`
- **Beschreibung**: Der Instruktionstext, der oben mittig angezeigt wird
- **Beispiel**:
```jsx
<CalligraphyGame instructionText="Wähle die richtigen Kalligraphie-Stile aus" />
```

#### 2. **requiredSelections** (Number)
- **Standard**: `7`
- **Beschreibung**: Anzahl der erforderlichen Auswahlen vor dem Submit
- **Beispiel**:
```jsx
<CalligraphyGame requiredSelections={5} />
```

#### 3. **submitButtonPosition** (Object)
- **Standard**: `{ left: '50%', transform: 'translateX(-50%)' }`
- **Beschreibung**: CSS-Positionierung des Submit-Buttons
- **Beispiel**:
```jsx
<CalligraphyGame 
  submitButtonPosition={{ 
    left: '40%', 
    transform: 'translateX(-50%)' 
  }} 
/>
```

#### 4. **correctOpacity** (Number)
- **Standard**: `0.3`
- **Beschreibung**: Transparenz der grünen Overlay-Farbe für richtige Antworten (0-1)
- **Beispiel**:
```jsx
<CalligraphyGame correctOpacity={0.5} />
```

#### 5. **incorrectOpacity** (Number)
- **Standard**: `0.3`
- **Beschreibung**: Transparenz der roten Overlay-Farbe für falsche Antworten (0-1)
- **Beispiel**:
```jsx
<CalligraphyGame incorrectOpacity={0.4} />
```

#### 6. **infoTooltipDelay** (Number)
- **Standard**: `5000` (5 Sekunden)
- **Beschreibung**: Zeit in Millisekunden, bis Tooltips automatisch verschwinden
- **Beispiel**:
```jsx
<CalligraphyGame infoTooltipDelay={3000} />
```

#### 7. **infoTooltipText** (String)
- **Standard**: `"Dieses Wort gehört nicht zur traditionellen Kalligraphie, da es sich um moderne digitale Schrift handelt."`
- **Beschreibung**: Platzhalter-Text für Info-Tooltips bei falschen Antworten
- **Beispiel**:
```jsx
<CalligraphyGame 
  infoTooltipText="Dies ist keine traditionelle Kalligraphie." 
/>
```

## Spielablauf

### 1. Auswahlphase
- Benutzer klickt auf Bilder, um sie auszuwählen
- Counter zeigt `X/7` (z.B. `3/7`)
- Ausgewählte Bilder bekommen einen dunklen Border (#61554B)
- Maximal 7 Auswahlen möglich

### 2. Submit-Button Zustände

#### Inaktiv (0-6 Auswahlen)
- **Hintergrund**: `#F9EBD5`
- **Border & Text**: `#61554B`
- **Verhalten**: Nicht klickbar, zeigt Warnung bei Klick
- **Warnung**: "Bitte wähle zuvor 7 Schriften aus" (verschwindet nach 5 Sek.)

#### Aktiv (7 Auswahlen)
- **Hintergrund**: Transparent
- **Border & Text**: `#B45124`
- **Verhalten**: Klickbar, löst Ergebnis-Anzeige aus

### 3. Ergebnis-Anzeige
Nach dem Submit werden die Ergebnisse angezeigt:

#### Richtige Auswahlen (arabic.yes.png)
- **Grüner Border**: `#4CAF50`
- **Grünes Overlay**: Mit einstellbarer Transparenz
- **Kein Info-Icon**

#### Falsche Auswahlen (kalli.not.png)
- **Roter Border**: `#F44336`
- **Rotes Overlay**: Mit einstellbarer Transparenz
- **Info-Icon**: Kleiner dunkler Kreis mit "i" in der linken unteren Ecke
- **Tooltip**: Erscheint beim Klick auf das Info-Icon

## Farbschema

| Element | Farbe | Hex-Code |
|---------|-------|----------|
| Hintergrund | Beige | #F9EBD5 |
| Haupttext | Dunkelbraun | #61554B |
| Aktiver Button | Orange-Braun | #B45124 |
| Richtig | Grün | #4CAF50 |
| Falsch | Rot | #F44336 |

## CSS-Anpassungen

Die Komponente verwendet `CalligraphyGame.css`. Wichtige Klassen:

- `.calligraphy-game` - Haupt-Container
- `.game-instruction` - Instruktionstext
- `.counter-box` - Counter-Container
- `.game-grid` - Grid-Layout (5 Spalten)
- `.game-item` - Einzelnes Bild-Element
- `.submit-button` - Submit-Button
- `.info-icon` - Info-Icon
- `.info-tooltip` - Tooltip-Box

## Responsive Design

Das Grid passt sich automatisch an:
- **Desktop (>1200px)**: 5 Spalten
- **Tablet (900-1200px)**: 4 Spalten
- **Mobile (600-900px)**: 3 Spalten
- **Klein (<600px)**: 2 Spalten

## Verwendung in App.jsx

```jsx
import CalligraphyGame from './components/CalligraphyGame';

// In der Puzzle-Seite:
case 'Puzzle':
  return (
    <PageWrapper pageHint="" showHint={false}>
      <CalligraphyGame />
    </PageWrapper>
  );
```

## Zukünftige Erweiterungen

Um verschiedene Tooltips für verschiedene falsche Antworten zu haben, müsste man das `gameItems` Array erweitern:

```jsx
const gameItems = [
  { 
    id: 1, 
    image: arabicYes, 
    isCorrect: true 
  },
  { 
    id: 2, 
    image: kalliNot, 
    isCorrect: false,
    tooltipText: "Spezifischer Text für dieses Bild"
  },
  // ...
];
```

Dann in der Komponente:
```jsx
{hoveredInfoId === item.id && (
  <div className="info-tooltip">
    {item.tooltipText || infoTooltipText}
  </div>
)}
```
