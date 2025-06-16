import { db } from "./db";
import { files, folders, messages, subjects, chapters, type File, type FolderDB, type MessageDB, type SubjectDB, type ChapterDB, type InsertFile, type InsertFolder, type InsertMessage, type InsertSubject, type InsertChapter } from "@shared/schema";
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

  // Subject operations
  getSubjects(): Promise<SubjectDB[]>;
  createSubject(subjectData: InsertSubject): Promise<SubjectDB>;
  deleteSubject(id: number): Promise<void>;

  // Chapter operations
  getChapters(): Promise<ChapterDB[]>;
  getChaptersBySubject(subjectId: number): Promise<ChapterDB[]>;
  createChapter(chapterData: InsertChapter): Promise<ChapterDB>;
  deleteChapter(id: number): Promise<void>;


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

  // Subject operations
  async getSubjects(): Promise<SubjectDB[]> {
    return await db.select().from(subjects);
  }

  async createSubject(subjectData: InsertSubject): Promise<SubjectDB> {
    const [subject] = await db
      .insert(subjects)
      .values(subjectData)
      .returning();
    return subject;
  }

  async deleteSubject(id: number): Promise<void> {
    // Delete all related chapters and their subtopics first
    const relatedChapters = await db.select().from(chapters).where(eq(chapters.subjectId, id));

    for (const chapter of relatedChapters) {
      await db.delete(subtopics).where(eq(subtopics.chapterId, chapter.id));
    }

    await db.delete(chapters).where(eq(chapters.subjectId, id));
    await db.delete(subjects).where(eq(subjects.id, id));
  }

  // Chapter operations
  async getChapters(): Promise<ChapterDB[]> {
    return await db.select().from(chapters);
  }

  async getChaptersBySubject(subjectId: number): Promise<ChapterDB[]> {
    return await db.select().from(chapters).where(eq(chapters.subjectId, subjectId));
  }

  async createChapter(chapterData: InsertChapter): Promise<ChapterDB> {
    const [chapter] = await db
      .insert(chapters)
      .values(chapterData)
      .returning();
    return chapter;
  }

  async deleteChapter(id: number): Promise<void> {
    await db.delete(chapters).where(eq(chapters.id, id));
  }

  // Question operations
  async getQuestionsByChapter(chapterId: number): Promise<any[]> {
    // For now, return from localStorage since we don't have questions table in schema
    const questionsData = JSON.parse(global.localStorage?.getItem('questions') || '[]');
    return questionsData.filter((q: any) => q.chapterId === chapterId);
  }

  async createBulkQuestions(questionsData: any[]): Promise<any[]> {
    // For now, store in localStorage since we don't have questions table in schema
    const existingQuestions = JSON.parse(global.localStorage?.getItem('questions') || '[]');

    const newQuestions = questionsData.map((q, index) => ({
      id: Date.now() + index,
      chapterId: q.chapterId,
      question: q.question,
      optionA: q.optionA,
      optionB: q.optionB,
      optionC: q.optionC,
      optionD: q.optionD,
      correctAnswer: q.correctAnswer, // Store as number
      explanation: q.explanation,
      difficulty: q.difficulty,
      createdAt: new Date()
    }));

    const allQuestions = [...existingQuestions, ...newQuestions];
    global.localStorage?.setItem('questions', JSON.stringify(allQuestions));

    console.log(`Stored ${newQuestions.length} questions in localStorage`);
    return newQuestions;
  }
}

export const storage = new DatabaseStorage();