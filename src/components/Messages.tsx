'use client';
import { useAppSelector } from '@/redux/hooks';
import React from 'react';

interface MessageProps {
  message: string;
  senderId: string;
  receiverId: string;
  time: string;
}

const myIdExample = '3jk2ds8a';

const messagesColor = {
  receiver: '#202c33',
  sender: '#005c4b'
};

const Message = ({ message, senderId, time }: MessageProps) => {
  return (
    <span
      className={`p-2 text-sm font-light rounded-md mb-1 max-w-md text-white ${
        senderId === myIdExample ? 'self-end' : 'justify-self-start'
      }`}
      style={{
        background:
          senderId === myIdExample
            ? messagesColor.sender
            : messagesColor.receiver
      }}>
      <div className="flex justify-between gap-2">
        {message}
        <span className="text-xs self-end">{time}</span>
      </div>
    </span>
  );
};

const Messages = () => {
  // const messages: MessageProps[] = [
  //   {
  //     message: 'example sender message',
  //     receiverId: 'gustavinho',
  //     senderId: myIdExample,
  //     time: '00:56'
  //   },
  //   {
  //     message: 'example sender message',
  //     receiverId: 'gustavinho',
  //     senderId: myIdExample,
  //     time: '00:56'
  //   },
  //   {
  //     message: 'example receiver message',
  //     receiverId: myIdExample,
  //     senderId: 'gustavinho',
  //     time: '00:56'
  //   },
  //   {
  //     message: 'example receiver message',
  //     receiverId: myIdExample,
  //     senderId: 'gustavinho',
  //     time: '00:56'
  //   },
  //   {
  //     message: 'example sender message',
  //     receiverId: 'gustavinho',
  //     senderId: myIdExample,
  //     time: '00:56'
  //   },
  //   {
  //     message: 'example sender message',
  //     receiverId: 'gustavinho',
  //     senderId: myIdExample,
  //     time: '00:56'
  //   },
  //   {
  //     message: 'example receiver message',
  //     receiverId: myIdExample,
  //     senderId: 'gustavinho',
  //     time: '00:56'
  //   },
  //   {
  //     message: 'example receiver message',
  //     receiverId: myIdExample,
  //     senderId: 'gustavinho',
  //     time: '00:56'
  //   },
  //   {
  //     message: 'example sender message',
  //     receiverId: 'gustavinho',
  //     senderId: myIdExample,
  //     time: '00:56'
  //   },
  //   {
  //     message: 'example sender message',
  //     receiverId: 'gustavinho',
  //     senderId: myIdExample,
  //     time: '00:56'
  //   },
  //   {
  //     message: 'example receiver message',
  //     receiverId: myIdExample,
  //     senderId: 'gustavinho',
  //     time: '00:56'
  //   },
  //   {
  //     message: 'example receiver message',
  //     receiverId: myIdExample,
  //     senderId: 'gustavinho',
  //     time: '00:56'
  //   }
  // ];

  const messages = useAppSelector((state) => state.messageReducer.messages);

  console.log('messages:', messages);

  return (
    <div className="w-full h-full bg-[url('/background-messages.png')] invert bg-contain overflow-y-auto px-8">
      {/* <div className="w-full h-full overflow-y-auto px-8"> */}
      <div className="flex flex-col invert">
        {messages.map(({ message, senderId, receiverId, time }) => (
          <Message
            key={senderId}
            message={message}
            senderId={senderId}
            receiverId={receiverId}
            time={time}
          />
        ))}
      </div>
    </div>
  );
};

export default Messages;
