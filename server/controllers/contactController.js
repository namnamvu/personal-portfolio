import Contact from '../models/Contact.js';
import catchAsync from '../utils/catchAsync.js';

// Create new contact from form submission
export const createContact = catchAsync(async (req, res) => {
  const contact = await Contact.create(req.body);
  
  res.status(201).json({
    success: true,
    message: 'A new contact is created successfully',
    data: {
      contact_id: contact.contact_id,
      name: contact.name,
      email: contact.email,
      created_at: contact.created_at
    }
  });
});

// Get all contacts (for admin/dashboard)
export const getAllContacts = catchAsync(async (req, res) => {
  const contacts = await Contact.findAll();

  res.status(200).json({
    success: true,
    data: contacts
  });
});

export const updateContact = catchAsync(async (req, res) => {
    const updated = await Contact.update(req.params.contactId, req.body);

    res.status(200).json({
        success: true,
        message: 'Contact updated successfully',
        data: updated
    });
});
  

// Mark contact as read
export const markAsRead = catchAsync(async (req, res) => {
  const contact = await Contact.markAsRead(req.params.contactId);
  
  res.status(200).json({
    success: true,
    data: contact
  });
});

// Mark contact as replied
export const markAsReplied = catchAsync(async (req, res) => {
  const contact = await Contact.markAsReplied(req.params.contactId);
  
  res.status(200).json({
    success: true,
    data: contact
  });
});

// Delete contact
export const deleteContact = catchAsync(async (req, res) => {
  await Contact.delete(req.params.contactId);
  
  res.status(200).json({
    success: true,
    message: 'Contact deleted successfully'
  });
});