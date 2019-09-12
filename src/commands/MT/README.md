# Meeting Topics

Meeting Topics is a system which allows users to commit meeting topics to a database in order for them to be later recalled in a RichEmbed

## Timeline
1. `MT.setChannel([#channel-name])` is called. It sets a channel for the bot to post the RichEmbed to.
2. `MT.add(multiWordTopic[, low/medium/high])` is called. It adds a topic with its priority
3. `MT.show()` is called. It displays the RichEmbed in the predesignated channel

## Usage
Any JS file in here will be a callable command with the prefix "MT."
e.g. `show.js` will be called with `MT.init()`