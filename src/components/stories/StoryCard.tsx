import React, { useState } from 'react';
import Image from 'next/image';
import {useAuth} from "@/context/AuthContext";
import './StoryCard.css';
import MessagesContainer from "@/components/common/MessagesContainer";
import {FormattedMessage} from "react-intl";

interface Reply {
    story_id: string;
    content: string;
    user_name: string;
}

const StoryCard = ({
             story_id,
             user_name,
             soldier_name,
             image,
             content,
             initialReplies = [],
                locale
         }: {
    story_id: string;
    user_name: string;
    soldier_name: string;
    image: string;
    content: string;
    initialReplies?: Reply[];
    locale: string;
}) => {
    const [replies, setReplies] = useState<Reply[]>(initialReplies);
    const [newReply, setNewReply] = useState('');
    const { user } = useAuth();

    const handleAddReply = async () => {
        console.log('what');
        if (user && newReply.trim() !== '') {
            const newReplyObject: Reply = {
                story_id: story_id,
                user_name: user.username,
                content: newReply,
            };
            const res = await fetch('/api/publishReply', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': process.env.NEXT_PUBLIC_API_SECRET!
                },
                body: JSON.stringify(newReplyObject)
            });

            if (res.ok) {
                setReplies([...replies, newReplyObject]);
                setNewReply('');
            } else {
                console.log('כישלון: ' + (await res.json()).error || 'שגיאה לא ידועה');
            }
        }
    };

    return (
        <MessagesContainer locale={locale}>
            <div className="cardContainer">
                <Image src={image} alt={soldier_name + ''} className="cardImage" width={100} height={100} />
                <div className="cardContentContainer">
                    <h2 className="cardTitle">
                        <FormattedMessage id="storyCard.writtenBy" />: {user_name}
                    </h2>
                    <h3 className="cardSoldier">
                        <FormattedMessage id="storyCard.soldierName" />: {soldier_name}
                    </h3>
                    <p className="cardContent">{content}</p>
                    <div className="cardRepliesContainer">
                        <h4 className="cardRepliesHeader">
                            <FormattedMessage id="storyCard.replies" />:
                        </h4>
                        <ul>
                            {replies.map((reply, index) => (
                                <li key={index} className="cardReply">
                                    <p className="cardRepliesHeader">
                                        <FormattedMessage id="storyCard.writtenBy" />: {reply.user_name}
                                    </p>
                                    <p>{reply.content}</p>
                                </li>
                            ))}
                        </ul>
                        {user && (
                            <div>
                                <hr />
                                <textarea
                                    className="w-full p-2 border rounded mt-2"
                                    rows={2}
                                    value={newReply}
                                    onChange={(e) => setNewReply(e.target.value)}
                                ></textarea>

                                <button onClick={handleAddReply} className="mt-2 p-2 bg-blue-500 text-white rounded">
                                    <FormattedMessage id="storyCard.addReply" />
                                </button>
                            </div>
                        )}
                        {
                            !user && (
                                <span>
                                    <FormattedMessage id="storyCard.loginToAddReply" />
                                </span>
                            )
                        }
                    </div>
                </div>
            </div>
        </MessagesContainer>
    );
};

export default StoryCard;
