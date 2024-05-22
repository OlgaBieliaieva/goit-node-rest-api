import Contact from "../models/contact";

// import fs from "fs/promises";
// import path from "path";
// import { nanoid } from "nanoid";

// const contactsPath = path.resolve("db", "contacts.json");

// const updateContacts = (contacts) =>
//   fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

export function listContacts() {
  return Contact.find();
  // const data = await fs.readFile(contactsPath);
  // return JSON.parse(data);
}

export function getContactById(contactId) {
  // const contacts = await listContacts();
  // const result = contacts.find((item) => item.id === contactId);
  // return result || null;
}

export function removeContact(contactId) {
  // const contacts = await listContacts();
  // const index = contacts.findIndex((item) => item.id === contactId);
  // if (index === -1) {
  //   return null;
  // }
  // const [result] = contacts.splice(index, 1);
  // await updateContacts(contacts);
  // return result;
}

export function addContact(data) {
  // const contacts = await listContacts();
  // const newContact = {
  //   id: nanoid(),
  //   ...data,
  // };
  // contacts.push(newContact);
  // await updateContacts(contacts);
  // return newContact;
}

export const updateContact = (id, data) => {
  // const contacts = await listContacts();
  // const index = contacts.findIndex((item) => item.id === id);
  // if (index === -1) {
  //   return null;
  // }
  // contacts[index] = { ...contacts[index], ...data };
  // await updateContacts(contacts);
  // return contacts[index];
};
