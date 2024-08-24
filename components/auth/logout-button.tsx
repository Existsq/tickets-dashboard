"use client";

import { FC } from 'react';

const LogoutButton: FC = () => {
    const handleLogout = async () => {
        await fetch('/api/auth/logout', { method: 'POST' });
        window.location.href = '/sign-in';
    };

    return (
        <button onClick={handleLogout}>
            Log out
        </button>
    );
};

export default LogoutButton;