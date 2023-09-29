db.weathers.insertOne({
    temp: 30,
    min_temp:25, 
    max_temp:30, 
    humidity: 79, 
    clouds:50,
    desc:"clouds", 
    timestamp:
"Sat Sep 23 2023 15:38:21 GMT+0200 (czas środkowoeuropejski letni)"
})

db.weathers.deleteOne({
    _id:ObjectId("65151fc2f3991970d651146d")
})

db.weathers.updateOne(
    { _id:ObjectId("65152057f3991970d651146e") }, 
    {
        $set: {
           clouds:99, 
           humidity:76 
        }
    }
)

db.weather.find({}).sort({clouds: -1})


db.weathers.find({
    $and: [
        {clouds: {$gt:60}},
        {humidity:{$lt: 70}}
    ]
})



db.runCommand({
    collMod:"weathers",
    validator: {
        $jsonSchema:{
            
                bsonType: 'object',
                required: [
                  'temp',
                  'min_temp',
                  'max_temp',
                  'humidity',
                  'clouds',
                  'desc',
                  'timestamp'
                ],
                properties: {
                  temp: {
                    bsonType: 'int',
                    description: 'Temp must be a int'
                  },
                  min_temp: {
                    bsonType: 'int',
                    description: 'Min temp must be a int'
                  },
                  max_temp: {
                    bsonType: 'int',
                    description: 'Max Temp must be a int'
                  },
                  humidity: {
                    bsonType: 'int',
                    description: 'Humidity must be a int'
                  },
                  clouds: {
                    bsonType: 'int',
                    description: 'Clouds must be a int'
                  },
                  desc: {
                    bsonType: 'string',
                    description: 'Desc must be a string'
                  },
                  timestamp: {
                    bsonType: 'string',
                    description: 'Timestamp must be a string'
                  }
                }
              
        }
    }
})


