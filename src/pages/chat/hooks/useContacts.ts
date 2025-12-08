import { useState, useEffect } from 'react';
import { useApi } from './useApi';
import { UserResponse, AddContactRequest } from '@/types/chat.types';

export const useContacts = (userId: string) => {
  const { get, post, loading, error } = useApi();
  const [contacts, setContacts] = useState<UserResponse[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<UserResponse[]>([]);

  // Obtener todos los contactos
  const fetchContacts = async () => {
    try {
      const data = await get<UserResponse[]>(`/eciexpress/chatuser/${userId}/contacts`);
      setContacts(data);
      setFilteredContacts(data);
      return data;
    } catch (err) {
      console.error('Error al obtener contactos:', err);
      return [];
    }
  };

  // Filtrar contactos por palabra clave
  const filterContacts = async (filterWord: string) => {
    try {
      if (!filterWord.trim()) {
        setFilteredContacts(contacts);
        return contacts;
      }

      const data = await get<UserResponse[]>(
        `/eciexpress/chatuser/${userId}/filter/contacts?filterWord=${encodeURIComponent(filterWord)}`
      );
      setFilteredContacts(data);
      return data;
    } catch (err) {
      console.error('Error al filtrar contactos:', err);
      return [];
    }
  };

  // Agregar un nuevo contacto
  const addContact = async (contactId: string) => {
    try {
      const request: AddContactRequest = {
        userId,
        contactId
      };
      
      await post('/eciexpress/chatuser/add-contact', request);
      
      // Recargar la lista de contactos
      await fetchContacts();
    } catch (err) {
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