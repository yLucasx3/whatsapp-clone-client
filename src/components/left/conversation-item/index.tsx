import React, { useState } from 'react';
import Image from 'next/image';
import { useAppDispatch } from '@/redux/hooks';
import {
  Recipient,
  setCurrentConversation
} from '@/redux/features/conversationSlice';
import { formatDate } from '@/utils/functions';

interface ConversationItemProps {
  id: string;
  recipient: Recipient;
  lastMessage: {
    content: string;
    createdAt: Date;
  };
  unreadMessages?: number;
}

const ConversationItem = ({
  id,
  recipient,
  lastMessage,
  unreadMessages
}: ConversationItemProps) => {
  const [currentUnreadMessages, setCurrentUnreadMessages] =
    useState(unreadMessages);
  const dispatch = useAppDispatch();

  const { picture, displayName, email } = recipient;

  return (
    <div
      className="flex px-3 pt-4 cursor-pointer bg-dark-level-3 hover:bg-dark-level-3-opacity"
      onClick={() => {
        setCurrentUnreadMessages(0);
        dispatch(
          setCurrentConversation({
            conversation: id,
            recipient: {
              displayName,
              email,
              picture
            }
          })
        );
      }}>
      <div className="flex justify-center items-center">
        <Image
          src={picture}
          width={49}
          height={49}
          alt="Conversation Picture"
          className="rounded-full mr-3"
        />
      </div>
      <div className="flex w-full flex-col py-4 justify-center pb-2 border-b border-slate-800">
        <div className="flex justify-between w-full pr-2">
          <span className="text-base text-white">
            <b>{displayName}</b>
          </span>
          <span className="text-xs text-slate-400">
            {formatDate(lastMessage.createdAt)}
          </span>
        </div>
        <div className="flex text-sm justify-between text-slate-400 pr-2">
          <span>{lastMessage.content}</span>

          {currentUnreadMessages ? (
            <span className="flex items-center justify-center bg-notification text-dark-level-3 p-2 rounded-full h-6 w-6">
              {currentUnreadMessages}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ConversationItem;
