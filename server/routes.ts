import { Router } from "express";
import { storage } from "./storage";
import { insertFileSchema, insertFolderSchema, insertMessageSchema } from "@shared/schema";
import { z } from "zod";

const router = Router();

// File routes
router.get("/api/files", async (req, res) => {
  try {
    const files = await storage.getFiles();
    res.json(files);
  } catch (error) {
    console.error("Error getting files:", error);
    res.status(500).json({ error: "Failed to get files" });
  }
});

router.post("/api/files", async (req, res) => {
  try {
    const fileData = insertFileSchema.parse(req.body);
    const file = await storage.createFile(fileData);
    res.json(file);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: "Invalid file data", details: error.errors });
    } else {
      console.error("Error creating file:", error);
      res.status(500).json({ error: "Failed to create file" });
    }
  }
});

router.delete("/api/files/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid file ID" });
    }
    await storage.deleteFile(id);
    res.json({ success: true });
  } catch (error) {
    console.error("Error deleting file:", error);
    res.status(500).json({ error: "Failed to delete file" });
  }
});

// Folder routes
router.get("/api/folders", async (req, res) => {
  try {
    const folders = await storage.getFolders();
    res.json(folders);
  } catch (error) {
    console.error("Error getting folders:", error);
    res.status(500).json({ error: "Failed to get folders" });
  }
});

router.post("/api/folders", async (req, res) => {
  try {
    const folderData = insertFolderSchema.parse(req.body);
    const folder = await storage.createFolder(folderData);
    res.json(folder);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: "Invalid folder data", details: error.errors });
    } else {
      console.error("Error creating folder:", error);
      res.status(500).json({ error: "Failed to create folder" });
    }
  }
});

router.delete("/api/folders/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid folder ID" });
    }
    await storage.deleteFolder(id);
    res.json({ success: true });
  } catch (error) {
    console.error("Error deleting folder:", error);
    res.status(500).json({ error: "Failed to delete folder" });
  }
});

// Message routes
router.get("/api/messages", async (req, res) => {
  try {
    const messages = await storage.getMessages();
    res.json(messages);
  } catch (error) {
    console.error("Error getting messages:", error);
    res.status(500).json({ error: "Failed to get messages" });
  }
});

router.post("/api/messages", async (req, res) => {
  try {
    const messageData = insertMessageSchema.parse(req.body);
    const message = await storage.createMessage(messageData);
    res.json(message);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: "Invalid message data", details: error.errors });
    } else {
      console.error("Error creating message:", error);
      res.status(500).json({ error: "Failed to create message" });
    }
  }
});

router.delete("/api/messages/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid message ID" });
    }
    await storage.deleteMessage(id);
    res.json({ success: true });
  } catch (error) {
    console.error("Error deleting message:", error);
    res.status(500).json({ error: "Failed to delete message" });
  }
});

router.delete("/api/messages", async (req, res) => {
  try {
    await storage.clearMessages();
    res.json({ success: true });
  } catch (error) {
    console.error("Error clearing messages:", error);
    res.status(500).json({ error: "Failed to clear messages" });
  }
});

export default router;