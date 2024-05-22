import Contact from "../models/contact.js";

export function listContacts() {
  return Contact.find();
}

export async function getContactById(_id) {
  const result = await Contact.findById(_id);
  return result;
}

export function removeContact(_id) {
  return Contact.findByIdAndDelete(_id);
}

export function addContact(data) {
  return Contact.create(data);
}

export const updateContact = (_id, data) => {
  return Contact.findByIdAndUpdate(_id, data);
};
