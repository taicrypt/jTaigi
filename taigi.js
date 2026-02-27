/*
sonority a > oo > e = o > i = u〈低元音 > 高元音 > 無擦通音 > 擦音 > 塞音)
tone priority: o > a > e > u > i
syllable := initial + nucleus + coda + tone

pojSou2tlSoo(pojs, nasal)
	白話字數字式 => 台羅數字式
tlSoo2pojSou(tls, nasal)
	台羅數字式 => 白話字數字式
function Tiau2Soo(tiau, nasal, u14)
	(台羅|白話字)調符式 => (台羅|白話字)數字式
pojSou2Tiau(pojSou)
	白話字數字式 => 白話字調符式
tlSoo2Tiau(soo)
	台羅數字式 => 台羅調符式
*/

"use strict";
var TAIGI = {};
/*
TAIGI.initial = "((?:m|M|n|N|ng|Ng|p|P|ph|Ph|b|B|t|T|th|Th|k|K|kh|Kh|g|G|ch|Ch|chh|Chh|ts|Ts|tsh|Tsh|j|J|s|S|h|H|l|L)?)";
TAIGI.nucleus = "((?:o͘|o|a|e|u|i||O͘|O|A|E|U|I){1,3})";
TAIGI.coda = "((?:rm|rng|rn|r|m|ng|n|hN|N|ⁿ|nn|p|t|k|h)?)";
TAIGI.tone = "([1-9]?)";
*/

Function.prototype.method = function (name, func) {
	if (!this.prototype[name]){
		this.prototype[name] = func;
		return this;
	}
};
String.method('thuiUann', function(tui) {
	var that = this;
	for (var e in tui) {
		var re = new RegExp(e, "g")
		that = that.replace(re, tui[e]);
	}
	return that;
});

function thuiUann(bun, tui) {
	for (var e in tui) {
		var re = new RegExp(e, "g");
		bun = bun.replace(re, tui[e]);
	}
	return bun;
}

TAIGI.S2T = {
	"a1": "a", "A1": "A",
	"a2": "á", "A2": "Á",
	"a3": "à", "A3": "À",
	"a4": "a", "A4": "A",
	"a5": "â", "A5": "Â",
	"a6": "ǎ", "A6": "Ǎ",
	"a7": "ā", "A7": "Ā",
	"a8": "a̍", "A8": "A̍",
	"a9": "ă", "A9": "Ă",
	"e1": "e", "E1": "E",
	"e2": "é", "E2": "É",
	"e3": "è", "E3": "È",
	"e4": "e", "E4": "E",
	"e5": "ê", "E5": "Ê",
	"e6": "ě", "E6": "Ě",
	"e7": "ē", "E7": "Ē",
	"e8": "e̍", "E8": "E̍",
	"e9": "ĕ", "E9": "Ĕ",
	"i1": "i", "I1": "I",
	"i2": "í", "I2": "Í",
	"i3": "ì", "I3": "Ì",
	"i4": "i", "I4": "I",
	"i5": "î", "I5": "Î",
	"i6": "ǐ", "I6": "Ǐ",
	"i7": "ī", "I7": "Ī",
	"i8": "i̍", "I8": "I̍",
	"i9": "ĭ", "I9": "Ĭ",
	"o͘1": "o͘", "O͘1": "O͘",
	"o͘2": "ó͘", "O͘2": "Ó͘",
	"o͘3": "ò͘", "O͘3": "Ò͘",
	"o͘4": "o͘", "O͘4": "O͘",
	"o͘5": "ô͘", "O͘5": "Ô͘",
	"o͘6": "ǒ͘", "O͘6": "Ǒ͘",
	"o͘7": "ō͘", "O͘7": "Ō͘",
	"o͘8": "o̍͘", "O͘8": "O̍͘",
	"o͘9": "ŏ͘", "O͘9": "Ŏ͘",
	"o1": "o", "O1": "O",
	"o2": "ó", "O2": "Ó",
	"o3": "ò", "O3": "Ò",
	"o4": "o", "O4": "O",
	"o5": "ô", "O5": "Ô",
	"o6": "ǒ", "O6": "Ǒ",
	"o7": "ō", "O7": "Ō",
	"o8": "o̍", "O8": "O̍",
	"o9": "ŏ", "O9": "Ŏ",
	"u1": "u", "U1": "U",
	"u2": "ú", "U2": "Ú",
	"u3": "ù", "U3": "Ù",
	"u4": "u", "U4": "U",
	"u5": "û", "U5": "Û",
	"u6": "ǔ", "U6": "Ǔ",
	"u7": "ū", "U7": "Ū",
	"u8": "u̍", "U8": "U̍",
	"u9": "ŭ", "U9": "Ŭ",
	"m1": "m", "M1": "M",
	"m2": "ḿ", "M2": "Ḿ",
	"m3": "m̀", "M3": "M̀",
	"mh4": "mh", "Mh4": "Mh",
	"m5": "m̂", "M5": "M̂",
	"m6": "m̌", "M6": "M̌",
	"m7": "m̄", "M7": "M̄",
	"mh8": "m̍h", "Mh8": "M̍h",
	"m9": "m̆", "M9": "M̆",
	"ng1": "ng", "Ng1": "Ng",
	"ng2": "ńg", "Ng2": "Ńg",
	"ng3": "ǹg", "Ng3": "Ǹg",
	"ngh4": "ngh", "Ngh4": "Ngh",
	"ng5": "n̂g", "Ng5": "N̂g",
	"ng6": "ňg", "Ng6": "Ňg",
	"ng7": "n̄g", "Ng7": "N̄g",
	"ngh8": "n̍gh", "Ngh8": "N̍gh",
	"ng9": "n̆g", "Ng9": "N̆g"
};
TAIGI.S2T.U0358 = { /* POJ */
	"oo": "o͘", "ou": "o͘",
	"Oo": "O͘", "Ou": "O͘", 
};

