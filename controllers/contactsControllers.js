import * as contactsService from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";

export const getAllContacts = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, ...params } = req.query;
    const { _id: owner } = req.user;
    const filter = { owner, ...params };
    const fields = "-createdAt -updatedAt";
    const skip = (page - 1) * limit;
    const settings = { skip, limit };
    const result = await contactsService.listContacts({
      filter,
      fields,
      settings,
    });
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const getOneContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { _id: owner } = req.user;
    const result = await contactsService.getContactById({ _id: id, owner });
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { _id: owner } = req.user;
    const result = await contactsService.removeContact({ _id: id, owner });
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const result = await contactsService.addContact({ ...req.body, owner });
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { _id: owner } = req.user;
    const result = await contactsService.updateContact(
      { _id: id, owner },
      req.body
    );
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const updateStatusContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { _id: owner } = req.user;
    const result = await contactsService.updateContact(
      { _id: id, owner },
      req.body
    );

    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};
