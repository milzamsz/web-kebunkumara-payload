/**
 * Preload patch: fixes @next/env ESM/CJS interop issue when running seed
 * outside Next.js context (Node.js v22+ with tsx).
 */
const Module = require('module')
const originalLoad = Module._load
Module._load = function (request, parent, isMain) {
  const result = originalLoad.call(this, request, parent, isMain)
  if (request === '@next/env' && result && !result.default) {
    result.default = result
  }
  return result
}

// Also pre-load .env so payload doesn't need to
require('dotenv').config()
