# Game Telemetry System

A real-time game telemetry system that captures player performance data from Unreal Engine and broadcasts it to Discord channels via Firebase integration.

## Overview

This system consists of three main components:
- **Unreal Engine Integration**: Reads data from JSON and sends it to the Firebase realtime database.
- **Firebase**: Stores the data that gets forwarded to the Discord bot.
- **Discord Bot**: Broadcasts Real-time updates to Discord channels

### **Example Video:**
![2025-04-1423-07-51-ezgif com-video-to-gif-converter](https://github.com/user-attachments/assets/c81f54d9-b3e9-4876-9c44-120793bf5acc)

## Prerequisites

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
# Discord Bot Configuration
CLIENT_TOKEN=your_discord_bot_token
CHANNEL_ID=your_discord_channel_id

# Server Configuration
PORT=xxxx

# Firebase Configuration
API_KEY=your_firebase_api_key
AUTH_DOMAIN=your_firebase_auth_domain
PROJECT_ID=your_firebase_project_id
STORAGE_BUCKET=your_firebase_storage_bucket
MESSAGE_SENDER_ID=your_firebase_messaging_sender_id
APP_ID=your_firebase_app_id
MEASUREMENT_ID=your_firebase_measurement_id
DATABASE_URL=your_firebase_database_url
```

**Note**: The `.env` file is not included in the repository for security reasons. For this reason you must set up your own .env file. Additionally, You will need to setup your own firebase project and realtime database to connect to.


### 3. Unreal Engine Setup

1. Create a Editor Utility Widget.
2. run the python script from a button press in the editor utility widget. 

**Important**: The python script is currently looking for the JSON file under Content/Blueprints/Telemetry/Data/dataTest.json. Feel free to update the path that it is looking under to fit your needs.

## Usage

### Starting the Backend Server

```bash
npm start
```

The server will start on the configured port and begin listening for telemetry data.

### Expected JSON Format

The telemetry system expects JSON data in the following format, feel free to tweak this as needed:

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

## Discord Commands

- `/test` - Verifies the bot is active and responding
- `/getdata` - Retrieves the latest telemetry data from Firebase

## Firebase Configuration

The project uses Firebase Realtime Database for data storage. To use this project as is, you will need to setup your own firebase project.

**Important**: Ensure you put all the neccessary information within your .env file to fulfuill.

### Project Structure

```
├── src/
│   └── index.js          # Discord bot and Firebase integration
├── package.json          # Dependencies and scripts
├── .env                  # File that contains sensitve information
├── firebase.json         # Firebase configuration
└── database.rules.json   # Firebase security rules
```

### Available Scripts

- `npm start` - Starts the development server with nodemon

### Dependencies

- **discord.js**: Discord bot functionality
- **firebase**: Firebase Realtime Database integration
- **dotenv**: Environment variable management
- **nodemon**: Development server with auto-restart

## Troubleshooting

### Common Issues

1. **Bot Not Responding**: Verify the Discord bot token and server ID in your `.env` file
2. **Data Not Updating**: Ensure the JSON file contains new data and is named properly
3. **Firebase Connection**: Check that the Firebase configuration is correct and the project is active
4. **Port Conflicts**: Change the PORT environment variable if the port you selected is already in use

## Security Notes

- Keep your `.env` file secure and never commit it to version control
