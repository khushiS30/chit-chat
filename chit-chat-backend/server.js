//importing
import express from 'express'
import mongoose from 'mongoose'
import Messages from './dbMessages.js'
import Pusher from 'pusher'
import cors from "cors";


//app config
const app = express()
const port = process.env.PORT || 9000

const pusher = new Pusher({
    appId: "1268699",
    key: "cdda731302d343fd99eb",
    secret: "563e916d3bbcc07f6a5d",
    cluster: "eu",
    useTLS: true
  });

//middlewares
app.use(express.json());
app.use(cors());



//DB config
const connection_url = 'mongodb+srv://admin:khushims12345@cluster0.qlubv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

mongoose.connect(connection_url,{
    useNewUrlParser: true, 

useUnifiedTopology: true 

}, err => {
if(err) throw err;
console.log('Connected to MongoDB!!!')
});

const db = mongoose.connection;

db.once("open", () => {
    console.log("DB connected")

    const msgCollection = db.collection("messagecontents");
    const changeStream = msgCollection.watch();

    changeStream.on("change", (change) => {
        console.log(change);

        if(change.operationType === "insert") {
            const messageDetails = change.fullDocument;
            pusher.trigger("messages","inserted", {
                name:messageDetails.name,
                message: messageDetails.message,
                timestamp: messageDetails.timestamp,
                received: messageDetails.received,
            });
        } else {
            console.log("Error triggering Pusher")
        }
    })
})


//api routes
app.get('/',(req,res) =>res.status(200).send('hello world'));

app.get('/messages/sync', (req, res) => {
    Messages.find((err, data) => {         //it will give us all the messages
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
})

app.post("/messages/new", (req, res) => {
    const dbMessage = req.body;

    Messages.create(dbMessage, (err, data) => {
        if(err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(data)
        }
    })
})


//listen
app.listen(port,() => console.log(`Listening on localhost ${port}`)) 