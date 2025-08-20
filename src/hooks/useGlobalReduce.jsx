import React, { createContext, useContext, useState, useEffect } from 'react';

// Context for managing contacts
const ContactContext = createContext();

// Custom hook to use contact context
export const useContacts = () => {
  const context = useContext(ContactContext);
  if (!context) {
    throw new Error('useContacts must be used within a ContactProvider');
  }
  return context;
};

// Contact Provider Component
export const ContactProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const API_BASE = 'https://playground.4geeks.com/contact';
  const AGENDA_SLUG = 'my-agenda'; // You can change this to your preferred agenda name

  // Initialize agenda if it doesn't exist
  const initializeAgenda = async () => {
    try {
      const response = await fetch(`${API_BASE}/agendas/${AGENDA_SLUG}`);
      if (!response.ok) {
        // Create agenda if it doesn't exist
        await fetch(`${API_BASE}/agendas/${AGENDA_SLUG}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
        });
      }
    } catch (err) {
      console.error('Error initializing agenda:', err);
    }
  };

  // Fetch all contacts
  const fetchContacts = async () => {
    setLoading(true);
    setError(null);
    try {
      await initializeAgenda();
      const response = await fetch(`${API_BASE}/agendas/${AGENDA_SLUG}/contacts`);
      if (!response.ok) throw new Error('Failed to fetch contacts');
      const data = await response.json();
      setContacts(data.contacts || []);
    } catch (err) {
      setError(err.message);
      setContacts([]);
    } finally {
      setLoading(false);
    }
  };

  // Create a new contact
  const createContact = async (contactData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE}/agendas/${AGENDA_SLUG}/contacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactData)
      });
      if (!response.ok) throw new Error('Failed to create contact');
      await fetchContacts(); // Refresh the list
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Update an existing contact
  const updateContact = async (id, contactData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE}/agendas/${AGENDA_SLUG}/contacts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactData)
      });
      if (!response.ok) throw new Error('Failed to update contact');
      await fetchContacts(); // Refresh the list
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Delete a contact
  const deleteContact = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE}/agendas/${AGENDA_SLUG}/contacts/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to delete contact');
      await fetchContacts(); // Refresh the list
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const value = {
    contacts,
    loading,
    error,
    createContact,
    updateContact,
    deleteContact,
    fetchContacts
  };

  return (
    <ContactContext.Provider value={value}>
      {children}
    </ContactContext.Provider>
  );
};