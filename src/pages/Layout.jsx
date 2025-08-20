import React, { useState } from 'react';
import { ContactProvider } from '../hooks/useGlobalReduce';
import Home from './Home';
import Single from './Single';

// Main Layout Component
const Layout = () => {
  const [currentView, setCurrentView] = useState('contacts');
  const [editingContact, setEditingContact] = useState(null);

  const handleAddContact = () => {
    setEditingContact(null);
    setCurrentView('addContact');
  };

  const handleEditContact = (contact) => {
    setEditingContact(contact);
    setCurrentView('addContact');
  };

  const handleBackToContacts = () => {
    setCurrentView('contacts');
    setEditingContact(null);
  };

  return (
    <ContactProvider>
      <div className="min-h-screen">
        {currentView === 'contacts' ? (
          <Home 
            onAddContact={handleAddContact} 
            onEditContact={handleEditContact} 
          />
        ) : (
          <Single 
            onBack={handleBackToContacts} 
            editingContact={editingContact} 
          />
        )}
      </div>
    </ContactProvider>
  );
};

export default Layout;