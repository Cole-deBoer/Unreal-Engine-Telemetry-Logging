# Game Telemetry System

A real-time game telemetry system that captures player performance data from Unreal Engine and broadcasts it to Discord channels via Firebase integration.

## Overview

This system consists of four main components:
- **Unreal Engine Integration**: Captures telemetry data from gameplay
- **Node.js Backend**: Processes and forwards data to Firebase
- **Discord Bot**: Broadcasts real-time updates to Discord channels
- **Firebase Realtime DB**: Stores the data that gets forwarded to the Discord bot.

### **example video:**
![2025-04-1423-07-51-ezgif com-video-to-gif-converter](https://github.com/user-attachments/assets/c81f54d9-b3e9-4876-9c44-120793bf5acc)

## Prerequisites

- Node.js
- Unreal Engine 5
- Discord Bot Token
- Firebase Project
- Environment variables configured

## Installation

### 1. Clone and Setup

```bash
git clone <repository-url>
cd PG27_ColedeBoer_A1_DevTools-main
npm install
```

### 2. Environment Configuration

Create a `.env` file in the project root with the following variables:

```env
CLIENT_TOKEN=your_discord_bot_token
SERVER_ID=your_discord_server_id
PORT=3000
```

**Note**: The `.env` file is not included in the repository for security reasons. For this reason you must set up your own .env file. Additionally, You will need to setup your own firebase project and realtime database to connect to.


### 3. Unreal Engine Setup

1. Extract the `TelemetryTest.zip` file to your Unreal Engine projects directory
2. Open the Unreal project in the editor
3. Locate and run the Editor Utility Widget

## Usage

### Starting the Backend Server

```bash
npm start
```

The server will start on the configured port and begin listening for telemetry data.

### Expected JSON Format

The telemetry system expects JSON data in the following format:

```json
[
  {
    "Name": "PlayerName",
    "puzzles": {
      "puzzle1": 45,
      "puzzle2": 32,
      "puzzle3": 67
    }
  }
]
```

**Important**: The python script is currently expecting a JSON file named `dataTest.json` You can change the expected name by editing the python script within the Widget Blueprint.

## API Endpoints

### GET /data
Retrieves all JSON files from the Data directory and returns their contents.

### PUT /send
Updates the Firebase database with new telemetry data.

## Discord Commands

- `/test` - Verifies the bot is active and responding
- `/getdata` - Retrieves the latest telemetry data from Firebase

## Firebase Configuration

The project uses Firebase Realtime Database for data storage. The configuration is pre-configured in `src/index.js`:

- **Project ID**: gametelemetry-d473a
- **Database URL**: https://gametelemetry-41c90-default-rtdb.firebaseio.com


### Project Structure

```
├── src/
│   └── index.js          # Discord bot and Firebase integration
├── public/               # Firebase hosting files
├── server.js             # Express server and API endpoints
├── package.json          # Dependencies and scripts
|
├── firebase.json         # Firebase configuration
└── database.rules.json   # Firebase security rules
```

### Available Scripts

- `npm start` - Starts the development server with nodemon
- `npm run dev` - Alternative development command
- `npm test` - Placeholder for test suite

### Dependencies

- **discord.js**: Discord bot functionality
- **express**: Web server framework
- **firebase**: Firebase Realtime Database integration
- **dotenv**: Environment variable management
- **nodemon**: Development server with auto-restart

## Troubleshooting

### Common Issues

1. **Bot Not Responding**: Verify the Discord bot token and server ID in your `.env` file
2. **Data Not Updating**: Ensure the JSON file contains new data and is named `dataTest.json`
3. **Firebase Connection**: Check that the Firebase configuration is correct and the project is active
4. **Port Conflicts**: Change the PORT environment variable if the port you selected is already in use

## Security Notes

- Keep your `.env` file secure and never commit it to version control
- The Firebase configuration is public but should be reviewed for production use

## Support

For technical support or questions about the telemetry system, contact the project maintainer or refer to the Discord channel where the bot is deployed.

