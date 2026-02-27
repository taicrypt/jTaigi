/**
 * jTaigi — Tâi-gí romanization conversion toolkit.
 *
 * UMD bundle: works in browsers (<script>, AMD) and Node.js (CommonJS).
 * Uses only ES5 features for maximum browser compatibility.
 */
;(function (root, factory) {
	"use strict";
	if (typeof define === "function" && define.amd) {
		define([], factory);
	} else if (typeof module === "object" && module.exports) {
		module.exports = factory();
	} else {
		var api = factory();
		for (var key in api) {
			if (api.hasOwnProperty(key)) {
				root[key] = api[key];
			}
		}
	}
})(typeof self !== "undefined" ? self : this, function () {
	"use strict";

	function thuiUann(str, replacements) {
		for (var pattern in replacements) {
			if (replacements.hasOwnProperty(pattern)) {
				var re = new RegExp(pattern, "g");
				str = str.replace(re, replacements[pattern]);
			}
		}
		return str;
	}

	var S2T = {
		"a1": "a",
		"A1": "A",
		"a2": "á",
		"A2": "Á",
		"a3": "à",
		"A3": "À",
		"a4": "a",
		"A4": "A",
		"a5": "â",
		"A5": "Â",
		"a6": "ǎ",
		"A6": "Ǎ",
		"a7": "ā",
		"A7": "Ā",
		"a8": "a̍",
		"A8": "A̍",
		"a9": "ă",
		"A9": "Ă",
		"e1": "e",
		"E1": "E",
		"e2": "é",
		"E2": "É",
		"e3": "è",
		"E3": "È",
		"e4": "e",
		"E4": "E",
		"e5": "ê",
		"E5": "Ê",
		"e6": "ě",
		"E6": "Ě",
		"e7": "ē",
		"E7": "Ē",
		"e8": "e̍",
		"E8": "E̍",
		"e9": "ĕ",
		"E9": "Ĕ",
		"i1": "i",
		"I1": "I",
		"i2": "í",
		"I2": "Í",
		"i3": "ì",
		"I3": "Ì",
		"i4": "i",
		"I4": "I",
		"i5": "î",
		"I5": "Î",
		"i6": "ǐ",
		"I6": "Ǐ",
		"i7": "ī",
		"I7": "Ī",
		"i8": "i̍",
		"I8": "I̍",
		"i9": "ĭ",
		"I9": "Ĭ",
		"o͘1": "o͘",
		"O͘1": "O͘",
		"o͘2": "ó͘",
		"O͘2": "Ó͘",
		"o͘3": "ò͘",
		"O͘3": "Ò͘",
		"o͘4": "o͘",
		"O͘4": "O͘",
		"o͘5": "ô͘",
		"O͘5": "Ô͘",
		"o͘6": "ǒ͘",
		"O͘6": "Ǒ͘",
		"o͘7": "ō͘",
		"O͘7": "Ō͘",
		"o͘8": "o̍͘",
		"O͘8": "O̍͘",
		"o͘9": "ŏ͘",
		"O͘9": "Ŏ͘",
		"o1": "o",
		"O1": "O",
		"o2": "ó",
		"O2": "Ó",
		"o3": "ò",
		"O3": "Ò",
		"o4": "o",
		"O4": "O",
		"o5": "ô",
		"O5": "Ô",
		"o6": "ǒ",
		"O6": "Ǒ",
		"o7": "ō",
		"O7": "Ō",
		"o8": "o̍",
		"O8": "O̍",
		"o9": "ŏ",
		"O9": "Ŏ",
		"u1": "u",
		"U1": "U",
		"u2": "ú",
		"U2": "Ú",
		"u3": "ù",
		"U3": "Ù",
		"u4": "u",
		"U4": "U",
		"u5": "û",
		"U5": "Û",
		"u6": "ǔ",
		"U6": "Ǔ",
		"u7": "ū",
		"U7": "Ū",
		"u8": "u̍",
		"U8": "U̍",
		"u9": "ŭ",
		"U9": "Ŭ",
		"m1": "m",
		"M1": "M",
		"m2": "ḿ",
		"M2": "Ḿ",
		"m3": "m̀",
		"M3": "M̀",
		"mh4": "mh",
		"Mh4": "Mh",
		"m5": "m̂",
		"M5": "M̂",
		"m6": "m̌",
		"M6": "M̌",
		"m7": "m̄",
		"M7": "M̄",
		"mh8": "m̍h",
		"Mh8": "M̍h",
		"m9": "m̆",
		"M9": "M̆",
		"ng1": "ng",
		"Ng1": "Ng",
		"ng2": "ńg",
		"Ng2": "Ńg",
		"ng3": "ǹg",
		"Ng3": "Ǹg",
		"ngh4": "ngh",
		"Ngh4": "Ngh",
		"ng5": "n̂g",
		"Ng5": "N̂g",
		"ng6": "ňg",
		"Ng6": "Ňg",
		"ng7": "n̄g",
		"Ng7": "N̄g",
		"ngh8": "n̍gh",
		"Ngh8": "N̍gh",
		"ng9": "n̆g",
		"Ng9": "N̆g",
		"U0358": {
			"oo": "o͘",
			"ou": "o͘",
			"Oo": "O͘",
			"Ou": "O͘"
		}
	};
	S2T.U0358 = {
		"oo": "o͘",
		"ou": "o͘",
		"Oo": "O͘",
		"Ou": "O͘"
	};

	var T2S = {
		"á": "a2",
		"Á": "A2",
		"à": "a3",
		"À": "A3",
		"â": "a5",
		"Â": "A5",
		"ǎ": "a6",
		"Ǎ": "A6",
		"ā": "a7",
		"Ā": "A7",
		"a̍": "a8",
		"A̍": "A8",
		"ă": "a9",
		"Ă": "A9",
		"é": "e2",
		"É": "E2",
		"è": "e3",
		"È": "E3",
		"ê": "e5",
		"Ê": "E5",
		"ě": "e6",
		"Ě": "E6",
		"ē": "e7",
		"Ē": "E7",
		"e̍": "e8",
		"E̍": "E8",
		"ĕ": "e9",
		"Ĕ": "E9",
		"í": "i2",
		"Í": "I2",
		"ì": "i3",
		"Ì": "I3",
		"î": "i5",
		"Î": "I5",
		"ǐ": "i6",
		"Ǐ": "I6",
		"ī": "i7",
		"Ī": "I7",
		"i̍": "i8",
		"I̍": "I8",
		"ĭ": "i9",
		"Ĭ": "I9",
		"ó͘": "o͘2",
		"Ó͘": "O͘2",
		"ò͘": "o͘3",
		"Ò͘": "O͘3",
		"ô͘": "o͘5",
		"Ô͘": "O͘5",
		"ǒ͘": "o͘6",
		"Ǒ͘": "O͘6",
		"ō͘": "o͘7",
		"Ō͘": "O͘7",
		"o̍͘": "o͘8",
		"O̍͘": "O͘8",
		"ŏ͘": "o͘9",
		"Ŏ͘": "O͘9",
		"ó": "o2",
		"Ó": "O2",
		"ò": "o3",
		"Ò": "O3",
		"ô": "o5",
		"Ô": "O5",
		"ǒ": "o6",
		"Ǒ": "O6",
		"ō": "o7",
		"Ō": "O7",
		"o̍": "o8",
		"O̍": "O8",
		"ŏ": "o9",
		"Ŏ": "O9",
		"ú": "u2",
		"Ú": "U2",
		"ù": "u3",
		"Ù": "U3",
		"û": "u5",
		"Û": "U5",
		"ǔ": "u6",
		"Ǔ": "U6",
		"ū": "u7",
		"Ū": "U7",
		"u̍": "u8",
		"U̍": "U8",
		"ŭ": "u9",
		"Ŭ": "U9",
		"mh": "mh4",
		"Mh": "Mh4",
		"ḿ": "m2",
		"Ḿ": "M2",
		"m̀": "m3",
		"M̀": "M3",
		"m̂": "m5",
		"M̂": "M5",
		"m̌": "m6",
		"M̌": "M6",
		"m̄": "m7",
		"M̄": "M7",
		"m̍h": "mh8",
		"M̍h": "Mh8",
		"m̆": "m9",
		"M̆": "M9",
		"ńg": "ng2",
		"Ńg": "Ng2",
		"ǹg": "ng3",
		"Ǹg": "Ng3",
		"n̂g": "ng5",
		"N̂g": "Ng5",
		"ňg": "ng6",
		"Ňg": "Ng6",
		"n̄g": "ng7",
		"N̄g": "Ng7",
		"n̆g": "ng9",
		"N̆g": "Ng9",
		"n̍gh": "ngh8",
		"N̍gh": "Ngh8",
		"U0358": {
			"poj": {
				"o͘": "ou",
				"O͘": "Ou"
			},
			"tl": {
				"o͘": "oo",
				"O͘": "Oo"
			}
		}
	};
	T2S.U0358 = {
		"poj": {
			"o͘": "ou",
			"O͘": "Ou"
		},
		"tl": {
			"o͘": "oo",
			"O͘": "Oo"
		}
	};

	var nasalRules = {
		"N": {
			"(?:ou|oo|o)(h?)(?:N|nn|ⁿ)([1-9]?)": "oN$1$2",
			"([aeiouAEIOU])(h?)(?:N|nn|ⁿ)(h?[1-9]?)": "$1N$2$3"
		},
		"nn": {
			"(?:ou|oo|o)(h?)(h?)(?:N|nn|ⁿ)([1-9]?)": "onn$1$2",
			"([aeiouAEIOU])(h?)(?:N|nn|ⁿ)(h?[1-9]?)": "$1nn$2$3"
		},
		"U207": {
			"(?:ou|oo|o)(h?)(h?)(?:N|nn|ⁿ)([1-9]?)": "oⁿ$1$2",
			"([aeiouAEIOU])(h?)(?:N|nn|ⁿ)(h?[1-9]?)": "$1ⁿ$2$3"
		}
	};

	var TL2POJ = {
		"oonn": "ouN",
		"Oonn": "OuN",
		"onn": "ouN",
		"Onn": "OuN",
		"ts": "ch",
		"Ts": "Ch",
		"oo": "ou",
		"Oo": "Ou",
		"ua": "oa",
		"Ua": "Oa",
		"ue": "oe",
		"Ue": "Oe",
		"ing": "eng",
		"Ing": "Eng",
		"ik": "ek",
		"Ik": "Ek",
		"nnh": "hN",
		"Nh": "hN",
		"hnn": "hN"
	};

	var POJ2TL = {
		"ch": "ts",
		"Ch": "Ts",
		"ou": "oo",
		"Ou": "Oo",
		"oa": "ua",
		"Oa": "Ua",
		"oe": "ue",
		"Oe": "Ue",
		"eng": "ing",
		"Eng": "Ing",
		"ek": "ik",
		"Ek": "Ik"
	};

	var sakTiau = {
		"([a-uoA-UO͘]*)([1-9])([a-uoⁿN]*)": "$1$3$2"
	};

	var tshiauTiau = {
		"((?:m|M|n|N|ng|Ng|p|P|ph|Ph|b|B|t|T|th|Th|k|K|kh|Kh|g|G|ch|Ch|chh|Chh|ts|Ts|tsh|Tsh|j|J|s|S|h|H|l|L)?)((?:o͘|o|a|e|u|i|O͘|O|A|E|U|I){1,3})((?:N|ⁿ|nn|rm|rng|rn|r|m|ng|n|hN|p|t|k|h)?)([1-9]?)": "$1$2$4$3",
		"poj": {
			"a(u|i)([1-9])": "a$2$1",
			"o(a|ai|e)([1-9])": "o$2$1",
			"ui([1-9])": "u$1i"
		},
		"tl": {
			"a(u|i)([1-9])": "a$2$1",
			"oo([1-9])": "o$1o"
		}
	};
	tshiauTiau.poj = {
		"a(u|i)([1-9])": "a$2$1",
		"o(a|ai|e)([1-9])": "o$2$1",
		"ui([1-9])": "u$1i"
	};
	tshiauTiau.tl = {
		"a(u|i)([1-9])": "a$2$1",
		"oo([1-9])": "o$1o"
	};

	var poo14 = {
		"(a|A|e|E|i|I|o|O|u|U|m|M|ng|Ng|n|N|ⁿ)([^a-uoA-UO͘ⁿ1-9]+|$)": "$11$2",
		"(hⁿ|hN|hnn|h|p|t|k)([^a-uoA-UO͘ⁿ1-9]+|$)": "$14$2"
	};
	var tu14 = {
		"([aeiouAEIOU](?:nn|N|ⁿ)?|[aeiouAEIOU](?:ng|n|m)|(?:p|P|ph|Ph|m|M|b|B|t|T|th|Th|n|N|l|L|k|K|kh|Kh|ng|Ng|g|G|s|S|h|H)?(?:ng|Ng|m|M))1": "$1",
		"([aeiouAEIOU](?:(?:nn|N|ⁿ)?h|p|t|k)|(?:m|M|ng|Ng)h)4": "$1"
	};
	var tuSoo = {
		"([a-uoA-UO͘ⁿ]*)([1-9])": "$1"
	};

	function uannNasal(str, form) {
		switch (form) {
		case "N":
			return thuiUann(str, nasalRules.N);
		case "nn":
			return thuiUann(str, nasalRules.nn);
		case "\u207f":
			return thuiUann(str, nasalRules.U207);
		default:
			return thuiUann(str, nasalRules.nn);
		}
	}

	function pojSou2tlSoo(pojStr, nasalForm) {
		var normalised = uannNasal(pojStr, nasalForm);
		return thuiUann(normalised, POJ2TL);
	}

	function tlSoo2pojSou(tlStr, nasalForm) {
		var result = thuiUann(tlStr, TL2POJ);
		result = uannNasal(result, nasalForm);
		return result;
	}

	function Tiau2Soo(tiauStr, nasalForm, explicit14, isPOJ) {
		var result = thuiUann(tiauStr, T2S);
		result = isPOJ
			? thuiUann(result, T2S.U0358.poj)
			: thuiUann(result, T2S.U0358.tl);
		result = thuiUann(result, sakTiau);
		result = uannNasal(result, nasalForm);
		result = explicit14
			? thuiUann(result, poo14)
			: thuiUann(result, tu14);
		return result;
	}

	function pojSou2Tiau(pojSou) {
		var result = thuiUann(pojSou, S2T.U0358);
		result = thuiUann(result, tshiauTiau);
		result = thuiUann(result, tshiauTiau.poj);
		return thuiUann(result, S2T);
	}

	function tlSoo2Tiau(tlSoo) {
		var result = thuiUann(tlSoo, tshiauTiau);
		result = thuiUann(result, tshiauTiau.tl);
		return thuiUann(result, S2T);
	}

	function tsuan(input, system, toneStyle, nasalForm, explicit14) {
		var result = Tiau2Soo(input, nasalForm, explicit14, false);
		switch (system) {
		case "poj":
			result = tlSoo2pojSou(result, nasalForm);
			switch (toneStyle) {
			case "sou":
			case "bo":
				result = Tiau2Soo(result, nasalForm, explicit14, true);
				break;
			case "hu":
				result = pojSou2Tiau(result);
				break;
			}
			break;
		case "tl":
		default:
			result = pojSou2tlSoo(result, nasalForm);
			switch (toneStyle) {
			case "sou":
			case "bo":
				result = Tiau2Soo(result, nasalForm, explicit14, false);
				break;
			case "hu":
				result = tlSoo2Tiau(result, nasalForm);
				break;
			}
			break;
		}
		if (toneStyle === "bo") {
			return thuiUann(result, tuSoo);
		}
		return result;
	}

	var TAIGI = {
		S2T: S2T,
		T2S: T2S,
		nasal: nasalRules,
		TL2POJ: TL2POJ,
		POJ2TL: POJ2TL,
		sakTiau: sakTiau,
		tshiauTiau: tshiauTiau,
		poo14: poo14,
		tu14: tu14,
		tuSoo: tuSoo,
		tsuan: tsuan
	};

	return {
		TAIGI: TAIGI,
		thuiUann: thuiUann,
		uannNasal: uannNasal,
		pojSou2tlSoo: pojSou2tlSoo,
		tlSoo2pojSou: tlSoo2pojSou,
		Tiau2Soo: Tiau2Soo,
		pojSou2Tiau: pojSou2Tiau,
		tlSoo2Tiau: tlSoo2Tiau,
		tsuan: tsuan
	};
});
