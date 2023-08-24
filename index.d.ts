type PatternMap = {
  [k: string]: any
};

export declare const mockRequire: (map: PatternMap) => void;

export declare const restoreRequire: () => void;