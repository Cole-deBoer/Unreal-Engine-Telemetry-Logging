# Game Telemetry System

A real-time game telemetry system that captures player performance data from Unreal Engine and broadcasts it to Discord channels via Firebase integration.

## Overview

This system consists of three main components:
- **Unreal Engine Integration**: Captures telemetry data from gameplay
- **Node.js Backend**: Processes and forwards data to Firebase
- **Discord Bot**: Broadcasts real-time updates to Discord channels

## Architecture

```
Unreal Engine → JSON Export → Node.js Server → Firebase Database → Discord Bot → Discord Channel
```

## Prerequisites

- Node.js (v14 or higher)
- npm package manager
- Unreal Engine 5.x
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
PORT=3000

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

**Note**: The `.env` file is not included in the repository for security reasons. Contact the project maintainer for the required environment variables.

### 3. Unreal Engine Setup

1. Extract the `TelemetryTest.zip` file to your Unreal Engine projects directory
2. Open the Unreal project in the editor
3. Locate and run the Editor Utility Widget
4. Click the telemetry capture button to begin data collection

## Usage

### Starting the Backend Server

```bash
npm start
```

The server will start on the configured port (default: 3000) and begin listening for telemetry data.

### Data Flow

1. **Data Capture**: The Unreal Engine project captures player telemetry data during gameplay
2. **JSON Export**: Data is exported to a JSON file named `dataTest.json` in the Data directory
3. **Server Processing**: The Node.js server reads the JSON file and forwards it to Firebase
4. **Discord Broadcasting**: The Discord bot monitors Firebase for changes and posts updates to the configured channel

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

**Important**: The JSON file must be named `dataTest.json` and contain fresh data for updates to be processed.

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
- **Rules**: Read/write access until May 9, 2025

## Development

### Project Structure

```
├── src/
│   └── index.js          # Discord bot and Firebase integration
├── public/               # Firebase hosting files
├── server.js             # Express server and API endpoints
├── package.json          # Dependencies and scripts
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
4. **Port Conflicts**: Change the PORT environment variable if port 3000 is already in use

### Debug Mode

Enable detailed logging by adding console.log statements in the relevant files:
- `src/index.js` for Discord bot debugging
- `server.js` for API endpoint debugging

## Security Notes

- Keep your `.env` file secure and never commit it to version control
- The Firebase configuration is public but should be reviewed for production use
- Database rules are set to expire on May 9, 2025

## License

This project is licensed under the ISC License.

## Support

For technical support or questions about the telemetry system, contact the project maintainer or refer to the Discord channel where the bot is deployed.
