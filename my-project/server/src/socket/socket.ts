import { Server } from 'socket.io';
import { Chat } from '../models/chat';
import { loadChat, saveChat } from '../utils/fileUtils';

const configureSocket = (io: Server) => {
  io.on('connection', (socket) => {
    console.log('A user connected');
    const chats = loadChat();
    io.emit('initialMessages', chats)

    socket.on('message', (msg: Chat) => {
      console.log('Message received:', msg);

      const newChat: Chat = {
        id: Date.now(),
        text: msg.text,
      }

      const chats = loadChat();

      chats.push(newChat);

      saveChat(chats);

      io.emit('message', newChat);
      io.emit('updateChats', chats);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });
};

export default configureSocket;
