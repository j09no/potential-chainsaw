import { db } from "./db";
import { files, folders, messages, chapters, subtopics, type File, type FolderDB, type MessageDB, type ChapterDB, type SubtopicDB, type InsertFile, type InsertFolder, type InsertMessage, type InsertChapter, type InsertSubtopic } from "@shared/schema";
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

  // Chapter operations
  getChapters(): Promise<ChapterDB[]>;
  createChapter(chapterData: InsertChapter): Promise<ChapterDB>;
  deleteChapter(id: number): Promise<void>;

  // Subtopic operations
  getSubtopics(): Promise<SubtopicDB[]>;
  getSubtopicsByChapter(chapterId: number): Promise<SubtopicDB[]>;
  createSubtopic(subtopicData: InsertSubtopic): Promise<SubtopicDB>;
  deleteSubtopic(id: number): Promise<void>;
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

  // Chapter operations
  async getChapters(): Promise<ChapterDB[]> {
    return await db.select().from(chapters);
  }

  async createChapter(chapterData: InsertChapter): Promise<ChapterDB> {
    const [chapter] = await db
      .insert(chapters)
      .values(chapterData)
      .returning();
    return chapter;
  }

  async deleteChapter(id: number): Promise<void> {
    // Delete all related subtopics first
    await db.delete(subtopics).where(eq(subtopics.chapterId, id));
    // Then delete the chapter
    await db.delete(chapters).where(eq(chapters.id, id));
  }

  // Subtopic operations
  async getSubtopics(): Promise<SubtopicDB[]> {
    return await db.select().from(subtopics);
  }

  async getSubtopicsByChapter(chapterId: number): Promise<SubtopicDB[]> {
    return await db.select().from(subtopics).where(eq(subtopics.chapterId, chapterId));
  }

  async createSubtopic(subtopicData: InsertSubtopic): Promise<SubtopicDB> {
    const [subtopic] = await db
      .insert(subtopics)
      .values(subtopicData)
      .returning();
    return subtopic;
  }

  async deleteSubtopic(id: number): Promise<void> {
    await db.delete(subtopics).where(eq(subtopics.id, id));
  }
}

export const storage = new DatabaseStorage();