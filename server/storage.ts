import { db } from "./db";
import * as schema from "@shared/schema";
import { eq, and } from "drizzle-orm";
import type {
  Subject, InsertSubject,
  Chapter, InsertChapter,
  Subtopic, InsertSubtopic,
  Question, InsertQuestion,
  QuizSession, InsertQuizSession,
  QuizAnswer, InsertQuizAnswer,
  QuizStat, InsertQuizStat,
  FileItem, InsertFile,
  Folder, InsertFolder,
  Message, InsertMessage,
  StudySession, InsertStudySession,
  ScheduleEvent, InsertScheduleEvent
} from "@shared/schema";

export interface IStorage {
  // Subjects
  getSubjects(): Promise<Subject[]>;
  createSubject(data: InsertSubject): Promise<Subject>;
  updateSubject(id: number, data: Partial<InsertSubject>): Promise<Subject | null>;
  deleteSubject(id: number): Promise<void>;

  // Chapters
  getChapters(): Promise<Chapter[]>;
  getChaptersBySubject(subjectId: number): Promise<Chapter[]>;
  getChapter(id: number): Promise<Chapter | null>;
  createChapter(data: InsertChapter): Promise<Chapter>;
  updateChapter(id: number, data: Partial<InsertChapter>): Promise<Chapter | null>;
  deleteChapter(id: number): Promise<void>;

  // Subtopics
  getSubtopicsByChapter(chapterId: number): Promise<Subtopic[]>;
  createSubtopic(data: InsertSubtopic): Promise<Subtopic>;
  deleteSubtopic(id: number): Promise<void>;

  // Questions
  getQuestions(): Promise<Question[]>;
  getQuestionsByChapter(chapterId: number): Promise<Question[]>;
  getQuestionsBySubtopic(subtopicId: number): Promise<Question[]>;
  createQuestion(data: InsertQuestion): Promise<Question>;
  createBulkQuestions(questionsData: InsertQuestion[]): Promise<Question[]>;
  updateQuestion(id: number, data: Partial<InsertQuestion>): Promise<Question | null>;
  deleteQuestion(id: number): Promise<void>;

  // Quiz Sessions
  getQuizSessions(): Promise<QuizSession[]>;
  createQuizSession(data: InsertQuizSession): Promise<QuizSession>;
  updateQuizSession(id: number, data: Partial<InsertQuizSession>): Promise<QuizSession | null>;
  deleteQuizSession(id: number): Promise<void>;

  // Quiz Answers
  getQuizAnswers(): Promise<QuizAnswer[]>;
  getQuizAnswersBySession(sessionId: number): Promise<QuizAnswer[]>;
  createQuizAnswer(data: InsertQuizAnswer): Promise<QuizAnswer>;

  // Quiz Stats
  getQuizStats(): Promise<QuizStat[]>;
  createQuizStat(data: InsertQuizStat): Promise<QuizStat>;

  // Files
  getFiles(): Promise<FileItem[]>;
  createFile(data: InsertFile): Promise<FileItem>;
  deleteFile(id: number): Promise<void>;

  // Folders
  getFolders(): Promise<Folder[]>;
  createFolder(data: InsertFolder): Promise<Folder>;
  deleteFolder(id: number): Promise<void>;

  // Messages
  getMessages(): Promise<Message[]>;
  createMessage(data: InsertMessage): Promise<Message>;
  deleteMessage(id: number): Promise<void>;

  // Study Sessions
  getStudySessions(): Promise<StudySession[]>;
  createStudySession(data: InsertStudySession): Promise<StudySession>;

  // Schedule Events
  getScheduleEvents(): Promise<ScheduleEvent[]>;
  createScheduleEvent(data: InsertScheduleEvent): Promise<ScheduleEvent>;
  updateScheduleEvent(id: number, data: Partial<InsertScheduleEvent>): Promise<ScheduleEvent | null>;
  deleteScheduleEvent(id: number): Promise<void>;

