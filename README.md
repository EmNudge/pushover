# PUSHOVER

Discord bot with unique command syntax.

Instead of the usual `[prefix]command arg1 arg2` syntax, pushover's syntax looks like a function.
Commands are instead written as `command(arg1, arg2)`. This allows commands to be a lot more intuitive to read and write. This syntax also allows us to "extend" from mini-libraries, known as utilities. 

Commands are separated into files in folders. Commands will take up the name of their folder in the syntax of `[Folder name].[command name]([arguments])`.
Therefore, a command named `set` in the folder `ADMIN` will be called using the syntax `ADMIN.set([args])`.

# Code
Pushover uses typescript. A lot of code is also being moved over to arcsecond, a parser combinator library, as the current regex-based parsing is starting to get a little hard to read.
