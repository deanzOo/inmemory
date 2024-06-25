import React, { useState } from 'react';
import {FormattedMessage} from "react-intl";
import Select from "react-select";
import {Soldier, Story} from "@/lib/types";
import {useAuth} from "@/context/AuthContext";
import './PublishModal.css'

const PublishModal = ({ isOpen, onClose, onSubmit, family, soldiers }: { isOpen: boolean, onClose: () => void, onSubmit: (story: Story) => void,  family: boolean, soldiers: Soldier[]}) => {
    const { user } = useAuth();
    const [selectedSoldier, setSelectedSoldier] = useState<Soldier | null>(null);
    const [newStory, setNewStory] = useState('');
    const [error, setError] = useState('');

    const handleOverlayClick = (e: any) => {
        if (e.target === e.currentTarget) {
            handleConfirmation();
        }
    };

    const handleConfirmation = () => {
        onClose();
    };

    const handleSelectChange = (newValue: any) => {
        setSelectedSoldier(newValue);
    }

    const handlePublish = async (e: React.FormEvent) => {
        e.preventDefault();
        if (user && selectedSoldier && newStory.trim() !== '') {
            const newStoryObject: Story = {
                user_name: user.username,
                soldier: {
                    name: selectedSoldier.name,
                    image: selectedSoldier.image,
                },
                solder_id: selectedSoldier._id,
                content: newStory,
                family: family,
                replies: []
            };
            const res = await fetch('/api/publishStory', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': process.env.NEXT_PUBLIC_API_SECRET!
                },
                body: JSON.stringify(newStoryObject)
            });

            if (res.ok) {
                onSubmit(newStoryObject);
                setNewStory('');
            } else {
                setError('כישלון: ' + (await res.json()).error || 'שגיאה לא ידועה');
            }
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <span>{error}</span>
            <div className="modal">
                <button className="modal-close" onClick={handleConfirmation}>X</button>

                <FormattedMessage tagName="label" id="blog.publish.label"/>
                <Select
                    options={soldiers}
                    value={selectedSoldier}
                    onChange={handleSelectChange}
                    getOptionLabel={(option: Soldier) => option.name}
                    getOptionValue={(option: Soldier) => option.name}
                    placeholder=""
                    className="publish_select"
                    isClearable
                />

                <textarea
                    className="publish_content"
                    rows={3}
                    value={newStory}
                    onChange={(e) => setNewStory(e.target.value)}
                    placeholder=""
                ></textarea>
                <button onClick={handlePublish} className="publish_btn">
                    <FormattedMessage id="blog.publish"/>
                </button>
            </div>
        </div>
    );
};

export default PublishModal;
