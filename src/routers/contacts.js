import { Router } from 'express';
import {
    getAllContactsController,
    getContactByIdController,
    createContactController,
    deleteContactController,
    updateContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { createContactSchema, updateContactSchema } from '../validation/contacts.js';
import validateBody from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';
import { checkContactUser } from '../middlewares/checkContactUser.js';

const router = Router();

router.use(authenticate);

router.get('/', checkContactUser, ctrlWrapper(getAllContactsController));

router.get('/:contactId', isValidId, checkContactUser, ctrlWrapper(getContactByIdController));

router.post('/register', isValidId, checkContactUser, validateBody(createContactSchema), ctrlWrapper(createContactController));

router.post('/', checkContactUser, validateBody(createContactSchema), ctrlWrapper(createContactController));

router.delete('/:contactId', isValidId, checkContactUser, ctrlWrapper(deleteContactController));

router.patch('/:contactId', isValidId, checkContactUser, validateBody(updateContactSchema), ctrlWrapper(updateContactController));

export default router;










