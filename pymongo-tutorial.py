from pymongo import MongoClient

# Replace <password> with your database user's password
# Replace <dbname> with your database name
connection_string = "mongodb+srv://sustainhackathon2024:<password>@cluster0.wqu55zb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

# Initialize the client
client = MongoClient(connection_string)

# Select the database and collection
db = client['mydatabase']
collection = db['mycollection']

# Insert a document
result = collection.insert_one({'name': 'Kevin', 'calories': 2500})
print(f'Inserted document id: {result.inserted_id}')

# Find a document
user = collection.find_one({'name': 'Kevin'})
print(user)

# Update a document
collection.update_one({'name': 'Kevin'}, {'$set': {'calories': 5000}})

# Find updated document
updated_user = collection.find_one({'name': 'Kevin'})
print(updated_user)

# Delete a document
# collection.delete_one({'name': 'Kevin'})