TAIGI.T2S = {
	//"a": "a1", "A": "A1",
	"á": "a2", "Á": "A2",
	"à": "a3", "À": "A3",
	//"a": "a4", "A": "A4",
	"â": "a5", "Â": "A5",
	"ǎ": "a6", "Ǎ": "A6",
	"ā": "a7", "Ā": "A7",
	"a̍": "a8", "A̍": "A8",
	"ă": "a9", "Ă": "A9",
	//"e": "e1", "E": "E1",
	"é": "e2", "É": "E2",
	"è": "e3", "È": "E3",
	//"e": "e4", "E": "E4",
	"ê": "e5", "Ê": "E5",
	"ě": "e6", "Ě": "E6",
	"ē": "e7", "Ē": "E7",
	"e̍": "e8", "E̍": "E8",
	"ĕ": "e9", "Ĕ": "E9",
	//"i": "i1", "I": "I1",
	"í": "i2", "Í": "I2",
	"ì": "i3", "Ì": "I3",
	//"i": "i4", "I": "I4",
	"î": "i5", "Î": "I5",
	"ǐ": "i6", "Ǐ": "I6",
	"ī": "i7", "Ī": "I7",
	"i̍": "i8", "I̍": "I8",
	"ĭ": "i9", "Ĭ": "I9",
	//"o͘": "o͘1", "O͘": "O͘1",
	"ó͘": "o͘2", "Ó͘": "O͘2",
	"ò͘": "o͘3", "Ò͘": "O͘3",
	//"o͘": "o͘4", "O͘": "O͘4",
	"ô͘": "o͘5", "Ô͘": "O͘5",
	"ǒ͘": "o͘6", "Ǒ͘": "O͘6",
	"ō͘": "o͘7", "Ō͘": "O͘7",
	"o̍͘": "o͘8", "O̍͘": "O͘8",
	"ŏ͘": "o͘9", "Ŏ͘": "O͘9",
	//"o": "o1", "O": "O1",
	"ó": "o2", "Ó": "O2",
	"ò": "o3", "Ò": "O3",
	//"o": "o4", "O": "O4",
	"ô": "o5", "Ô": "O5",
	"ǒ": "o6", "Ǒ": "O6",
	"ō": "o7", "Ō": "O7",
	"o̍": "o8", "O̍": "O8",
	"ŏ": "o9", "Ŏ": "O9",
	//"u": "u1", "U": "U1",
	"ú": "u2", "Ú": "U2",
	"ù": "u3", "Ù": "U3",
	//"u": "u4", "U": "U4",
	"û": "u5", "Û": "U5",
	"ǔ": "u6", "Ǔ": "U6",
	"ū": "u7", "Ū": "U7",
	"u̍": "u8", "U̍": "U8",
	"ŭ": "u9", "Ŭ": "U9",
	"mh": "mh4", "Mh": "Mh4",
	//"m": "m1", "M": "M1",
	"ḿ": "m2", "Ḿ": "M2",
	"m̀": "m3", "M̀": "M3",
	"m̂": "m5", "M̂": "M5",
	"m̌": "m6", "M̌": "M6",
	"m̄": "m7", "M̄": "M7",
	"m̍h": "mh8", "M̍h": "Mh8",
	"m̆": "m9",  "M̆": "M9",
	//"ng": "ng1", "Ng": "Ng1",
	"ńg": "ng2", "Ńg": "Ng2",
	"ǹg": "ng3", "Ǹg": "Ng3",
	//"ngh": "ngh4", "Ngh": "Ngh4",
	"n̂g": "ng5", "N̂g": "Ng5",
	"ňg": "ng6", "Ňg": "Ng6",
	"n̄g": "ng7", "N̄g": "Ng7",
	"n̆g": "ng9", "N̆g": "Ng9",
	"n̍gh": "ngh8", "N̍gh": "Ngh8",
};
TAIGI.T2S.U0358 = {};
TAIGI.T2S.U0358.poj = {
	"o͘": "ou", "O͘": "Ou", // <--
};
TAIGI.T2S.U0358.tl= {
	"o͘": "oo", "O͘": "Oo", // <--
};

