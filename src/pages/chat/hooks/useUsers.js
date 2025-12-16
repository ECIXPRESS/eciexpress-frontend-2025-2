import { useState, useEffect } from 'react';
import axios from 'axios';
const API_BASE_URL = 'http://localhost:8081/api';
export const useUsers = (userIds) => {
    const [usernames, setUsernames] = useState(new Map());
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (userIds.length === 0)
            return;
        const fetchUsernames = async () => {
            setLoading(true);
            const usernameMap = new Map();
            try {
                await Promise.all(userIds.map(async (userId) => {
                    try {
                        const response = await axios.get(`${API_BASE_URL}/chat/eciexpress/chatuser/getUsername?userId=${userId}`);
                        usernameMap.set(userId, response.data);
                        console.log(`✅ Username obtenido:  ${userId} -> ${response.data}`);
                    }
                    catch (error) {
                        console.error(`❌ Error al obtener username para ${userId}:`, error);
                        usernameMap.set(userId, userId.slice(0, 8));
                    }
                }));
                setUsernames(usernameMap);
            }
            catch (error) {
                console.error('❌ Error al cargar usernames:', error);
            }
            finally {
                setLoading(false);
            }
        };
        fetchUsernames();
    }, [userIds.join(',')]);
    const getUserName = (userId) => {
        return usernames.get(userId) || userId.slice(0, 8);
    };
    return { usernames, getUserName, loading };
};
