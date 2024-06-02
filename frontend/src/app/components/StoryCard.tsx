import React, { useState } from 'react';
import Image from 'next/image';

interface Reply {
    content: string;
    user_name: string;
}

interface StoryCardProps {
    user_name: string;
    soldier_name: string;
    image: string;
    content: string;
    initialReplies?: Reply[];
}

const StoryCard: React.FC<StoryCardProps> = ({
                                                 user_name,
                                                 soldier_name,
                                                 image,
                                                 content,
                                                 initialReplies = [],
                                             }) => {
    const [replies, setReplies] = useState<Reply[]>(initialReplies);
    const [newReply, setNewReply] = useState('');
    const [replyPublisher, setReplyPublisher] = useState('');

    const handleAddReply = () => {
        if (newReply.trim() !== '' && replyPublisher.trim() !== '') {
            setReplies([...replies, { user_name: replyPublisher, content: newReply }]);
            setNewReply('');
            setReplyPublisher('');
        }
    };

    return (
        <div className="border rounded-lg p-4 mb-4 shadow-lg relative">
            <Image src={image} alt={soldier_name + ''} className="w-16 h-16 rounded-full absolute top-4 left-4" width={100} height={100} />
            <div className="ml-20">
                <h2 className="text-xl font-bold">{"נכתב על ידי: " + user_name}</h2>
                <h3 className="text-md font-semibold text-gray-700">{"שם הנופל: " + soldier_name}</h3>
                <p className="mt-2">{content}</p>
                <div className="mt-4">
                    <h4 className="text-md font-semibold">תגובות:</h4>
                    <ul>
                        {replies.map((reply, index) => (
                            <li key={index} className="border-t mt-2 pt-2">
                                <p className="font-semibold">{"נכתב על ידי: " + reply.user_name}</p>
                                <p>{reply.content}</p>
                            </li>
                        ))}
                    </ul>
                    <textarea
                        className="w-full p-2 border rounded mt-2"
                        rows={2}
                        value={newReply}
                        onChange={(e) => setNewReply(e.target.value)}
                        placeholder="כתוב תגובה..."
                    ></textarea>
                    <button onClick={handleAddReply} className="mt-2 p-2 bg-blue-500 text-white rounded">
                        הוסף תגובה
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StoryCard;
