# ES6 Native Support Tests

The goal of this repository is to track native support for ES6. Currently,
this requires a recent release of [iojs](https://iojs.org/).

## Why Native?

Projects like [Babel](http://babeljs.io/) support quite a lot of ES6 features,
but they tend to be slow and require an extra transpiling step. A typical
developer workflow includes linting, transpiling code, transpiling tests,
running tests, etc. All of this takes valuable time and can slow you down, as
well as cause serious frustration trying to fix bugs.

If instead you build against a specific subset of ES6 using the latest iojs,
then you can get the performance of normal javascript with some enhanced
features like classes. As iojs and Node merge and new releases come out, you
can start using more features that are currently unsupported (e.g. default
parameters), allowing you to slowly transition to ES6 without frustrating
developers.

### Speed comparison

Using this tiny project as an example to highlight startup time cost, here
are some initial results run on a 2015 Macbook Pro:

Command              | Cached     | Time
-------------------- | ---------- | ----
`npm test`           | Cold start | 0.650s
`npm test`           | Cached     | 0.580s
`npm run test-babel` | Cold start | 2.5s
`npm run test-babel` | Cached     | 1.3s

### Releases

Obviously, if you wish to support more than the latest bleeding edge release
you will still need to rely on a transpiler. The beauty of this approach is
that you can develop on the bleeding edge, but transpile and test as a
precondition of release. This gives you the best of both worlds, and any code
pushes you do to GitHub can be run through all supported versions after
transpiling on a CI host. You can still get high confidence in your code
without constantly waiting.

## Supported Features

This is a list of the features that are currently supported and can be used
natively:

- The `let` and `const` keywords
- Classes including `extends` and `super`
- Arrow functions (**without** `this` pass-through)
- String templates

Additionally:

- Tests are native. They run fast and report the correct line numbers.
- Code coverage is native. It reports the correct line numbers and original
  source.

## Important Missing Features

These will be supported as V8 adds support. Hopefully soon!

- No support for modules (`import`, `export`)
- No support for destructuring `{foo, bar} = myobj;`
- No default parameters `function foo(value=1)`
