# vitest-mock-require

Library that mocks commonjs 'require' calls in your testing environment for Vitest.

## Overview

Since Vitest is esm-first it doesn't provide a way to mock `require()` calls and cannot transform a content of a file.

However, sometimes your dependencies may include code where `require()` is called with .svg, .png and so on.

As a result you might encounter the following error while running your tests: 

`SyntaxError: Unexpected token...`

This library is designed to help you with mocking such imports so that you don't have any errors while running your tests.

## Installation

Via yarn:

`yarn add -D vitest-mock-require`

Via npm: 

`npm install -D vitest-mock-require`

Via pnpm:

`pnpm add -D vitest-mock-require`

## Usage

Library provides just two methods:

- `mockRequire` - mocks `require()` calls for specified glob patterns;

- `restoreRequire` - returns original implementation of commonjs `require()`

Let's go over an example of how to use this library in your project.

First, you must create a setup file for Vitest with arbitrary name (e.g. *vitest.setup.tsx*).

Then, import and call `mockRequire` function with an object where key is a pattern and value is a value that will be returned when require is called.

```tsx
// vitest.setup.tsx
import { mockRequire } from "vitest-mock-require";

mockRequire({
  "**/*.svg": () => <span>icon</span>,
  "**/*.png": () => <span>image</span>,
  // and so on...
});
```

And last but not least, you must add this file to your test configuration:

```tsx
// vitest.config.ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    setupFiles: ["./vitest.setup.tsx"],
    // ...
  },
})
```

That's it, by now all those errors should be gone.