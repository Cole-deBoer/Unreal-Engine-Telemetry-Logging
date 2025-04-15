const { SlashCommandBuilder } = require('discord.js');
require('dotenv').config();

module.exports = {
    command: new SlashCommandBuilder()
        .setName('getdata')
        .setDescription('gets the most recent player telementry'),
    
    async GetData(interaction, dataRef) {
        const JsonData = JSON.parse(dataRef);
        interaction.reply(`## ${(JsonData.playerName.toString())}'S DATA: \n ## Time taken: ${(await this.GetPuzzleTime(JsonData.playerName.timeTaken)).toString()}`);
    },
    async GetPuzzleTime(puzzleTimeObject) { 

        let puzzleTimes = "";
        for(let i = 0; i < Object.keys(puzzleTimeObject).length; i++)
        {
            puzzleTimes += (`\n- Puzzle ${i + 1} time taken: ${Object.values(puzzleTimeObject)[i]} Seconds`)
        } 
        return puzzleTimes;
    }    
}