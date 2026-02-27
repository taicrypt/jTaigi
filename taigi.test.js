const {
  TAIGI,
  thuiUann,
  uannNasal,
  pojSou2tlSoo,
  tlSoo2pojSou,
  Tiau2Soo,
  pojSou2Tiau,
  tlSoo2Tiau,
} = require('./taigi');

// ---------------------------------------------------------------------------
// Helper: thuiUann
// ---------------------------------------------------------------------------
describe('thuiUann – generic regex replacement', () => {
  test('single replacement', () => {
    expect(thuiUann('abc', { b: 'x' })).toBe('axc');
  });

  test('multiple replacements applied in order', () => {
    expect(thuiUann('aabb', { aa: 'X', bb: 'Y' })).toBe('XY');
  });

  test('no match leaves string unchanged', () => {
    expect(thuiUann('hello', { xyz: '!' })).toBe('hello');
  });

  test('global replacement within same key', () => {
    expect(thuiUann('abab', { a: 'z' })).toBe('zbzb');
  });
});

// ---------------------------------------------------------------------------
// String.prototype.thuiUann (method augmentation)
// ---------------------------------------------------------------------------
describe('String.prototype.thuiUann', () => {
  test('works as instance method', () => {
    expect('abc'.thuiUann({ b: 'x' })).toBe('axc');
  });
});

// ---------------------------------------------------------------------------
// S2T mapping – numeric to tone-mark (single vowel spot checks)
// ---------------------------------------------------------------------------
describe('TAIGI.S2T – number-to-tone mapping', () => {
  test.each([
    ['a2', 'á'], ['A2', 'Á'],
    ['a5', 'â'], ['A5', 'Â'],
    ['a7', 'ā'], ['A7', 'Ā'],
    ['e3', 'è'], ['E3', 'È'],
    ['i5', 'î'], ['I5', 'Î'],
    ['o2', 'ó'], ['O2', 'Ó'],
    ['u7', 'ū'], ['U7', 'Ū'],
    ['o͘5', 'ô͘'], ['O͘5', 'Ô͘'],
    ['m2', 'ḿ'], ['ng7', 'n̄g'],
  ])('S2T[%s] === %s', (key, expected) => {
    expect(TAIGI.S2T[key]).toBe(expected);
  });
});

// ---------------------------------------------------------------------------
// T2S mapping – tone-mark to numeric (inverse spot checks)
// ---------------------------------------------------------------------------
describe('TAIGI.T2S – tone-to-number mapping', () => {
  test.each([
    ['á', 'a2'], ['Á', 'A2'],
    ['â', 'a5'], ['Â', 'A5'],
    ['ā', 'a7'], ['Ā', 'A7'],
    ['è', 'e3'], ['È', 'E3'],
    ['î', 'i5'], ['Î', 'I5'],
    ['ó', 'o2'], ['Ó', 'O2'],
    ['ū', 'u7'], ['Ū', 'U7'],
    ['ḿ', 'm2'], ['n̄g', 'ng7'],
  ])('T2S[%s] === %s', (key, expected) => {
    expect(TAIGI.T2S[key]).toBe(expected);
  });
});

// ---------------------------------------------------------------------------
// uannNasal – nasal form conversion
// ---------------------------------------------------------------------------
describe('uannNasal', () => {
  test('converts to N form', () => {
    const result = uannNasal('ann3', 'N');
    expect(result).toBe('aN3');
  });

  test('converts to nn form', () => {
    const result = uannNasal('aN3', 'nn');
    expect(result).toBe('ann3');
  });

  test('converts to ⁿ form', () => {
    const result = uannNasal('ann3', 'ⁿ');
    expect(result).toBe('aⁿ3');
  });

  test('defaults to nn form when nasal is unspecified', () => {
    const result = uannNasal('aN3');
    expect(result).toBe('ann3');
  });
});

// ---------------------------------------------------------------------------
// pojSou2tlSoo – POJ numeric → TL numeric
// ---------------------------------------------------------------------------
describe('pojSou2tlSoo – POJ numeric to TL numeric', () => {
  test('ch → ts', () => {
    expect(pojSou2tlSoo('cha1')).toContain('tsa');
  });

  test('ou → oo (POJ oo)', () => {
    expect(pojSou2tlSoo('hou2')).toBe('hoo2');
  });

  test('oa → ua', () => {
    expect(pojSou2tlSoo('koa1')).toBe('kua1');
  });

  test('oe → ue', () => {
    expect(pojSou2tlSoo('hoe1')).toBe('hue1');
  });

  test('eng → ing', () => {
    expect(pojSou2tlSoo('seng1')).toBe('sing1');
  });

  test('ek → ik', () => {
    expect(pojSou2tlSoo('tek4')).toBe('tik4');
  });

  test('chh → tsh', () => {
    // chh -> first ch->ts then remaining h stays
    expect(pojSou2tlSoo('chha3')).toBe('tsha3');
  });
});

