import { ContactsCollection } from '../db/models/Contact.js';

export const getAllContacts = async () => {
    const contacts = await ContactsCollection.find();
    return contacts;
};

export const getContactById = async (contactId) => {
    const contacts = await ContactsCollection.findById(contactId);
    return contacts;
};

export const createContact = async (requestBody) => {
    const contact = await ContactsCollection.create(requestBody);
    return contact;
};

export const deleteContact = async (contactId) => {
    const contact = await ContactsCollection.findOneAndDelete({
      _id: contactId,
    });
    return contact;
};

export const updateContact = async (contactId, requestBody, options = {}) => {
    const contact = await ContactsCollection.findOneAndUpdate(
        { _id: contactId },
        requestBody,
        {
            new: true,
            includeResultMetadata: true,
            ...options,
        },
    );
    return contact;
};











