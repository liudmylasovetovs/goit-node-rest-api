import express from "express";
import contactsControllers from "../controllers/contactsControllers.js";
import validateBody from "../helpers/validateBody.js";
import { createContactSchema, updateContactSchema, updateFavoriteSchema } from "../schemas/contactsSchemas.js";
import isEmptyBody from "../helpers/isEmptyBody.js";

const contactsRouter = express.Router();

contactsRouter.get("/", contactsControllers.getAllContacts);

contactsRouter.get("/:id", contactsControllers.getOneContact);

contactsRouter.delete("/:id", contactsControllers.deleteContact);

contactsRouter.post("/", isEmptyBody, validateBody(createContactSchema), contactsControllers.createContact);

contactsRouter.put("/:id", isEmptyBody, validateBody(updateContactSchema), contactsControllers.updateContact);

contactsRouter.patch("/:id/favorite", validateBody(updateFavoriteSchema), contactsControllers.updateStatusContacts);

export default contactsRouter;