const {initializeApp} = require("firebase/app");
const { getDatabase, ref, child, get, onValue, onChildChanged, set } = require("firebase/database");

const { Client, Events, GatewayIntentBits, SlashCommandBuilder, Message } = require('discord.js');
require('dotenv').config();

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBiQ9ZRKcpIQFCS0y-IqIhSVRcKy_-8Q5c",
    authDomain: "gametelemetry-d473a.firebaseapp.com",
    projectId: "gametelemetry-d473a",
    storageBucket: "gametelemetry-d473a.firebasestorage.app",
    messagingSenderId: "915931507296",
    appId: "1:915931507296:web:2ef548acbed4218da0f105",
    measurementId: "G-Q95JG18FPG",
    databaseURL: "https://gametelemetry-41c90-default-rtdb.firebaseio.com"
};
  
const app = initializeApp(firebaseConfig);

const db = getDatabase(app);
const dataRef = ref(db, '/');

// Create a new client instance
const client = new Client({ 
    
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
    ]

});

// When the client is ready, run this code (only once).
client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);

    const test = new SlashCommandBuilder().setName('test').setDescription('bot replies that it is active');
    client.application.commands.create(test, process.env.SERVER_ID)  
});

client.on(Events.InteractionCreate, interaction => {
    if(!interaction.isChatInputCommand()) return;
    if(interaction.commandName === "test") {
        interaction.reply(`Telemetry Bot is Active`)
    }

    if(interaction.commandName === "getdata") {
        console.log(dataRef.realtime_);
        get(child(dataRef, '/'))
        .then((snapshot) => {
            if(snapshot.exists())
            {
                getLastDataEntry.GetData(interaction, JSON.stringify(snapshot));
            }
            else
            {
                console.error("No data in database")
            }
        })
        .catch((error) => {
            console.error(error);
        })
    }
});

onChildChanged(dataRef, async (snapshot) => {
    if(snapshot.val() != null)
    {
        GetTelemetryData(snapshot.val());
    }

    async function GetTelemetryData(JsonData)
    {
        for(let i = 0; i < JsonData.length; i++)
        {
            console.log(`------- \n${JSON.stringify(JsonData[i])}`);

            client.channels.cache.get("1357820815999107219").send(`values updated: \n **${JsonData[i].Name || "Unknown player"}** ${(await GetPuzzleTime(JsonData[i].puzzles)).toString()}`);
        }
    }

    async function GetPuzzleTime(puzzleTimeObject) { 

        let puzzleTimes = "";
        for(let i = 0; i < Object.keys(puzzleTimeObject).length; i++)
        {
            puzzleTimes += (`\n- Puzzle ${i + 1} time taken: ${(Object.values(puzzleTimeObject)[i])} Seconds`)
        } 
        return puzzleTimes;
    }
});
  
module.exports = {client, db};