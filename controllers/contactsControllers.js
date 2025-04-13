import * as contactsServices from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";

export const getAllContacts = async(req, res) => {
    const data = await contactsServices.listContacts();
    res.status(200).json(data);
};

export const getOneContact = async(req, res) => {
   const {id} = req.params;
   const data = await contactsServices.getContactById(id);
   
   if(!data){
        throw HttpError(404, {message: "Not found"});
   }
   res.status(200).json(data);
};

export const deleteContact = async(req, res) => {
    const{id} = req.params;
    const data =  await contactsServices.removeContact(id);
    if(!data){
        throw HttpError(404, `Not found contact with id: ${id}`);
    }
    res.status(200).json(data);
};

export const createContact = async(req, res) => {
    const data = await contactsServices.addContact(req.body);
    res.status(201).json(data);
};

export const updateContact = async(req, res) => {
    const{id} =req.params;
    if (!Object.keys(req.body).length) {
        throw HttpError(404, {message: "Body must have at least one field"});
    }
    const data = await contactsServices.updateContacts(id, req.body);
   
    if(!data){
        throw HttpError(404, {message: "Not found"});
    }
    res.status(200).json(data);
};
