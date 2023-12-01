import React from 'react';
import Image from 'next/image';
import { useAppDispatch } from '@/redux/hooks';
import {
  Recipient,
  setConversation,
  setCurrentConversation
} from '@/redux/features/conversationSlice';

interface ConversationProps {
  id: string;
  recipient: Recipient;
  lastMessage: {
    content: string;
    createdAt: string;
  };
}

const Conversation = ({ id, recipient, lastMessage }: ConversationProps) => {
  const dispatch = useAppDispatch();

  const { picture, displayName, email } = recipient;

  return (
    <div
      className="flex px-3 pt-4 cursor-pointer bg-dark-level-3 hover:bg-dark-level-3-opacity"
      onClick={() =>
        dispatch(
          setConversation({
            currentConversation: id,
            recipient: {
              displayName,
              email,
              picture
            }
          })
        )
      }>
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
        <div className="flex justify-between w-full pr-2 ">
          <span className="text-base text-white">
            <b>{displayName}</b>
          </span>
          <span className="text-xs text-slate-400">
            {lastMessage.createdAt}
          </span>
        </div>
        <div className="flex text-sm text-slate-400">{lastMessage.content}</div>
      </div>
    </div>
  );
};

export default Conversation;
