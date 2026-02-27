/**
 * jTaigi — ES module entry point.
 * Re-exports everything from the CommonJS modules.
 * @module jtaigi
 */

import { createRequire } from "module";
const require = createRequire(import.meta.url);

const api = require("./index.js");

export const {
	TAIGI,
	thuiUann,
	uannNasal,
	pojSou2tlSoo,
	tlSoo2pojSou,
	Tiau2Soo,
	pojSou2Tiau,
	tlSoo2Tiau,
	tsuan,
} = api;

export default api;
