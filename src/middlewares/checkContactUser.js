import createHttpError from 'http-errors';
import { ContactsCollection } from '../db/models/Contact.js';

export const checkContactUser = async (req, res, next) => {
    const { contactId } = req.params;
    const userId = req.user._id;
    try {
        if (!contactId) {
            const contacts = await ContactsCollection.find({ userId: userId });
            return res.json(contacts);
        }

        const contact = await ContactsCollection.findOne({
            _id: contactId,
            userId: userId,
        });

        if (!contact) {
            return next(createHttpError(403));
        }

        req.contact = contact;
        next();
    } catch (err) {
        next(err);
    }
};











































