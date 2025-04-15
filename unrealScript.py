import unreal
import json
import os
import requests

FIREBASE_URL = "https://gametelemetry-41c90-default-rtdb.firebaseio.com/telemetry_data.json"
LOCAL_JSON_RELATIVE_PATH = os.path.join("Content", "Blueprints", "Telemetry", "Data", "dataTest.json")

project_dir = unreal.SystemLibrary.get_project_directory()
json_file_path = os.path.normpath(os.path.join(project_dir, LOCAL_JSON_RELATIVE_PATH))

json_data = None

try:
    with open(json_file_path, 'r') as f:
        json_data = json.load(f)
        print("✅ JSON loaded and validated successfully.")
        print(json.dumps(json_data, indent=4))  # Optional: pretty print to log
except json.JSONDecodeError as json_err:
    print(f"Invalid JSON file: {json_err}")
except FileNotFoundError:
    print(f"File not found at: {json_file_path}")
except Exception as e:
    print(f"Error while reading JSON: {e}")

# --- SEND TO FIREBASE IF VALID --- #
if json_data:
    try:
        response = requests.put(FIREBASE_URL, json=json_data)

        if response.ok:
            print("Firebase update successful:")
            print(response.json())
        else:
            print(f"Firebase update failed. Status: {response.status_code}, Message: {response.text}")

    except Exception as e:
        print(f"Failed to send data to Firebase: {e}")