// ---------------------------------------------------------------------------
// tlSoo2pojSou – TL numeric → POJ numeric
// ---------------------------------------------------------------------------
describe('tlSoo2pojSou – TL numeric to POJ numeric', () => {
  test('ts → ch', () => {
    expect(tlSoo2pojSou('tsa1')).toBe('cha1');
  });

  test('oo → ou', () => {
    expect(tlSoo2pojSou('hoo2')).toBe('hou2');
  });

  test('ua → oa', () => {
    expect(tlSoo2pojSou('kua1')).toBe('koa1');
  });

  test('ue → oe', () => {
    expect(tlSoo2pojSou('hue1')).toBe('hoe1');
  });

  test('ing → eng', () => {
    expect(tlSoo2pojSou('sing1')).toBe('seng1');
  });

  test('ik → ek', () => {
    expect(tlSoo2pojSou('tik4')).toBe('tek4');
  });
});

// ---------------------------------------------------------------------------
// pojSou2Tiau – POJ numeric → POJ tone-marked
// ---------------------------------------------------------------------------
describe('pojSou2Tiau – POJ numeric to POJ tone-marked', () => {
  test('simple vowel tone 2', () => {
    expect(pojSou2Tiau('a2')).toBe('á');
  });

  test('simple vowel tone 5', () => {
    expect(pojSou2Tiau('a5')).toBe('â');
  });

  test('syllable with initial + tone', () => {
    expect(pojSou2Tiau('ka3')).toBe('kà');
  });

  test('syllable with coda', () => {
    expect(pojSou2Tiau('lang2')).toBe('láng');
  });

  test('diphthong – tone on first a', () => {
    // POJ tone placement for ai: tone goes on a
    expect(pojSou2Tiau('ai5')).toBe('âi');
  });

  test('ou → o͘ conversion', () => {
    // POJ numeric oo/ou becomes o͘, then tone added
    expect(pojSou2Tiau('ou5')).toBe('ô͘');
  });

  test('tone 7 macron', () => {
    expect(pojSou2Tiau('a7')).toBe('ā');
  });
});

// ---------------------------------------------------------------------------
// tlSoo2Tiau – TL numeric → TL tone-marked
// ---------------------------------------------------------------------------
describe('tlSoo2Tiau – TL numeric to TL tone-marked', () => {
  test('simple vowel tone 2', () => {
    expect(tlSoo2Tiau('a2')).toBe('á');
  });

  test('simple vowel tone 5', () => {
    expect(tlSoo2Tiau('a5')).toBe('â');
  });

  test('syllable with initial', () => {
    expect(tlSoo2Tiau('ka3')).toBe('kà');
  });

  test('tone 7 macron', () => {
    expect(tlSoo2Tiau('a7')).toBe('ā');
  });

  test('oo in TL tone placement', () => {
    // In TL, oo splits: o5o → ôo (TL uses oo, not o͘)
    expect(tlSoo2Tiau('oo5')).toBe('ôo');
  });

  test('syllable with coda', () => {
    expect(tlSoo2Tiau('lang2')).toBe('láng');
  });
});

// ---------------------------------------------------------------------------
// Tiau2Soo – tone-marked → numeric
// ---------------------------------------------------------------------------
describe('Tiau2Soo – tone-marked to numeric', () => {
  test('TL tone-marked to numeric', () => {
    const result = Tiau2Soo('á', 'nn', false, false);
    expect(result).toBe('a2');
  });

  test('circumflex (tone 5)', () => {
    const result = Tiau2Soo('â', 'nn', false, false);
    expect(result).toBe('a5');
  });

  test('macron (tone 7)', () => {
    const result = Tiau2Soo('ā', 'nn', false, false);
    expect(result).toBe('a7');
  });

  test('grave (tone 3)', () => {
    const result = Tiau2Soo('à', 'nn', false, false);
    expect(result).toBe('a3');
  });

  test('POJ mode with o͘', () => {
    const result = Tiau2Soo('ô͘', 'nn', false, true);
    expect(result).toBe('ou5');
  });

  test('with u14 adds tones 1/4', () => {
    const result = Tiau2Soo('a', 'nn', true, false);
    expect(result).toBe('a1');
  });
});

