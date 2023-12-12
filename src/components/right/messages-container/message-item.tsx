import React from 'react';
import { useSession } from 'next-auth/react';
import { timeFormat } from '@/utils/functions';

interface MessageProps {
  content: string;
  sender: string;
  createdAt: string;
}

const messagesColor = {
  receiver: '#202c33',
  sender: '#005c4b'
};

const MessageItem = ({ content, sender, createdAt }: MessageProps) => {
  const { data: session } = useSession();

  const currentUser = session?.user?.email;

  return (
    <div
      className={`flex space-between text-sm font-light rounded-md mb-1 max-w-md text-white ${
        sender === currentUser ? 'self-end' : 'justify-self-start'
      }`}
      style={{
        background:
          sender === currentUser ? messagesColor.sender : messagesColor.receiver
      }}>
      <span className="p-2">{content}</span>
      <span
        style={{ fontSize: '11px' }}
        className="pr-2 self-end justify-self-end text-slate-300">
        {timeFormat(new Date(createdAt))}
      </span>
    </div>
  );
};

export default MessageItem;
