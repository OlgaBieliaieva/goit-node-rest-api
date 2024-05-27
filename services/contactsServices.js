import Contact from "../models/contact.js";

export function listContacts(search = {}) {
  const { filter = {}, fields = "", settings = {} } = search;
  return Contact.find(filter, fields, settings).populate("owner", "email");
}

export async function getContactById(filter) {
  const result = await Contact.findOne(filter);
  return result;
}

export function removeContact(filter) {
  return Contact.findOneAndDelete(filter);
}

export function addContact(data) {
  return Contact.create(data);
}

export const updateContact = (filter, data) => {
  return Contact.findOneAndUpdate(filter, data);
};
