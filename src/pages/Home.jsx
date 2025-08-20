import React from 'react';
import { Plus, User } from 'lucide-react';
import { useContacts } from '../hooks/useGlobalReduce';
import ContactCard from '../components/ContactCard';

// Contact List View (Home Page)
const Home = ({ onAddContact, onEditContact }) => {
  const { contacts, loading, error } = useContacts();

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="modern-container">
          <div className="loading-spinner">
            <div>Loading contacts...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="modern-container">
          <div className="text-center text-red-600 min-h-64 flex items-center justify-center">
            <div>
              <p className="text-lg font-semibold mb-2">Error loading contacts</p>
              <p>{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="modern-container">
        <div className="flex items-center justify-between mb-8">
          <h1 className="modern-header">My Contacts</h1>
          <button
            onClick={onAddContact}
            className="btn-modern"
          >
            <Plus className="w-4 h-4" />
            Add Contact
          </button>
        </div>

        {contacts.length === 0 ? (
          <div className="empty-state">
            <User className="w-20 h-20 mx-auto" />
            <h3>No contacts yet</h3>
            <p>Get started by adding your first contact</p>
            <button
              onClick={onAddContact}
              className="btn-modern"
            >
              <Plus className="w-4 h-4" />
              Add Your First Contact
            </button>
          </div>
        ) : (
          <div className="contacts-grid">
            {contacts.map((contact) => (
              <ContactCard
                key={contact.id}
                contact={contact}
                onEdit={onEditContact}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;