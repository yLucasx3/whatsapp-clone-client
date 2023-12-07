import Image from 'next/image';
import { gql } from '@apollo/client';
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { useAppDispatch } from '@/redux/hooks';
import { setCurrentConversation } from '@/redux/features/conversationSlice';
import { useSession } from 'next-auth/react';
import SearchInput from '../SearchInput';
import { toggleModal } from '@/redux/features/modalSlice';
import LeftModal from './left-modal';
export const dynamic = 'force-dynamic';

export interface User {
  _id: string;
  displayName: string;
  picture: string;
  email: string;
}

const query = gql`
  query {
    users {
      _id
      displayName
      picture
      email
    }
  }
`;

const NewConversationModal = () => {
  const { data } = useSuspenseQuery(query) as { data: { users: User[] } };

  const dispatch = useAppDispatch();

  const { data: session } = useSession();

  return (
    <LeftModal type="newConversation" title="New Conversation">
      <SearchInput placeholder="Search users" hideFilterIcon />
      {data.users
        .filter((user) => user.email !== session?.user?.email)
        .map(({ email, displayName, picture }) => (
          <div
            key={email}
            onClick={() => {
              dispatch(
                setCurrentConversation({
                  conversation: '',
                  recipient: { displayName, email, picture }
                })
              );
              dispatch(toggleModal('newConversation'));
            }}
            className="flex px-6 pt-4 gap-2 cursor-pointer bg-dark-level-3 hover:bg-dark-level-3-opacity">
            <div className="flex justify-center items-center">
              <Image
                src={picture}
                width={49}
                height={49}
                alt="Conversation Picture"
                className="rounded-full mr-3"
              />
            </div>
            <div className="flex w-full flex-col py-4 pb-2 border-b border-slate-800">
              <div className="flex w-full">
                <span className="text-slate-300 font-medium">
                  {displayName}
                </span>
              </div>
              <div className="flex text-sm text-slate-400">recadinho</div>
            </div>
          </div>
        ))}
    </LeftModal>
  );
};

export default NewConversationModal;
