const { MongoClient } = require('mongodb');

async function main(){
    const client = new MongoClient('mongodb://localhost:27017', () => {
        useUnifiedTopology: true;
    });

    try{
        await client.connect();

        const db = client.db('mydb');
        const collection = db.collection('products');

        const product = {
            number: 123,
            name: 'Orange',
            quantity: 10,
            price: 30.23,
        };

        const result = await collection.insertOne(product);

        const cursor = collection.find({});
        const users = await cursor.toArray();
        console.log(users);
    } catch (error){
        console.error(error);
    }
}

main();