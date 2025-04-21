import Contact from "../db/models/contact.js";

export const listContacts = (owner) => Contact.findAll({ where: { owner } });

export const getContactById = ({ id, owner }) =>
  Contact.findOne({ where: { id, owner } });

export const addContact = (data) => Contact.create(data);

export const removeContact = async ({ id, owner }) => {
  const contact = await Contact.findOne({ where: { id, owner } });
  if (!contact) return null;
  await contact.destroy();
  return contact;
};

export const updateContacts = async ({ id, owner }, data) => {
  const contact = await Contact.findOne({ where: { id, owner } });
  if (!contact) return null;
  return contact.update(data);
};

export const updateStatusContacts = async ({ id, owner }, { favorite }) => {
  const contact = await Contact.findOne({ where: { id, owner } });
  if (!contact) return null;
  return contact.update({ favorite });
};
