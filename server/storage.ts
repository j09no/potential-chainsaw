import { db } from "./db";
import { files, folders, messages, type File, type FolderDB, type MessageDB, type InsertFile, type InsertFolder, type InsertMessage } from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  // File operations
  getFiles(): Promise<File[]>;
  createFile(fileData: InsertFile): Promise<File>;
  deleteFile(id: number): Promise<void>;

  // Folder operations
  getFolders(): Promise<FolderDB[]>;
  createFolder(folderData: InsertFolder): Promise<FolderDB>;
  deleteFolder(id: number): Promise<void>;

  // Message operations
  getMessages(): Promise<MessageDB[]>;
  createMessage(messageData: InsertMessage): Promise<MessageDB>;
  deleteMessage(id: number): Promise<void>;
  clearMessages(): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  // File operations
  async getFiles(): Promise<File[]> {
    return await db.select().from(files);
  }

  async createFile(fileData: InsertFile): Promise<File> {
    const [file] = await db
      .insert(files)
      .values(fileData)
      .returning();
    return file;
  }

  async deleteFile(id: number): Promise<void> {
    await db.delete(files).where(eq(files.id, id));
  }

  // Folder operations
  async getFolders(): Promise<FolderDB[]> {
    return await db.select().from(folders);
  }

  async createFolder(folderData: InsertFolder): Promise<FolderDB> {
    const [folder] = await db
      .insert(folders)
      .values(folderData)
      .returning();
    return folder;
  }

  async deleteFolder(id: number): Promise<void> {
    await db.delete(folders).where(eq(folders.id, id));
  }

  // Message operations
  async getMessages(): Promise<MessageDB[]> {
    return await db.select().from(messages);
  }

  async createMessage(messageData: InsertMessage): Promise<MessageDB> {
    const [message] = await db
      .insert(messages)
      .values(messageData)
      .returning();
    return message;
  }

  async deleteMessage(id: number): Promise<void> {
    await db.delete(messages).where(eq(messages.id, id));
  }

  async clearMessages(): Promise<void> {
    await db.delete(messages);
  }
}

export const storage = new DatabaseStorage();