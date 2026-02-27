"use strict";

const {
	S2T, T2S, nasal, TL2POJ, POJ2TL,
	sakTiau, tshiauTiau, poo14, tu14,
} = require("./mappings");
const { thuiUann } = require("./utils");

// ── Nasal normalisation ────────────────────────────────────────────────────

/**
 * Normalise nasal markers in a romanized string.
 *
 * @param {string} str          - Romanized syllable(s) with mixed nasal forms.
 * @param {string} [form="nn"] - Target nasal form: `"N"`, `"nn"`, or `"ⁿ"`.
 * @returns {string} String with nasal markers normalised to the chosen form.
 */
function uannNasal(str, form) {
	switch (form) {
	case "N":
		return thuiUann(str, nasal.N);
	case "nn":
		return thuiUann(str, nasal.nn);
	case "ⁿ":
		return thuiUann(str, nasal.U207);
	default:
		return thuiUann(str, nasal.nn);
	}
}

// ── System conversions (numeric) ───────────────────────────────────────────

/**
 * Convert POJ numeric romanization to TL numeric romanization.
 *
 * @param {string} pojStr       - POJ numeric string (e.g. `"hou2"`).
 * @param {string} [nasalForm] - Target nasal form (`"N"` | `"nn"` | `"ⁿ"`).
 * @returns {string} TL numeric string (e.g. `"hoo2"`).
 */
function pojSou2tlSoo(pojStr, nasalForm) {
	const normalised = uannNasal(pojStr, nasalForm);
	return thuiUann(normalised, POJ2TL);
}

/**
 * Convert TL numeric romanization to POJ numeric romanization.
 *
 * @param {string} tlStr        - TL numeric string (e.g. `"hoo2"`).
 * @param {string} [nasalForm] - Target nasal form (`"N"` | `"nn"` | `"ⁿ"`).
 * @returns {string} POJ numeric string (e.g. `"hou2"`).
 */
function tlSoo2pojSou(tlStr, nasalForm) {
	let result = thuiUann(tlStr, TL2POJ);
	result = uannNasal(result, nasalForm);
	return result;
}

// ── Tone-mark ↔ Numeric ───────────────────────────────────────────────────

/**
 * Convert tone-marked romanization to numeric form.
 *
 * Works for both POJ and TL input — set `isPOJ` to select the correct
 * o͘ handling (POJ uses `ou`, TL uses `oo`).
 *
 * @param {string}  tiauStr     - Tone-marked string (e.g. `"á"`).
 * @param {string}  [nasalForm] - Target nasal form.
 * @param {boolean} [explicit14=false] - If `true`, add explicit tone 1/4 digits.
 * @param {boolean} [isPOJ=false]      - If `true`, use POJ o͘→ou; otherwise TL o͘→oo.
 * @returns {string} Numeric romanization (e.g. `"a2"`).
 */
function Tiau2Soo(tiauStr, nasalForm, explicit14, isPOJ) {
	let result = thuiUann(tiauStr, T2S);

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

/**
 * Convert POJ numeric romanization to POJ tone-marked form.
 *
 * @param {string} pojSou - POJ numeric string (e.g. `"ka3"`).
 * @returns {string} POJ tone-marked string (e.g. `"kà"`).
 */
function pojSou2Tiau(pojSou) {
	let result = thuiUann(pojSou, S2T.U0358);
	result = thuiUann(result, tshiauTiau);
	result = thuiUann(result, tshiauTiau.poj);
	return thuiUann(result, S2T);
}

/**
 * Convert TL numeric romanization to TL tone-marked form.
 *
 * @param {string} tlSoo - TL numeric string (e.g. `"ka3"`).
 * @returns {string} TL tone-marked string (e.g. `"kà"`).
 */
function tlSoo2Tiau(tlSoo) {
	let result = thuiUann(tlSoo, tshiauTiau);
	result = thuiUann(result, tshiauTiau.tl);
	return thuiUann(result, S2T);
}

module.exports = {
	uannNasal,
	pojSou2tlSoo,
	tlSoo2pojSou,
	Tiau2Soo,
	pojSou2Tiau,
	tlSoo2Tiau,
};