TAIGI.nasal = {};
TAIGI.nasal.N = {
	"(?:ou|oo|o)(h?)(?:N|nn|ⁿ)([1-9]?)": "oN$1$2",
	"([aeiouAEIOU])(h?)(?:N|nn|ⁿ)(h?[1-9]?)": "$1N$2$3",
	//"(?<=[aeiou])(?:N|nn)(h?[1-9]?)": "N$1", // non-canonical POJ nasal form: Nh rather than hN
};
TAIGI.nasal.nn = {
	"(?:ou|oo|o)(h?)(h?)(?:N|nn|ⁿ)([1-9]?)": "onn$1$2",
	"([aeiouAEIOU])(h?)(?:N|nn|ⁿ)(h?[1-9]?)": "$1nn$2$3",
	//"(?<=[aeiou])(?:N|nn)(h?[1-9]?)": "nn$1", // non-canonical POJ nasal form: nnh rather than hnn
};
TAIGI.nasal.U207 = {
	"(?:ou|oo|o)(h?)(h?)(?:N|nn|ⁿ)([1-9]?)": "oⁿ$1$2",
	"([aeiouAEIOU])(h?)(?:N|nn|ⁿ)(h?[1-9]?)": "$1ⁿ$2$3",
	//"(?<=[aeiou])(?:N|nn)(h?[1-9]?)": "nn$1", // non-canonical POJ nasal form: nnh rather than hnn
};

TAIGI.TL2POJ = {
	"oonn": "ouN", "Oonn": "OuN",
	"onn": "ouN", "Onn": "OuN",
	"ts": "ch", "Ts": "Ch", 
	"oo": "ou", "Oo": "Ou",
	"ua": "oa", "Ua": "Oa", "ue": "oe", "Ue": "Oe",
	"ing": "eng", "Ing": "Eng", "ik": "ek", "Ik": "Ek",
	"nnh": "hN", "Nh": "hN", "hnn": "hN",
};
TAIGI.POJ2TL = {
	"ch": "ts", "Ch": "Ts",
	"ou": "oo", "Ou": "Oo", "oa": "ua", "Oa": "Ua", "oe": "ue", "Oe": "Ue",
	"eng": "ing", "Eng": "Ing",
	"ek": "ik", "Ek": "Ik",
};

TAIGI.sakTiau = {
	"([a-uoA-UO͘]*)([1-9])([a-uoⁿN]*)": "$1$3$2",
};

TAIGI.tshiauTiau = {
	"((?:m|M|n|N|ng|Ng|p|P|ph|Ph|b|B|t|T|th|Th|k|K|kh|Kh|g|G|ch|Ch|chh|Chh|ts|Ts|tsh|Tsh|j|J|s|S|h|H|l|L)?)((?:o͘|o|a|e|u|i|O͘|O|A|E|U|I){1,3})((?:N|ⁿ|nn|rm|rng|rn|r|m|ng|n|hN|p|t|k|h)?)([1-9]?)": "$1$2$4$3",
};
TAIGI.tshiauTiau.poj = {
	"a(u|i)([1-9])": "a$2$1",
	"o(a|ai|e)([1-9])": "o$2$1", // POJ 
	"ui([1-9])": "u$1i", //POJ
};
TAIGI.tshiauTiau.tl = {
	"a(u|i)([1-9])": "a$2$1",
	"oo([1-9])": "o$1o", // TL
};

