# Admin

ADMIN is a system which allows certain commands to be restricted to a bot-specific admin class. 

## Timeline
1. `ADMIN.init([name])` initializes admin database with the server name or name passed as parameter
2. `ADMIN.add(@user @role ...[, adminGroupIfPossible])` makes users admin in relation to the bot. Can only be used by server owners.
3. `ADMIN.remove(@user @role ...[, adminGroupIfPossible])` removes admin from users.
4. `ADMIN.set(command)` sets admin restriction on command
5. `ADMIN.unset(command)` removes admin restriction from command
6. `ADMIN.showCommands()` displays all commands restricted to admins
7. `ADMIN.showMembers()` displays all roles and users with admin permissions

## Usage
Any JS file in here will be a callable command with the prefix "ADMIN."
e.g. `add.js` will be called with `ADMIN.add()`

## Notes
* There are **no** admin levels.
* ADMIN.set() & ADMIN.unset() are for **commands**
* ADMIN.add() & ADMIN.remove() are for **members**
* Admin commands should be cached for speed purposes