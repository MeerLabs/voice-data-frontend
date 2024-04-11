from azure.storage.fileshare import ShareDirectoryClient
conn_string = "DefaultEndpointsProtocol=https;EndpointSuffix=core.windows.net;AccountName=ttsproject0823515005;AccountKey=i3QsEg7tqmvWRV/pZGk1CqtWG+ofAZPeiy4E5LD4xXlh75EbVnNWJkcZISSEM8c8zwJvL0KLuYbO+AStrDFztQ==;BlobEndpoint=https://ttsproject0823515005.blob.core.windows.net/;FileEndpoint=https://ttsproject0823515005.file.core.windows.net/;QueueEndpoint=https://ttsproject0823515005.queue.core.windows.net/;TableEndpoint=https://ttsproject0823515005.table.core.windows.net/"
share_string = "azureml-filestore-a851e116-f69f-4c5c-80fb-5aa682b74741"
parent_dir = ShareDirectoryClient.from_connection_string(conn_str=conn_string, share_name=share_string, directory_path="")
my_list = list(parent_dir.list_directories_and_files())
print(my_list)