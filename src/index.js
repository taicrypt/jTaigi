"use strict";

/**
 * jTaigi — Tâi-gí romanization conversion toolkit.
 *
 * Public API re-exported from internal modules.
 * @module jtaigi
 */

const mappings = require("./mappings");
const { thuiUann } = require("./utils");
const {
	uannNasal,
	pojSou2tlSoo,
	tlSoo2pojSou,
	Tiau2Soo,
	pojSou2Tiau,
	tlSoo2Tiau,
} = require("./converters");

// ── High-level conversion pipeline ─────────────────────────────────────────

/**
 * Convert romanized Tâi-gí text between systems and representations.
 *
 * @param {string}  input       - Input text (tone-marked or numeric).
 * @param {string}  system      - Target system: `"poj"` or `"tl"`.
 * @param {string}  toneStyle   - Tone output: `"hu"` (marks), `"sou"` (numbers), `"bo"` (strip).
 * @param {string}  [nasalForm] - Nasal form: `"N"`, `"nn"`, or `"ⁿ"`.
 * @param {boolean} [explicit14=false] - If `true`, output explicit tone 1/4 digits.
 * @returns {string} Converted text.
 */
function tsuan(input, system, toneStyle, nasalForm, explicit14) {
	let result = Tiau2Soo(input, nasalForm, explicit14, false);

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
		return thuiUann(result, mappings.tuSoo);
	}
	return result;
}

// ── Backward-compatible TAIGI namespace ────────────────────────────────────

const TAIGI = {
	...mappings,
	tsuan,
};

// ── Exports ────────────────────────────────────────────────────────────────

module.exports = {
	TAIGI,
	thuiUann,
	uannNasal,
	pojSou2tlSoo,
	tlSoo2pojSou,
	Tiau2Soo,
	pojSou2Tiau,
	tlSoo2Tiau,
	tsuan,
};
