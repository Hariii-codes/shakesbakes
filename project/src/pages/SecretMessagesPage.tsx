import React from 'react';
import { MessageSquareHeart } from 'lucide-react';
import { useGrievanceStore } from '../store/useGrievanceStore';
import SecretMessageForm from '../components/SecretMessageForm';
import SecretMessageList from '../components/SecretMessageList';

const SecretMessagesPage: React.FC = () => {
  const secretMessages = useGrievanceStore(state => state.secretMessages);
  
  return (
    <div>
      <div className="flex items-center mb-6">
        <MessageSquareHeart className="text-secondary-500 mr-2" size={24} />
        <h1 className="text-2xl font-bold text-gray-800">Secret Messages</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <SecretMessageForm />
        </div>
        
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-5">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Message History
            </h2>
            <SecretMessageList messages={secretMessages} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecretMessagesPage;