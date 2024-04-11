from azure.storage.fileshare import ShareFileClient
import sys
from datetime import datetime


conn_str = "DefaultEndpointsProtocol=https;EndpointSuffix=core.windows.net;AccountName=ttsproject0823515005;AccountKey=i3QsEg7tqmvWRV/pZGk1CqtWG+ofAZPeiy4E5LD4xXlh75EbVnNWJkcZISSEM8c8zwJvL0KLuYbO+AStrDFztQ==;BlobEndpoint=https://ttsproject0823515005.blob.core.windows.net/;FileEndpoint=https://ttsproject0823515005.file.core.windows.net/;QueueEndpoint=https://ttsproject0823515005.queue.core.windows.net/;TableEndpoint=https://ttsproject0823515005.table.core.windows.net/"
share_name="azureml-filestore-a851e116-f69f-4c5c-80fb-5aa682b74741"

def upload_file_to_azure(fpath):

    # Generate the current date and time
    current_time = datetime.now()   
    # Format the current date and time as a string (e.g., "YYYY-MM-DD_HH-MM-SS")
    timestamp_str = current_time.strftime("%Y-%m-%d_%H-%M-%S")

    # Initialize the ShareFileClient with the provided connection string and file path
    service_client = ShareFileClient.from_connection_string(conn_str, share_name=share_name, file_path=f'{timestamp_str}.webm')

    # Upload the local file to the Azure File Share
    with open(fpath, "rb") as file:
        service_client.upload_file(file)

if __name__ == "__main__":
    fpath = sys.argv[1]

    # Call the function to upload the file to Azure File Share
    upload_file_to_azure(fpath)
