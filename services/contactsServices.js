import fs from "node:fs/promises";
import path from "node:path";
import { nanoid } from "nanoid";
import { cp } from "node:fs";

const contactsPath = path.resolve("db", "contacts.json");

export const writeFileContacts = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

export const listContacts = async () => {
  const contactsJson = await fs.readFile(contactsPath, "utf-8");
  const contacts = JSON.parse(contactsJson);
  return contacts;
};

export const getContactById = async (id) => {
  const contacts = await listContacts();
  const contact = contacts.find((contact) => contact.id === id);
  return contact ?? null;
};

export const removeContact = async (id) => {
  const contacts = await listContacts();
  const contact = contacts.findIndex((contact) => contact.id === id);
  if (contact === -1) return null;

  const [removedContact] = contacts.splice(contact, 1);
  await writeFileContacts(contacts);
  return removedContact;
};

export const addContact = async (data ) => {
  const contacts = await listContacts();
  const newContact = { id: nanoid(), ...data};
  contacts.push(newContact);
  await writeFileContacts(contacts);
  return newContact;
};

export const updateContacts = async (id, data) => {
  const contacts = await listContacts();
  const contact = contacts.findIndex((contact) => contact.id === id);
  if (contact === -1) return null;

  contacts[contact] = {...contacts[contact], ...data};
  await writeFileContacts(contacts);
  return contacts[contact];
};