import { useState, useEffect } from 'react';
import { useApi } from './useApi';
export const useContacts = (userId) => {
    const { get, post, loading, error } = useApi();
    const [contacts, setContacts] = useState([]);
    const [filteredContacts, setFilteredContacts] = useState([]);
    // Obtener todos los contactos
    const fetchContacts = async () => {
        try {
            const data = await get(`/eciexpress/chatuser/${userId}/contacts`);
            setContacts(data);
            setFilteredContacts(data);
            return data;
        }
        catch (err) {
            console.error('Error al obtener contactos:', err);
            return [];
        }
    };
    // Filtrar contactos por palabra clave
    const filterContacts = async (filterWord) => {
        try {
            if (!filterWord.trim()) {
                setFilteredContacts(contacts);
                return contacts;
            }
            const data = await get(`/eciexpress/chatuser/${userId}/filter/contacts?filterWord=${encodeURIComponent(filterWord)}`);
            setFilteredContacts(data);
            return data;
        }
        catch (err) {
            console.error('Error al filtrar contactos:', err);
            return [];
        }
    };
    // Agregar un nuevo contacto
    const addContact = async (contactId) => {
        try {
            const request = {
                userId,
                contactId
            };
            await post('/eciexpress/chatuser/add-contact', request);
            // Recargar la lista de contactos
            await fetchContacts();
        }
        catch (err) {
            console.error('Error al agregar contacto:', err);
            throw err;
        }
    };
    // Cargar contactos al montar el componente
    useEffect(() => {
        if (userId) {
            fetchContacts();
        }
    }, [userId]);
    return {
        contacts,
        filteredContacts,
        loading,
        error,
        fetchContacts,
        filterContacts,
        addContact
    };
};
