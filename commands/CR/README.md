# Custom Reponses
Progress Reports is a system which allows the bot to request reports on progress made in a given week.

## Timeline
1. `CR.set(name, custom response)` is called. It adds a trigger word to be used with CR.get() in order to retrieve the custom response.
2. `CR.get(name)` is called. It retrieves the associated response.
3. `CR.show()` is called. It displays a RichEmbed with all the names and responses for the server.
4. `CR.delete(name)` is called. It removes a trigger word.


## Usage
Any JS file in here will be a callable command with the prefix "CR."
e.g. `set.js` will be called with `CR.set()`