TAIGI.poo14 = {
	//"(a|A|e|E|i|I|o|O|u|U|m|M|ng|Ng|n|N|ⁿ)([!-\/:-@\[-`{-~\\s\\b])": "$11$2",
	"(a|A|e|E|i|I|o|O|u|U|m|M|ng|Ng|n|N|ⁿ)([^a-uoA-UO͘ⁿ1-9]+|$)": "$11$2",
	//"(hⁿ|hN|hnn|h|p|t|k)([!-\/:-@\[-`{-~\\s\\b])": "$14$2",
	"(hⁿ|hN|hnn|h|p|t|k)([^a-uoA-UO͘ⁿ1-9]+|$)": "$14$2",
};
TAIGI.tu14 = {
	"([aeiouAEIOU](?:nn|N|ⁿ)?|[aeiouAEIOU](?:ng|n|m)|(?:p|P|ph|Ph|m|M|b|B|t|T|th|Th|n|N|l|L|k|K|kh|Kh|ng|Ng|g|G|s|S|h|H)?(?:ng|Ng|m|M))1": "$1",
	"([aeiouAEIOU](?:(?:nn|N|ⁿ)?h|p|t|k)|(?:m|M|ng|Ng)h)4": "$1",
};
TAIGI.tuSoo = {
//	"([a-uoA-UO͘ⁿ]*)([1-9])([!-\/:-@\[-`{-~\\s\\b])": "$1$3",
	"([a-uoA-UO͘ⁿ]*)([1-9])": "$1",
};

function uannNasal (puann, nasal) {
	switch (nasal) {
	case "N":
		puann = thuiUann(puann, TAIGI.nasal.N); break;
	case "nn":
		puann = thuiUann(puann, TAIGI.nasal.nn); break;
	case "ⁿ":
		puann = thuiUann(puann, TAIGI.nasal.U207); break;
	default:
		puann = thuiUann(puann, TAIGI.nasal.nn); break;
	}
	return puann;
}

function pojSou2tlSoo(pojs, nasal) {
	//白話字數字式 => 台羅數字式
	var puann = pojs;
	puann = uannNasal(puann, nasal);
	return puann.thuiUann(TAIGI.POJ2TL);
}

function tlSoo2pojSou(tls, nasal) {
	//台羅數字式 => 白話字數字式
	var puann = tls;
	puann = thuiUann(puann, TAIGI.TL2POJ);
	puann = uannNasal(puann, nasal);
	return puann;
}

function Tiau2Soo(tiau, nasal, u14, isPOJ) {
	//(台羅|白話字)調符式 => (台羅|白話字)數字式
	var puann = tiau;
	puann = thuiUann(puann, TAIGI.T2S);
	if (isPOJ)
		puann = thuiUann(puann, TAIGI.T2S.U0358.poj);
	else
		puann = thuiUann(puann, TAIGI.T2S.U0358.tl);

	puann = thuiUann(puann, TAIGI.sakTiau);

	puann = uannNasal(puann, nasal);

	if (u14) {
		puann = thuiUann(puann, TAIGI.poo14);
	} else {
		puann = thuiUann(puann, TAIGI.tu14);
	}

	return puann;
}

function pojSou2Tiau(pojSou) {
	//白話字數字式 => 白話字調符式
	var tiau = pojSou.thuiUann(TAIGI.S2T.U0358);
	tiau = thuiUann(tiau, TAIGI.tshiauTiau);
	tiau = thuiUann(tiau, TAIGI.tshiauTiau.poj);
	return tiau.thuiUann(TAIGI.S2T);
}

function tlSoo2Tiau(soo) {
	//台羅數字式 => 台羅調符式
	var tiau = soo.thuiUann(TAIGI.tshiauTiau);
	tiau = tiau.thuiUann(TAIGI.tshiauTiau.tl);
	return tiau.thuiUann(TAIGI.S2T);
}

TAIGI.tsuan = function(puann, ji, tiau, nasal, u14) {
	puann = Tiau2Soo(puann, nasal, u14, false);
	switch (ji) {
	case "poj":
		puann = tlSoo2pojSou(puann, nasal);
		switch(tiau){
		case "sou":	
		case "bo":
			puann = Tiau2Soo(puann, nasal, u14, true);
			break;
		case "hu":
			puann = pojSou2Tiau(puann);
			break;
		default:
			break;
		}
		break;
	case "tl":
	default:
		puann = pojSou2tlSoo(puann, nasal);
		switch(tiau){
		case "sou":	
		case "bo":	
			puann = Tiau2Soo(puann, nasal, u14, false);
			break;
		case "hu":
			puann = tlSoo2Tiau(puann, nasal);
			break;
		default:
			break;
		}
		break;
	}
	if ( tiau == "bo")
		return puann.thuiUann(TAIGI.tuSoo);
	else	
		return puann;
};

if (typeof module !== 'undefined' && module.exports) {
	module.exports = {
		TAIGI,
		thuiUann,
		uannNasal,
		pojSou2tlSoo,
		tlSoo2pojSou,
		Tiau2Soo,
		pojSou2Tiau,
		tlSoo2Tiau,
	};
}
