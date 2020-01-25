# Parser Combinators

These are parser comnbinators - a paradigm of parsing using the language itself wherein smaller parsers are combined to make larger parsers instead of an external parsing language.

## index.ts
Imports function.ts and prototype.ts in order to export them with the correct types attached since arcsecond has no TS types and types would need to be written out directly regardless.
It also exports the types for the `result` of eah parser, allowing for better implied TS types.

## function.ts

The only useful export here is `functionParser`. When passed a function with the format `FOLDERNAME.func(1234, "param 2")` to its `.run()` method, it will return an object. This object will have the resulting data structure in its `result` property or have an error described in its `error` property.

## prototype.ts

This file contains the parser combinator for parsing function prototypes. These are the descriptions for the kind of format (parameters) a given function will accept.

It will take a string similar to `"num: number | string, name: string, channel: channel | string"`. The bar is an `or` that will allow either type. It is then up to the function to handle each type correctly.


## funcTypes.ts

This file contains all the types to be parsed in whatever instance. It can be imported by `prototype.ts` or `function.ts` as needed.