const { Event } = require("klasa");

class GuildMemberRemoveEvent extends Event {

    async run(member) {
        if (member.guild.settings.logs.leaves) this.client.emit("logs", member.guild, {
            type: "memberLeave",
            member
        });
        const { settings } = member.guild;
        if (!settings.welcome.enabled || !settings.welcome.welcomeChannel) return;
        const formatted = this.format(settings.welcome.welcomeMessage, member);
        const welcomeChannel = member.guild.channels.get(settings.welcome.welcomeChannel);
        if (!welcomeChannel || !welcomeChannel.postable) return;
        return welcomeChannel.send(formatted).catch(() => null);
    }

    format(message, member) {
        return message
            .replace(/{mention}/g, member.toString())
            .replace(/{id}/g, member.user.id)
            .replace(/{username}/g, member.user.username)
            .replace(/{discriminator}/g, member.user.discriminator)
            .replace(/{tag}/g, member.user.tag)
            .replace(/{guild}/g, member.guild.name)
            .replace(/{guildId}/g, member.guild.id);
    }

    autoRole(member) {
        const { settings } = message.guild;
        if (!settings.autoRole) return;
        if (!member.guild.me.permissions.has("MANAGE_ROLES")) return;
        return member.roles.add(settings.autoRole, "RemixBot Auto Role").catch(() => null);
    }

}

module.exports = GuildMemberRemoveEvent;