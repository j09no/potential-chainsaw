import { pgTable, serial, text, integer, boolean, timestamp, real } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Database Tables
export const subjects = pgTable("subjects", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  color: text("color").notNull(),
});

export const chapters = pgTable("chapters", {
  id: serial("id").primaryKey(),
  subjectId: integer("subject_id").notNull().references(() => subjects.id),
  title: text("title").notNull(),
  description: text("description").notNull(),
  progress: integer("progress").default(0),
  totalQuestions: integer("total_questions").default(0),
  difficulty: text("difficulty").notNull(),
});

export const subtopics = pgTable("subtopics", {
  id: serial("id").primaryKey(),
  chapterId: integer("chapter_id").notNull().references(() => chapters.id),
  title: text("title").notNull(),
  description: text("description"),
});

export const questions = pgTable("questions", {
  id: serial("id").primaryKey(),
  chapterId: integer("chapter_id").notNull().references(() => chapters.id),
  subtopicId: integer("subtopic_id").references(() => subtopics.id),
  question: text("question").notNull(),
  options: text("options").array().notNull(),
  correctAnswer: integer("correct_answer").notNull(),
  explanation: text("explanation").notNull(),
  difficulty: text("difficulty").notNull(),
});

export const quizSessions = pgTable("quiz_sessions", {
  id: serial("id").primaryKey(),
  chapterId: integer("chapter_id").notNull().references(() => chapters.id),
  totalQuestions: integer("total_questions").notNull(),
  currentQuestion: integer("current_question").default(0),
  score: integer("score").default(0),
  isCompleted: boolean("is_completed").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const quizAnswers = pgTable("quiz_answers", {
  id: serial("id").primaryKey(),
  sessionId: integer("session_id").notNull().references(() => quizSessions.id),
  questionId: integer("question_id").notNull().references(() => questions.id),
  selectedAnswer: integer("selected_answer").notNull(),
  isCorrect: boolean("is_correct").notNull(),
});

export const quizStats = pgTable("quiz_stats", {
  id: serial("id").primaryKey(),
  date: timestamp("date").defaultNow(),
  chapterTitle: text("chapter_title").notNull(),
  subtopicTitle: text("subtopic_title"),
  subjectTitle: text("subject_title").notNull(),
  score: integer("score").notNull(),
  totalQuestions: integer("total_questions").notNull(),
  percentage: real("percentage").notNull(),
});

export const files = pgTable("files", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(),
  size: text("size"),
  path: text("path").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const folders = pgTable("folders", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  path: text("path").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  text: text("text").notNull(),
  timestamp: timestamp("timestamp").defaultNow(),
  sender: text("sender").notNull(),
});

export const studySessions = pgTable("study_sessions", {
  id: serial("id").primaryKey(),
  chapterId: integer("chapter_id").notNull().references(() => chapters.id),
  duration: integer("duration").notNull(),
  date: timestamp("date").defaultNow(),
});

export const scheduleEvents = pgTable("schedule_events", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  date: timestamp("date").notNull(),
  time: text("time").notNull(),
  type: text("type").notNull(),
});

// Relations
export const subjectsRelations = relations(subjects, ({ many }) => ({
  chapters: many(chapters),
}));

export const chaptersRelations = relations(chapters, ({ one, many }) => ({
  subject: one(subjects, {
    fields: [chapters.subjectId],
    references: [subjects.id],
  }),
  questions: many(questions),
  subtopics: many(subtopics),
  quizSessions: many(quizSessions),
  studySessions: many(studySessions),
}));

export const subtopicsRelations = relations(subtopics, ({ one, many }) => ({
  chapter: one(chapters, {
    fields: [subtopics.chapterId],
    references: [chapters.id],
  }),
  questions: many(questions),
}));

export const questionsRelations = relations(questions, ({ one }) => ({
  chapter: one(chapters, {
    fields: [questions.chapterId],
    references: [chapters.id],
  }),
  subtopic: one(subtopics, {
    fields: [questions.subtopicId],
    references: [subtopics.id],
  }),
}));

export const quizSessionsRelations = relations(quizSessions, ({ one, many }) => ({
  chapter: one(chapters, {
    fields: [quizSessions.chapterId],
    references: [chapters.id],
  }),
  answers: many(quizAnswers),
}));

export const quizAnswersRelations = relations(quizAnswers, ({ one }) => ({
  session: one(quizSessions, {
    fields: [quizAnswers.sessionId],
    references: [quizSessions.id],
  }),
  question: one(questions, {
    fields: [quizAnswers.questionId],
    references: [questions.id],
  }),
}));

// Insert schemas
export const insertSubjectSchema = createInsertSchema(subjects);
export const insertChapterSchema = createInsertSchema(chapters);
export const insertSubtopicSchema = createInsertSchema(subtopics);
export const insertQuestionSchema = createInsertSchema(questions);
export const insertQuizSessionSchema = createInsertSchema(quizSessions);
export const insertQuizAnswerSchema = createInsertSchema(quizAnswers);
export const insertQuizStatSchema = createInsertSchema(quizStats);
export const insertFileSchema = createInsertSchema(files);
export const insertFolderSchema = createInsertSchema(folders);
export const insertMessageSchema = createInsertSchema(messages);
export const insertStudySessionSchema = createInsertSchema(studySessions);
export const insertScheduleEventSchema = createInsertSchema(scheduleEvents);

// Types
export type Subject = typeof subjects.$inferSelect;
export type InsertSubject = z.infer<typeof insertSubjectSchema>;
export type Chapter = typeof chapters.$inferSelect;
export type InsertChapter = z.infer<typeof insertChapterSchema>;
export type Subtopic = typeof subtopics.$inferSelect;
export type InsertSubtopic = z.infer<typeof insertSubtopicSchema>;
export type Question = typeof questions.$inferSelect;
export type InsertQuestion = z.infer<typeof insertQuestionSchema>;
export type QuizSession = typeof quizSessions.$inferSelect;
export type InsertQuizSession = z.infer<typeof insertQuizSessionSchema>;
export type QuizAnswer = typeof quizAnswers.$inferSelect;
export type InsertQuizAnswer = z.infer<typeof insertQuizAnswerSchema>;
export type QuizStat = typeof quizStats.$inferSelect;
export type InsertQuizStat = z.infer<typeof insertQuizStatSchema>;
export type FileItem = typeof files.$inferSelect;
export type InsertFile = z.infer<typeof insertFileSchema>;
export type Folder = typeof folders.$inferSelect;
export type InsertFolder = z.infer<typeof insertFolderSchema>;
export type Message = typeof messages.$inferSelect;
export type InsertMessage = z.infer<typeof insertMessageSchema>;
export type StudySession = typeof studySessions.$inferSelect;
export type InsertStudySession = z.infer<typeof insertStudySessionSchema>;
export type ScheduleEvent = typeof scheduleEvents.$inferSelect;
export type InsertScheduleEvent = z.infer<typeof insertScheduleEventSchema>;