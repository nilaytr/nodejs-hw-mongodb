import { ContactsCollection } from '../db/models/Contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';

export const getAllContacts = async ({
    page = 1,
    perPage = 10,
    sortOrder = SORT_ORDER.ASC,
    sortBy = '_id',
    filter = {},
}) => {
    const limit = perPage;
    const skip = (page - 1) * perPage;

    const contactQuery = ContactsCollection.find();

    if (filter.contactType) {
        contactQuery.where('contactType').equals(filter.contactType);
    }

    if (typeof filter.isFavourite === 'boolean') {
        contactQuery.where('isFavourite').equals(filter.isFavourite);
    }

    const [contactCount, contacts] = await Promise.all([
        ContactsCollection.find().merge(contactQuery).countDocuments(),
        contactQuery
            .skip(skip)
            .limit(limit)
            .sort({ [sortBy]: sortOrder })
            .exec(),
    ]);

    const paginationData = calculatePaginationData(contactCount, perPage, page);

    return {
        data: contacts,
        ...paginationData,
    };
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











