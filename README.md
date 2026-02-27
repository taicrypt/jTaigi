# jTaigi

javascript ê Tâi-gí ke-si-thâu

A toolkit for converting between Taiwanese romanization systems (POJ Pe̍h-ōe-jī ↔ TL Tâi-Lô), with support for tone-mark and numeric representations.

* pojSou2tlSoo(pojs, nasal)
	* 白話字數字式 => 台羅數字式
* tlSoo2pojSou(tls, nasal)
	* 台羅數字式 => 白話字數字式
* Tiau2Soo(tiau, nasal, u14)
	* (台羅|白話字)調符式 => (台羅|白話字)數字式
* pojSou2Tiau(pojSou)
	* 白話字數字式 => 白話字調符式
* tlSoo2Tiau(soo)
	* 台羅數字式 => 台羅調符式

## Installation

```bash
npm install jtaigi
```

Or download `taigi.js` and include it directly.

## Usage

### Browser (`<script>` tag)

```html
<script src="taigi.js"></script>
<script>
  // All exports are available as globals
  var result = TAIGI.tsuan('lâng', 'poj', 'sou', 'nn', false);
  console.log(result); // "lang5"

  var tl = pojSou2tlSoo('chhiu2');
  console.log(tl); // "tshiu2"
</script>
```

### Node.js (CommonJS)

```js
const { TAIGI, pojSou2tlSoo, tlSoo2pojSou, pojSou2Tiau, tlSoo2Tiau, Tiau2Soo, tsuan } = require('jtaigi');

pojSou2tlSoo('chhiu2');      // "tshiu2"
tlSoo2pojSou('tshiu2');      // "chhiu2"
pojSou2Tiau('lang5');        // "lâng"
tlSoo2Tiau('lang5');         // "lâng"
Tiau2Soo('lâng', 'nn', false, false); // "lang5"

// High-level conversion pipeline
tsuan('lâng', 'poj', 'sou', 'nn', false); // "lang5"
```

### ES Modules

```js
import { TAIGI, pojSou2tlSoo, tsuan } from 'jtaigi';

pojSou2tlSoo('goeh8'); // "gueh8"
```

### AMD (RequireJS)

```js
require(['taigi'], function (api) {
  api.pojSou2tlSoo('chhiu2'); // "tshiu2"
});
```

## API

### `tsuan(input, system, toneStyle, nasalForm, explicit14)`

High-level conversion pipeline. Converts romanized Tâi-gí text between systems and representations.

| Parameter | Type | Description |
|---|---|---|
| `input` | `string` | Input text (tone-marked or numeric) |
| `system` | `string` | Target system: `"poj"` or `"tl"` |
| `toneStyle` | `string` | `"hu"` (tone marks), `"sou"` (numbers), `"bo"` (strip tones) |
| `nasalForm` | `string` | Nasal marker: `"N"`, `"nn"`, or `"ⁿ"` |
| `explicit14` | `boolean` | If `true`, output explicit tone 1/4 digits |

```js
tsuan('lâng', 'tl',  'sou', 'nn', false); // "lang5"   — TL numeric
tsuan('lâng', 'poj', 'hu',  'nn', false); // "lâng"    — POJ tone-marked
tsuan('lâng', 'tl',  'bo',  'nn', false); // "lang"    — strip tones
tsuan('lâng', 'tl',  'sou', 'nn', true);  // "lang5"   — with explicit 1/4
```

Also available as `TAIGI.tsuan(...)`.

### `pojSou2tlSoo(pojStr, nasalForm)`

白話字數字式 → 台羅數字式 (POJ numeric → TL numeric)

```js
pojSou2tlSoo('chhiu2'); // "tshiu2"
pojSou2tlSoo('goeh8');  // "gueh8"
```

### `tlSoo2pojSou(tlStr, nasalForm)`

台羅數字式 → 白話字數字式 (TL numeric → POJ numeric)

```js
tlSoo2pojSou('tshiu2'); // "chhiu2"
tlSoo2pojSou('gueh8');  // "goeh8"
```

### `pojSou2Tiau(pojSou)`

白話字數字式 → 白話字調符式 (POJ numeric → POJ tone-marked)

```js
pojSou2Tiau('lang5'); // "lâng"
```

### `tlSoo2Tiau(tlSoo)`

台羅數字式 → 台羅調符式 (TL numeric → TL tone-marked)

```js
tlSoo2Tiau('lang5'); // "lâng"
```

### `Tiau2Soo(tiauStr, nasalForm, explicit14, isPOJ)`

(台羅|白話字)調符式 → (台羅|白話字)數字式 (Tone-marked → Numeric)

| Parameter | Type | Description |
|---|---|---|
| `tiauStr` | `string` | Tone-marked input |
| `nasalForm` | `string` | `"N"`, `"nn"`, or `"ⁿ"` |
| `explicit14` | `boolean` | Output explicit tone 1/4 digits |
| `isPOJ` | `boolean` | `true` for POJ, `false` for TL |

```js
Tiau2Soo('lâng', 'nn', false, false); // "lang5"
```

### `uannNasal(str, form)`

Normalise nasal markers to a chosen form (`"N"`, `"nn"`, or `"ⁿ"`).

### `TAIGI` namespace

The `TAIGI` object bundles all mapping tables and the `tsuan` function:

- `TAIGI.S2T` — numeric → tone-mark mappings
- `TAIGI.T2S` — tone-mark → numeric mappings
- `TAIGI.POJ2TL` — POJ → TL conversion rules
- `TAIGI.TL2POJ` — TL → POJ conversion rules
- `TAIGI.tsuan(...)` — high-level conversion pipeline

## Background

```
sonority a > oo > e = o > i = u〈低元音 > 高元音 > 無擦通音 > 擦音 > 塞音)
tone priority: o > a > e > u > i
syllable := initial + nucleus + coda + tone
```

## Testing

```bash
npm test
```

## License

ISC
