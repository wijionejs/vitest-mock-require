import Module from "module";
import { minimatch } from "minimatch";

const originalRequire = Module.prototype.require;

/**
 * Matches glob pattern with path
 * @param {string} pattern  glob pattern (e.g. "**\/*.svg", "**\/*.png")
 * @param {string} path path that comes from "require()"
 * @returns {boolean} value that indicates if the path matches the pattern
 */
const isMatch = (pattern, path) => {
  return minimatch(path, pattern);
};

/**
 * Mocks commonjs "require()" function
 * @param {Object.<string, any>} map represents a map where key is a glob pattern and a value is a content which will be returned when require() is called (e.g. { x: 10, y: 10 })
 */
export const mockRequire = map => {
  const patterns = Object.keys(map);

  Module.prototype.require = function (path) {
    const matchedPattern = patterns.find(p => isMatch(p, path));

    if (matchedPattern) {
      return map[matchedPattern];
    }

    return originalRequire.call(this, path);
  };
};

/**
 * Clears mocks, restores originial "require()" implementation
 */
export const restoreRequire = () => {
  Module.prototype.require = originalRequire;
};