// ---------------------------------------------------------------------------
// TAIGI.tsuan – full conversion pipeline
// ---------------------------------------------------------------------------
describe('TAIGI.tsuan – full conversion', () => {
  describe('to TL tone-marked (hu)', () => {
    test('basic syllable', () => {
      const result = TAIGI.tsuan('á', 'tl', 'hu', 'nn', false);
      expect(result).toBe('á');
    });
  });

  describe('to TL numeric (sou)', () => {
    test('basic syllable', () => {
      const result = TAIGI.tsuan('á', 'tl', 'sou', 'nn', false);
      expect(result).toBe('a2');
    });
  });

  describe('to POJ tone-marked (hu)', () => {
    test('basic syllable', () => {
      const result = TAIGI.tsuan('á', 'poj', 'hu', 'nn', false);
      expect(result).toBe('á');
    });
  });

  describe('to POJ numeric (sou)', () => {
    test('basic syllable', () => {
      const result = TAIGI.tsuan('á', 'poj', 'sou', 'nn', false);
      expect(result).toBe('a2');
    });
  });

  describe('strip tone (bo)', () => {
    test('removes tone number', () => {
      const result = TAIGI.tsuan('á', 'tl', 'bo', 'nn', false);
      expect(result).toBe('a');
    });
  });
});

// ---------------------------------------------------------------------------
// POJ ↔ TL roundtrip consistency
// ---------------------------------------------------------------------------
describe('roundtrip consistency', () => {
  const syllables = [
    'a2', 'ka3', 'lang5', 'hoe1', 'seng7',
  ];

  test.each(syllables)(
    'POJ→TL→POJ roundtrip for "%s"',
    (pojInput) => {
      const tl = pojSou2tlSoo(pojInput);
      const backToPoj = tlSoo2pojSou(tl);
      expect(backToPoj).toBe(pojInput);
    }
  );
});

// ---------------------------------------------------------------------------
// Mapping table completeness sanity
// ---------------------------------------------------------------------------
describe('mapping tables sanity', () => {
  test('S2T has entries for all 5 basic vowels × 9 tones (lowercase)', () => {
    const vowels = ['a', 'e', 'i', 'o', 'u'];
    const tones = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
    for (const v of vowels) {
      for (const t of tones) {
        expect(TAIGI.S2T).toHaveProperty(`${v}${t}`);
      }
    }
  });

  test('S2T has entries for o͘ tones 1-9', () => {
    for (let t = 1; t <= 9; t++) {
      expect(TAIGI.S2T).toHaveProperty(`o͘${t}`);
    }
  });

  test('S2T has entries for m tones', () => {
    const mTones = ['m1', 'm2', 'm3', 'mh4', 'm5', 'm6', 'm7', 'mh8', 'm9'];
    for (const key of mTones) {
      expect(TAIGI.S2T).toHaveProperty(key);
    }
  });

  test('S2T has entries for ng tones', () => {
    const ngTones = ['ng1', 'ng2', 'ng3', 'ngh4', 'ng5', 'ng6', 'ng7', 'ngh8', 'ng9'];
    for (const key of ngTones) {
      expect(TAIGI.S2T).toHaveProperty(key);
    }
  });

  test('POJ2TL and TL2POJ have matching keys', () => {
    // Every POJ→TL key should have an inverse in TL→POJ (at least for core pairs)
    expect(TAIGI.POJ2TL).toHaveProperty('ch');
    expect(TAIGI.TL2POJ).toHaveProperty('ts');
    expect(TAIGI.POJ2TL).toHaveProperty('ou');
    expect(TAIGI.TL2POJ).toHaveProperty('oo');
  });
});

// ---------------------------------------------------------------------------
// Edge cases
// ---------------------------------------------------------------------------
describe('edge cases', () => {
  test('empty string passes through', () => {
    expect(thuiUann('', { a: 'b' })).toBe('');
  });

  test('uppercase POJ conversions', () => {
    expect(pojSou2tlSoo('Cha1')).toContain('Tsa');
  });

  test('uppercase TL conversions', () => {
    expect(tlSoo2pojSou('Tsa1')).toContain('Cha');
  });

  test('tone 1 and 4 are unmarked', () => {
    expect(TAIGI.S2T['a1']).toBe('a');
    expect(TAIGI.S2T['a4']).toBe('a');
  });
});
