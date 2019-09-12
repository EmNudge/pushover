import { Channel, TextChannel, DMChannel, GroupDMChannel } from 'discord.js'
import { ChannelType } from 'src/types'

function isRestrictedChannel(channel: Channel, channelType: ChannelType = ChannelType.Any) {
  if (channelType === ChannelType.Any) return false;

  if (channel instanceof TextChannel && channelType !== ChannelType.Guild) return true;
  if (channel instanceof DMChannel && channelType !== ChannelType.DM) return true;
  if (channel instanceof GroupDMChannel && channelType !== ChannelType.Group) return true;

  throw new Error('channel is specified as unkown type: ' + channelType);
}

export default isRestrictedChannel;