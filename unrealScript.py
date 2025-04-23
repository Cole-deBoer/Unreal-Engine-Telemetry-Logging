import unreal
import json
import os
import urllib.request

FIREBASE_URL = "https://gametelemetry-41c90-default-rtdb.firebaseio.com/telemetry_data.json"
LOCAL_JSON_RELATIVE_PATH = os.path.join("Content", "Blueprints", "Telemetry", "Data", "dataTest.json")

project_dir = unreal.SystemLibrary.get_project_directory()
json_file_path = os.path.normpath(os.path.join(project_dir, LOCAL_JSON_RELATIVE_PATH))

json_data = None

try:
    with open(json_file_path, 'r') as f:
        json_data = json.load(f)
        print("JSON loaded and validated successfully.")
        print(json.dumps(json_data, indent=4))
except json.JSONDecodeError as json_err:
    print(f"Invalid JSON file: {json_err}")
except FileNotFoundError:
    print(f"File not found at: {json_file_path}")
except Exception as e:
    print(f"Error while reading JSON: {e}")

# --- SEND TO FIREBASE IF VALID --- #
if json_data:
    try:
        data_bytes = json.dumps(json_data).encode('utf-8')
        req = urllib.request.Request(FIREBASE_URL, data=data_bytes, method='PUT', headers={
            'Content-Type': 'application/json'
        })
        with urllib.request.urlopen(req) as response:
            response_data = response.read().decode('utf-8')
            print("Firebase update successful:")
            print(response_data)
    except Exception as e:
        print(f"Failed to send data to Firebase: {e}")
