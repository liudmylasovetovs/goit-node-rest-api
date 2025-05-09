import * as contactsServices from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";

const getAllContacts = async (req, res) => {
  const { id: owner } = req.user;
  const data = await contactsServices.listContacts(owner);
  res.status(200).json(data);
};

const getOneContact = async (req, res) => {
  const { id } = req.params;
  const { id: owner } = req.user;
  const data = await contactsServices.getContactById({ id, owner });

  if (!data) throw HttpError(404, `Not found`);
  res.status(200).json(data);
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const { id: owner } = req.user;
  const data = await contactsServices.removeContact({ id, owner });

  if (!data) throw HttpError(404, `Not found`);
  res.status(200).json(data);
};

const createContact = async (req, res) => {
  const { id: owner } = req.user;
  const data = await contactsServices.addContact({ ...req.body, owner });
  res.status(201).json(data);
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const { id: owner } = req.user;
  const data = await contactsServices.updateContacts({ id, owner }, req.body);

  if (!data) throw HttpError(404, `Not found`);
  res.status(200).json(data);
};

const updateStatusContacts = async (req, res) => {
  const { id } = req.params;
  const { id: owner } = req.user;
  const data = await contactsServices.updateStatusContacts({ id, owner }, req.body);

  if (!data) throw HttpError(404, `Not found`);
  res.status(200).json(data);
};

export default {
  getAllContacts: ctrlWrapper(getAllContacts),
  getOneContact: ctrlWrapper(getOneContact),
  createContact: ctrlWrapper(createContact),
  updateContact: ctrlWrapper(updateContact),
  deleteContact: ctrlWrapper(deleteContact),
  updateStatusContacts: ctrlWrapper(updateStatusContacts),
};
