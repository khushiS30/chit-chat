import { useEffect, useState } from 'react';
import './App.css';
import Chat from './Chat';
import Sidebar from './Sidebar';
import Pusher from 'pusher-js';
import axios from './axios'


function App() {
  const [messages, setMessages] = useState([]);
  //fetching all the messages
  useEffect(() => {
    axios.get('/messages/sync')
    .then(response => {
     
      setMessages(response.data);
    })
  }, []);

  //once
  useEffect(() => {
    const pusher = new Pusher('cdda731302d343fd99eb', {
      cluster: 'eu'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', (newMessage) => {
     setMessages([...messages, newMessage])  //it will have all the previous messages and will add the new ones
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };

  }, [messages])

  console.log(messages)

  return (
    <div className="app">
      <div className="app_body">
      <Sidebar />
      <Chat messages ={messages} />
      </div>
      
    </div>
  );
}

export default App;