  // Utility
  clearAllData(): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  // Subjects
  async getSubjects(): Promise<Subject[]> {
    return await db.select().from(schema.subjects);
  }

  async createSubject(data: InsertSubject): Promise<Subject> {
    const [subject] = await db.insert(schema.subjects).values(data).returning();
    return subject;
  }

  async updateSubject(id: number, data: Partial<InsertSubject>): Promise<Subject | null> {
    const [subject] = await db.update(schema.subjects)
      .set(data)
      .where(eq(schema.subjects.id, id))
      .returning();
    return subject || null;
  }

  async deleteSubject(id: number): Promise<void> {
    await db.delete(schema.subjects).where(eq(schema.subjects.id, id));
  }

  // Chapters
  async getChapters(): Promise<Chapter[]> {
    return await db.select().from(schema.chapters);
  }

  async getChaptersBySubject(subjectId: number): Promise<Chapter[]> {
    return await db.select().from(schema.chapters)
      .where(eq(schema.chapters.subjectId, subjectId));
  }

  async getChapter(id: number): Promise<Chapter | null> {
    const [chapter] = await db.select().from(schema.chapters)
      .where(eq(schema.chapters.id, id));
    return chapter || null;
  }

  async createChapter(data: InsertChapter): Promise<Chapter> {
    const [chapter] = await db.insert(schema.chapters).values(data).returning();
    return chapter;
  }

  async updateChapter(id: number, data: Partial<InsertChapter>): Promise<Chapter | null> {
    const [chapter] = await db.update(schema.chapters)
      .set(data)
      .where(eq(schema.chapters.id, id))
      .returning();
    return chapter || null;
  }

  async deleteChapter(id: number): Promise<void> {
    await db.delete(schema.chapters).where(eq(schema.chapters.id, id));
  }

  // Subtopics
  async getSubtopicsByChapter(chapterId: number): Promise<Subtopic[]> {
    return await db.select().from(schema.subtopics)
      .where(eq(schema.subtopics.chapterId, chapterId));
  }

  async createSubtopic(data: InsertSubtopic): Promise<Subtopic> {
    const [subtopic] = await db.insert(schema.subtopics).values(data).returning();
    return subtopic;
  }

  async deleteSubtopic(id: number): Promise<void> {
    await db.delete(schema.subtopics).where(eq(schema.subtopics.id, id));
  }

  // Questions
  async getQuestions(): Promise<Question[]> {
    return await db.select().from(schema.questions);
  }

  async getQuestionsByChapter(chapterId: number): Promise<Question[]> {
    return await db.select().from(schema.questions)
      .where(eq(schema.questions.chapterId, chapterId));
  }

  async getQuestionsBySubtopic(subtopicId: number): Promise<Question[]> {
    return await db.select().from(schema.questions)
      .where(eq(schema.questions.subtopicId, subtopicId));
  }

  async createQuestion(data: InsertQuestion): Promise<Question> {
    const [question] = await db.insert(schema.questions).values(data).returning();
    return question;
  }

  async createBulkQuestions(questionsData: InsertQuestion[]): Promise<Question[]> {
    return await db.insert(schema.questions).values(questionsData).returning();
  }

  async updateQuestion(id: number, data: Partial<InsertQuestion>): Promise<Question | null> {
    const [question] = await db.update(schema.questions)
      .set(data)
      .where(eq(schema.questions.id, id))
      .returning();
    return question || null;
  }

  async deleteQuestion(id: number): Promise<void> {
    await db.delete(schema.questions).where(eq(schema.questions.id, id));
  }

  // Quiz Sessions
  async getQuizSessions(): Promise<QuizSession[]> {
    return await db.select().from(schema.quizSessions);
  }

  async createQuizSession(data: InsertQuizSession): Promise<QuizSession> {
    const [session] = await db.insert(schema.quizSessions).values(data).returning();
    return session;
  }

  async updateQuizSession(id: number, data: Partial<InsertQuizSession>): Promise<QuizSession | null> {
    const [session] = await db.update(schema.quizSessions)
      .set(data)
      .where(eq(schema.quizSessions.id, id))
      .returning();
    return session || null;
  }

