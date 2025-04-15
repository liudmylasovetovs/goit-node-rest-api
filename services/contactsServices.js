import Contact from "../db/models/contact.js"

export const listContacts = () => Contact.findAll();

export const getContactById = id => Contact.findByPk(id);

export const addContact = data => Contact.create(data);

export const removeContact = id => Contact.destroy({
    where: {
    id,
  },
  });

export const updateContacts = async (id, data) => {
  const contact = await getContactById(id);
  if (contact === -1) return null;

  return contact.update(data, {
    returning: true,
  });
};

export const updateStatusContacts = async (id, {favorite}) => {
  const contact = await getContactById(id);
  if(contact === -1) return null;

  return contact.update({favorite}, {returning: true});
};