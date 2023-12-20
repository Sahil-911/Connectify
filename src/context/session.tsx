'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { loginAction, verifyAction } from './action';
import { useRouter } from 'next/navigation';

export interface SessionInterface {
    token: string;
}

const SessionContext = createContext({
    session: {} as SessionInterface,
    setSession: (session: SessionInterface) => { },
})

export function SessionProvider({ children }: { children: React.ReactNode }) {
    const [session, setSession] = useState<SessionInterface>({} as SessionInterface);
    useEffect(() => {
        const storedSession = localStorage.getItem("session");
        if (storedSession) {
            try {
                const parsedSession = JSON.parse(storedSession);
                if (parsedSession && parsedSession.token) {
                    setSession(parsedSession);
                } else {
                    setSession({} as SessionInterface);
                }
            } catch (error) {
                console.error('Error parsing session data:', error);
                setSession({} as SessionInterface);
            }
        } else {
            setSession({} as SessionInterface);
        }
    }, []);

    useEffect(() => {
        if (session.token)
            localStorage.setItem("session", JSON.stringify(session));
    }, [session]);

    return (
        <SessionContext.Provider value={{ session, setSession }}>
            {children}
        </SessionContext.Provider>
    );
};

export function useAuth() {
    const { session, setSession } = useContext(SessionContext);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const router = useRouter();
    const login = async ({ username, password }: { username: string, password: string }) => {
        const { session, message } = await loginAction({ username, password });
        if (session) {
            setError("");
            setSession(session);
            router.push('/dashboard');
        }
        else {
            setError(message);
            setSession({} as SessionInterface);
        }
        return { session, message };
    }

    const logout = async () => {
        setSession({} as SessionInterface);
        localStorage.removeItem("session");
        router.push('/');
    }

    return { session, login, logout, isLoading, error };
}