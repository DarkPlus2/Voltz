// Configuration for Hyper Ultra Bot Website
const config = {
    // Bot Invite Link (replace with your bot's client ID)
    inviteURL: "https://discord.com/oauth2/authorize?client_id=YOUR_BOT_ID&permissions=8&scope=bot%20applications.commands",
    
    // Support Server Invite
    supportURL: "https://discord.gg/YOUR_INVITE_CODE",
    
    // Bot Stats (these can be updated dynamically via API later)
    stats: {
        servers: 12500,
        users: 5200000,
        commands: 217
    },
    
    // Command Categories and List
    commands: {
        moderation: [
            { name: "ban", description: "Ban a user from the server", usage: "/ban [user] (reason)" },
            { name: "kick", description: "Kick a user from the server", usage: "/kick [user] (reason)" },
            { name: "mute", description: "Mute a user for a specified time", usage: "/mute [user] [time] (reason)" },
            { name: "warn", description: "Warn a user for rule violations", usage: "/warn [user] [reason]" }
        ],
        music: [
            { name: "play", description: "Play music from YouTube, Spotify, etc.", usage: "/play [query/url]" },
            { name: "skip", description: "Skip the current track", usage: "/skip" },
            { name: "queue", description: "View the current queue", usage: "/queue" }
        ],
        fun: [
            { name: "meme", description: "Get a random meme", usage: "/meme" },
            { name: "8ball", description: "Ask the magic 8-ball a question", usage: "/8ball [question]" }
        ],
        utility: [
            { name: "help", description: "Get help with the bot's commands", usage: "/help (command)" },
            { name: "ping", description: "Check the bot's latency", usage: "/ping" }
        ]
    },
    
    // Features List
    features: [
        {
            title: "Advanced Moderation",
            description: "Complete moderation toolkit with auto-moderation, logging, and more",
            icon: "fa-shield-alt"
        },
        {
            title: "High Quality Music",
            description: "Crystal clear audio with support for Spotify, YouTube, and more",
            icon: "fa-music"
        },
        {
            title: "Custom Commands",
            description: "Create your own custom commands with our easy-to-use system",
            icon: "fa-code"
        },
        {
            title: "Web Dashboard",
            description: "Full control through our intuitive web interface",
            icon: "fa-tachometer-alt"
        }
    ]
};

// Make config available globally
window.hyperConfig = config;
