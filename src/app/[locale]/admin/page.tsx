'use client';
import React, {useEffect, useState} from 'react';
import './Admin.css';
import {Soldier, Story, User} from "@/lib/types";
import Image from "next/image";
import MessagesContainer from "@/components/common/MessagesContainer";
import {FormattedMessage} from "react-intl";
import {formatDate} from "@/lib/helpers";

export default function Admin({params: {locale}}: { params: { locale: string } }) {
    const [soldiers, setSoldiers] = useState<Soldier[]>([]);
    const [stories, setStories] = useState<Story[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<string>('');

    async function fetchSoldiers() {
        const response = await fetch('/api/admin/soldiers', {
            headers: {
                'Authorization': process.env.NEXT_PUBLIC_API_SECRET!
            }
        });
        const data = await response.json();
        setSoldiers(data.soldiers);
    }
    async function fetchStories() {
        const response = await fetch('/api/admin/stories', {
            headers: {
                'Authorization': process.env.NEXT_PUBLIC_API_SECRET!
            }
        });
        const data = await response.json();
        setStories(data.stories);
    }
    async function fetchUsers() {
        const response = await fetch('/api/admin/users', {
            headers: {
                'Authorization': process.env.NEXT_PUBLIC_API_SECRET!
            }
        });
        const data = await response.json();
        setUsers(data.users);
    }

    useEffect(() => {
        fetchSoldiers().then();
        fetchStories().then();
        fetchUsers().then();
    }, []);

    const handleSoldierApprove = async (soldier_id: string) => {
        await fetch(`/api/admin/approve`, {
            method: 'POST',
            body: JSON.stringify({ soldier_id }),
            headers: {
                'Authorization': process.env.NEXT_PUBLIC_API_SECRET!
            }
        });
        fetchSoldiers().then();
    };

    const handleSoldierDeny = async (soldier_id: string) => {
        await fetch('/api/admin/deny', {
            method: 'POST',
            body: JSON.stringify({ soldier_id }),
            headers: {
                'Authorization': process.env.NEXT_PUBLIC_API_SECRET!
            }
        });
        fetchSoldiers().then();
    };

    const handleStoryApprove = async (story_id: string) => {
        await fetch('/api/admin/approve', {
            method: 'POST',
            body: JSON.stringify({ story_id }),
            headers: {
                'Authorization': process.env.NEXT_PUBLIC_API_SECRET!
            }
        });
        fetchStories().then();
    };

    const handleStoryDeny = async (storyId: string) => {
        await fetch('/api/admin/deny', {
            method: 'POST',
            body: JSON.stringify({ story_id: storyId }),
            headers: {
                'Authorization': process.env.NEXT_PUBLIC_API_SECRET!
            }
        });
        fetchStories().then();
    };

    const handleBanUser = async () => {
        console.log(selectedUser);
        if (!selectedUser) return;
        await fetch('/api/admin/ban', {
            method: 'POST',
            body: JSON.stringify({ user_id: selectedUser }),
            headers: {
                'Authorization': process.env.NEXT_PUBLIC_API_SECRET!
            }
        });
        fetchUsers().then();
    };

    return (
        <MessagesContainer locale={locale}>
            <div className="adminContainer">
                <h2 className="adminHeader"><FormattedMessage id="page.admin.title" /></h2>

                <div className="userBanContainer">
                    <select
                        className="userBanSelect"
                        onChange={(e) => setSelectedUser(e.target.value)}
                    >
                        <option value=""><FormattedMessage id="page.admin.select_user" /></option>
                        {users.map((user, index) => (
                            <option key={index} value={user._id}>{user.username}</option>
                        ))}
                    </select>
                    <button
                        className="userBanButton"
                        onClick={handleBanUser}
                    >
                        <FormattedMessage id="page.admin.button.ban" />
                    </button>
                </div>

                <div className="outerTableContainer">
                    <h3 className="tableTitle">
                        <FormattedMessage id="page.admin.soldiers_table_title" />
                    </h3>
                    <div className="tableContainer">
                        <table className="table">
                            <thead className="tableHeaderContainer">
                            <tr>
                                <th scope="col"
                                    className="tableHeader">
                                    <FormattedMessage id="page.admin.table.header.name" />
                                </th>
                                <th scope="col"
                                    className="tableHeader">
                                    <FormattedMessage id="page.admin.table.header.rank" />
                                </th>
                                <th scope="col"
                                    className="tableHeader">
                                    <FormattedMessage id="page.admin.table.header.unit" />
                                </th>
                                <th scope="col"
                                    className="tableHeader">
                                    <FormattedMessage id="page.admin.table.header.date" />
                                </th>
                                <th scope="col"
                                    className="tableHeader">
                                    <FormattedMessage id="page.admin.table.header.image" />
                                </th>
                                <th scope="col"
                                    className="tableHeader">
                                    <FormattedMessage id="page.admin.table.header.published_by" />
                                </th>
                                <th scope="col"
                                    className="tableHeader">
                                    <FormattedMessage id="page.admin.table.header.actions" />
                                </th>
                            </tr>
                            </thead>
                            <tbody className="tableBodyContainer">
                            {soldiers.map((soldier, index) => (
                                <tr key={index} className="tableRow">
                                    <td className="tableCell">{soldier.name}</td>
                                    <td className="tableCell">{soldier.rank}</td>
                                    <td className="tableCell">{soldier.unit}</td>
                                    <td className="tableCell">{formatDate(soldier.dateOfDeath)}</td>
                                    <td className="tableCell">
                                        <Image
                                            src={soldier.image}
                                            alt={soldier.name}
                                            height={50}
                                            width={50}
                                            className="tableImage"
                                        />
                                    </td>
                                    <td className="tableCell">{soldier.published_by}</td>
                                    <td className="tableCell">
                                        <button className="buttonApprove"
                                                onClick={() => handleSoldierApprove(soldier._id)}>
                                            <FormattedMessage id="page.admin.table.button.approve" />
                                        </button>
                                        <button className="buttonDeny"
                                                onClick={() => handleSoldierDeny(soldier._id)}>
                                            <FormattedMessage id="page.admin.table.button.deny" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="outerTableContainer">
                    <h3 className="tableTitle">
                        <FormattedMessage id="page.admin.stories_table_title" />
                    </h3>
                    <div className="tableContainer">
                        <table className="table">
                            <thead className="tableHeaderContainer">
                            <tr>
                                <th scope="col"
                                    className="tableHeader">
                                    <FormattedMessage id="page.admin.table.header.content" />
                                </th>
                                <th scope="col"
                                    className="tableHeader">
                                    <FormattedMessage id="page.admin.table.header.published_by" />
                                </th>
                                <th scope="col"
                                    className="tableHeader">
                                    <FormattedMessage id="page.admin.table.header.soldier" />
                                </th>
                                <th scope="col"
                                    className="tableHeader">
                                    <FormattedMessage id="page.admin.table.header.family" />
                                </th>
                                <th scope="col"
                                    className="tableHeader">
                                    <FormattedMessage id="page.admin.table.header.actions" />
                                </th>
                            </tr>
                            </thead>
                            <tbody className="tableBodyContainer">
                            {stories.map((story, index) => (
                                <tr key={index} className="tableRow">
                                    <td className="tableCell">{story.content}</td>
                                    <td className="tableCell">{story.user_name}</td>
                                    <td className="tableCell">{story.soldier.name}</td>
                                    <td className="tableCell">{story.family ?
                                        <FormattedMessage id="page.admin.table.yes_label" />
                                        :
                                        <FormattedMessage id="page.admin.table.no_label" />
                                    }</td>
                                    <td className="tableCell">
                                        <button className="buttonApprove"
                                                onClick={() => handleStoryApprove(story._id!)}>
                                            <FormattedMessage id="page.admin.table.button.approve" />
                                        </button>
                                        <button className="buttonDeny"
                                                onClick={() => handleStoryDeny(story._id!)}>
                                            <FormattedMessage id="page.admin.table.button.deny" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </MessagesContainer>
    );
}
