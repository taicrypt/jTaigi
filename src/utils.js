"use strict";

/**
 * Generic regex-based string replacement utility.
 *
 * Iterates over each key in `replacements`, compiles it as a global regex,
 * and replaces every match in `str` with the corresponding value.
 *
 * @param {string} str          - The input string.
 * @param {Object<string, string>} replacements - Map of regex patterns → replacement strings.
 * @returns {string} The transformed string.
 */
function thuiUann(str, replacements) {
	for (const pattern in replacements) {
		const re = new RegExp(pattern, "g");
		str = str.replace(re, replacements[pattern]);
	}
	return str;
}

module.exports = { thuiUann };
