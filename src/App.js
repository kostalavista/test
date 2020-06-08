import React, {useEffect, useState} from 'react';
import {hubConnectionChat} from "./sockets";

const App = () => {
  useEffect(() => {
    console.log('started');

    hubConnectionChat.start()
    .then(() => {
      console.log('hubConnectionChat started')
    }).catch(error => {
      console.log(error)
    });

    hubConnectionChat.on('Send', messageModel => {
      console.log(messageModel)
    });
  }, []);

  const sendMessage = () => {
    hubConnectionChat.invoke('Send', '11111111111')
    .catch(err => {
      console.log(err);
    });
  };

  return (
    <div>
      <button onClick={sendMessage}>Send text</button>
    </div>
  );
};

export default App;