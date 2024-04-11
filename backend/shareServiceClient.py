from azure.storage.fileshare import ShareFileClient

string = "DefaultEndpointsProtocol=https;EndpointSuffix=core.windows.net;AccountName=ttsproject0823515005;AccountKey=i3QsEg7tqmvWRV/pZGk1CqtWG+ofAZPeiy4E5LD4xXlh75EbVnNWJkcZISSEM8c8zwJvL0KLuYbO+AStrDFztQ==;BlobEndpoint=https://ttsproject0823515005.blob.core.windows.net/;FileEndpoint=https://ttsproject0823515005.file.core.windows.net/;QueueEndpoint=https://ttsproject0823515005.queue.core.windows.net/;TableEndpoint=https://ttsproject0823515005.table.core.windows.net/"

service_client = ShareFileClient.from_connection_string(conn_str=string, share_name="azureml-filestore-a851e116-f69f-4c5c-80fb-5aa682b74741", file_path="test_file.txt")


# Specify the path to the local file you want to upload
local_file_path = "backend//test.txt"

# Upload the local file to the Azure File Share
with open(local_file_path, "rb") as file:
    service_client.upload_file(file)
