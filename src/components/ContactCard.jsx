import React, { useState } from 'react';
import { Trash2, Edit, User, Phone, Mail, MapPin } from 'lucide-react';
import Modal from './Modal';
import { useContacts } from '../hooks/useGlobalReduce';

// ContactCard Component
const ContactCard = ({ contact, onEdit }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { deleteContact } = useContacts();

  const handleDelete = async () => {
    await deleteContact(contact.id);
    setShowDeleteModal(false);
  };

  return (
    <>
      <div className="contact-card">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="contact-avatar">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="contact-name">{contact.name}</h3>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(contact)}
              className="action-btn edit"
              title="Edit contact"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="action-btn delete"
              title="Delete contact"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <div className="space-y-2">
          {contact.phone && (
            <div className="contact-info">
              <Phone className="w-4 h-4" />
              <span>{contact.phone}</span>
            </div>
          )}
          {contact.email && (
            <div className="contact-info">
              <Mail className="w-4 h-4" />
              <span>{contact.email}</span>
            </div>
          )}
          {contact.address && (
            <div className="contact-info">
              <MapPin className="w-4 h-4" />
              <span>{contact.address}</span>
            </div>
          )}
        </div>
      </div>

      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Delete Contact"
      >
        <p className="text-gray-600">
          Are you sure you want to delete <strong>{contact.name}</strong>? This action cannot be undone.
        </p>
      </Modal>
    </>
  );
};

export default ContactCard;