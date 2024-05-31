import React, { useState } from 'react';

interface Reply {
    id: number;
    publisher: string;
    content: string;
}

interface StoryCardProps {
    user_id: number;
    soldier_id: number;
    image: string;
    content: string;
    initialReplies?: Reply[];
}

const StoryCard: React.FC<StoryCardProps> = ({
                                                 user_id,
                                                 soldier_id,
                                                 image,
                                                 content,
                                                 initialReplies = [],
                                             }) => {
    const [replies, setReplies] = useState<Reply[]>(initialReplies);
    const [newReply, setNewReply] = useState('');
    const [replyPublisher, setReplyPublisher] = useState('');

    const handleAddReply = () => {
        if (newReply.trim() !== '' && replyPublisher.trim() !== '') {
            setReplies([...replies, { id: replies.length + 1, publisher: replyPublisher, content: newReply }]);
            setNewReply('');
            setReplyPublisher('');
        }
    };

    return (
        <div className="border rounded-lg p-4 mb-4 shadow-lg relative">
            <img src={image} alt={soldier_id + ''} className="w-16 h-16 rounded-full absolute top-4 left-4" />
            <div className="ml-20">
                <h2 className="text-xl font-bold">{user_id}</h2>
                <h3 className="text-md font-semibold text-gray-700">{soldier_id}</h3>
                <p className="mt-2">{content}</p>
                <div className="mt-4">
                    <h4 className="text-md font-semibold">Replies:</h4>
                    <ul>
                        {replies.map((reply) => (
                            <li key={reply.id} className="border-t mt-2 pt-2">
                                <p className="font-semibold">{reply.publisher}</p>
                                <p>{reply.content}</p>
                            </li>
                        ))}
                    </ul>
                    <input
                        type="text"
                        className="w-full p-2 border rounded mt-2"
                        value={replyPublisher}
                        onChange={(e) => setReplyPublisher(e.target.value)}
                        placeholder="Your Name"
                    />
                    <textarea
                        className="w-full p-2 border rounded mt-2"
                        rows={2}
                        value={newReply}
                        onChange={(e) => setNewReply(e.target.value)}
                        placeholder="Write a reply..."
                    ></textarea>
                    <button onClick={handleAddReply} className="mt-2 p-2 bg-blue-500 text-white rounded">
                        Add Reply
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StoryCard;
