import { z } from "zod";
import { pgTable, serial, text, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

// PostgreSQL Database Tables
export const files = pgTable("files", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(), // "folder" | "pdf" | "image" | "document"
  size: text("size"),
  path: text("path").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const folders = pgTable("folders", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  path: text("path").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  text: text("text").notNull(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  sender: text("sender").notNull(), // "user"
});

// Drizzle Zod Schemas
export const insertFileSchema = createInsertSchema(files).omit({ id: true, createdAt: true });
export const insertFolderSchema = createInsertSchema(folders).omit({ id: true, createdAt: true });
export const insertMessageSchema = createInsertSchema(messages).omit({ id: true, timestamp: true });

// Insert Types
export type InsertFile = z.infer<typeof insertFileSchema>;
export type InsertFolder = z.infer<typeof insertFolderSchema>;
export type InsertMessage = z.infer<typeof insertMessageSchema>;

// Select Types
export type File = typeof files.$inferSelect;
export type FolderDB = typeof folders.$inferSelect;
export type MessageDB = typeof messages.$inferSelect;

// TypeScript interfaces for IndexedDB storage (legacy - will be removed)
export interface Subject {
  id: number;
  name: string;
  color: string;
}

export interface Chapter {
  id: number;
  subjectId: number;
  title: string;
  description: string;
  progress: number;
  totalQuestions: number;
  difficulty: string;
}

export interface Question {
  id: number;
  chapterId: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: "easy" | "medium" | "hard";
}

export interface QuizSession {
  id: number;
  chapterId: number;
  totalQuestions: number;
  currentQuestion: number;
  score: number;
  isCompleted: boolean;
  createdAt: Date;
}

export interface QuizAnswer {
  id: number;
  sessionId: number;
  questionId: number;
  selectedAnswer: number;
  isCorrect: boolean;
}

export interface QuizStat {
  id: number;
  date: Date;
  chapterTitle: string;
  subjectTitle: string;
  score: number;
  totalQuestions: number;
  percentage: number;
}

// Legacy interfaces (keeping for compatibility during migration)
export interface FileItem {
  id: number;
  name: string;
  type: "folder" | "pdf" | "image" | "document";
  size?: string;
  path: string;
  createdAt: Date;
}

export interface StudySession {
  id: number;
  chapterId: number;
  duration: number;
  date: Date;
}

export interface ScheduleEvent {
  id: number;
  title: string;
  description?: string;
  date: Date;
  time: string;
  type: string;
}