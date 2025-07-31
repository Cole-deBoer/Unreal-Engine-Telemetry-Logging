const {initializeApp} = require("firebase/app");
const { getDatabase, ref, onChildChanged } = require("firebase/database");

const { Client, Events, GatewayIntentBits, SlashCommandBuilder, Message } = require('discord.js');
require('dotenv').config();

const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGE_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID,
    databaseURL: process.env.DATABASE_URL
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

            client.channels.cache.get(process.env.CHANNEL_ID).send(`values updated: \n **${JsonData[i].Name || "Unknown player"}** ${(await GetPuzzleTime(JsonData[i].puzzles)).toString()}`);
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