  async deleteQuizSession(id: number): Promise<void> {
    await db.delete(schema.quizSessions).where(eq(schema.quizSessions.id, id));
  }

  // Quiz Answers
  async getQuizAnswers(): Promise<QuizAnswer[]> {
    return await db.select().from(schema.quizAnswers);
  }

  async getQuizAnswersBySession(sessionId: number): Promise<QuizAnswer[]> {
    return await db.select().from(schema.quizAnswers)
      .where(eq(schema.quizAnswers.sessionId, sessionId));
  }

  async createQuizAnswer(data: InsertQuizAnswer): Promise<QuizAnswer> {
    const [answer] = await db.insert(schema.quizAnswers).values(data).returning();
    return answer;
  }

  // Quiz Stats
  async getQuizStats(): Promise<QuizStat[]> {
    return await db.select().from(schema.quizStats);
  }

  async createQuizStat(data: InsertQuizStat): Promise<QuizStat> {
    const [stat] = await db.insert(schema.quizStats).values(data).returning();
    return stat;
  }

  // Files
  async getFiles(): Promise<FileItem[]> {
    return await db.select().from(schema.files);
  }

  async createFile(data: InsertFile): Promise<FileItem> {
    const [file] = await db.insert(schema.files).values(data).returning();
    return file;
  }

  async deleteFile(id: number): Promise<void> {
    await db.delete(schema.files).where(eq(schema.files.id, id));
  }

  // Folders
  async getFolders(): Promise<Folder[]> {
    return await db.select().from(schema.folders);
  }

  async createFolder(data: InsertFolder): Promise<Folder> {
    const [folder] = await db.insert(schema.folders).values(data).returning();
    return folder;
  }

  async deleteFolder(id: number): Promise<void> {
    await db.delete(schema.folders).where(eq(schema.folders.id, id));
  }

  // Messages
  async getMessages(): Promise<Message[]> {
    return await db.select().from(schema.messages);
  }

  async createMessage(data: InsertMessage): Promise<Message> {
    const [message] = await db.insert(schema.messages).values(data).returning();
    return message;
  }

  async deleteMessage(id: number): Promise<void> {
    await db.delete(schema.messages).where(eq(schema.messages.id, id));
  }

  // Study Sessions
  async getStudySessions(): Promise<StudySession[]> {
    return await db.select().from(schema.studySessions);
  }

  async createStudySession(data: InsertStudySession): Promise<StudySession> {
    const [session] = await db.insert(schema.studySessions).values(data).returning();
    return session;
  }

  // Schedule Events
  async getScheduleEvents(): Promise<ScheduleEvent[]> {
    return await db.select().from(schema.scheduleEvents);
  }

  async createScheduleEvent(data: InsertScheduleEvent): Promise<ScheduleEvent> {
    const [event] = await db.insert(schema.scheduleEvents).values(data).returning();
    return event;
  }

  async updateScheduleEvent(id: number, data: Partial<InsertScheduleEvent>): Promise<ScheduleEvent | null> {
    const [event] = await db.update(schema.scheduleEvents)
      .set(data)
      .where(eq(schema.scheduleEvents.id, id))
      .returning();
    return event || null;
  }

  async deleteScheduleEvent(id: number): Promise<void> {
    await db.delete(schema.scheduleEvents).where(eq(schema.scheduleEvents.id, id));
  }

  // Utility
  async clearAllData(): Promise<void> {
    // Delete in reverse dependency order
    await db.delete(schema.quizAnswers);
    await db.delete(schema.quizSessions);
    await db.delete(schema.questions);
    await db.delete(schema.subtopics);
    await db.delete(schema.chapters);
    await db.delete(schema.subjects);
    await db.delete(schema.quizStats);
    await db.delete(schema.files);
    await db.delete(schema.folders);
    await db.delete(schema.messages);
    await db.delete(schema.studySessions);
    await db.delete(schema.scheduleEvents);
  }
}

export const storage = new DatabaseStorage();