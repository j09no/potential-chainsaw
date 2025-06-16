import { apiRequest } from "./queryClient";
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

// Subjects API
export async function getSubjects(): Promise<Subject[]> {
  const response = await fetch("/api/subjects");
  if (!response.ok) throw new Error("Failed to fetch subjects");
  return response.json();
}

export async function createSubject(data: InsertSubject): Promise<Subject> {
  const response = await apiRequest("/api/subjects", "POST", data);
  return response;
}

export async function updateSubject(id: number, data: Partial<InsertSubject>): Promise<Subject> {
  const response = await apiRequest(`/api/subjects/${id}`, "PUT", data);
  return response;
}

export async function deleteSubject(id: number): Promise<void> {
  await apiRequest(`/api/subjects/${id}`, "DELETE");
}

// Chapters API
export async function getChapters(): Promise<Chapter[]> {
  const response = await fetch("/api/chapters");
  if (!response.ok) throw new Error("Failed to fetch chapters");
  return response.json();
}

export async function getChaptersBySubject(subjectId: number): Promise<Chapter[]> {
  const response = await fetch(`/api/chapters/subject/${subjectId}`);
  if (!response.ok) throw new Error("Failed to fetch chapters");
  return response.json();
}

export async function getChapterById(id: number): Promise<Chapter | null> {
  const response = await fetch(`/api/chapters/${id}`);
  if (!response.ok) {
    if (response.status === 404) return null;
    throw new Error("Failed to fetch chapter");
  }
  return response.json();
}

export async function createChapter(data: InsertChapter): Promise<Chapter> {
  const response = await apiRequest("/api/chapters", "POST", data);
  return response;
}

export async function updateChapter(id: number, data: Partial<InsertChapter>): Promise<Chapter> {
  const response = await apiRequest(`/api/chapters/${id}`, "PUT", data);
  return response;
}

export async function deleteChapter(id: number): Promise<void> {
  await apiRequest(`/api/chapters/${id}`, "DELETE");
}

// Subtopics API
export async function getSubtopicsByChapter(chapterId: number): Promise<Subtopic[]> {
  const response = await fetch(`/api/subtopics/chapter/${chapterId}`);
  if (!response.ok) throw new Error("Failed to fetch subtopics");
  return response.json();
}

export async function createSubtopic(data: InsertSubtopic): Promise<Subtopic> {
  const response = await apiRequest("/api/subtopics", "POST", data);
  return response;
}

export async function deleteSubtopic(id: number): Promise<void> {
  await apiRequest(`/api/subtopics/${id}`, "DELETE");
}

// Questions API
export async function getQuestions(): Promise<Question[]> {
  const response = await fetch("/api/questions");
  if (!response.ok) throw new Error("Failed to fetch questions");
  return response.json();
}

export async function getQuestionsByChapter(chapterId: number): Promise<Question[]> {
  const response = await fetch(`/api/questions/chapter/${chapterId}`);
  if (!response.ok) throw new Error("Failed to fetch questions");
  return response.json();
}

export async function getQuestionsBySubtopic(subtopicId: number): Promise<Question[]> {
  const response = await fetch(`/api/questions/subtopic/${subtopicId}`);
  if (!response.ok) throw new Error("Failed to fetch questions");
  return response.json();
}

export async function createQuestion(data: InsertQuestion): Promise<Question> {
  const response = await apiRequest("/api/questions", "POST", data);
  return response;
}

export async function createBulkQuestions(questionsData: InsertQuestion[]): Promise<Question[]> {
  const response = await apiRequest("/api/questions/bulk", "POST", questionsData);
  return response;
}

export async function updateQuestion(id: number, data: Partial<InsertQuestion>): Promise<Question> {
  const response = await apiRequest(`/api/questions/${id}`, "PUT", data);
  return response;
}

export async function deleteQuestion(id: number): Promise<void> {
  await apiRequest(`/api/questions/${id}`, "DELETE");
}

// Quiz Sessions API
export async function getQuizSessions(): Promise<QuizSession[]> {
  const response = await fetch("/api/quiz-sessions");
  if (!response.ok) throw new Error("Failed to fetch quiz sessions");
  return response.json();
}

export async function createQuizSession(data: InsertQuizSession): Promise<QuizSession> {
  const response = await apiRequest("/api/quiz-sessions", "POST", data);
  return response;
}

export async function getQuizSession(id: number): Promise<QuizSession | null> {
  const sessions = await getQuizSessions();
  return sessions.find(s => s.id === id) || null;
}

export async function updateQuizSession(id: number, data: Partial<InsertQuizSession>): Promise<QuizSession> {
  const response = await apiRequest(`/api/quiz-sessions/${id}`, "PUT", data);
  return response;
}

export async function deleteQuizSession(id: number): Promise<void> {
  await apiRequest(`/api/quiz-sessions/${id}`, "DELETE");
}

// Quiz Answers API
export async function getQuizAnswers(): Promise<QuizAnswer[]> {
  const response = await fetch("/api/quiz-answers");
  if (!response.ok) throw new Error("Failed to fetch quiz answers");
  return response.json();
}

export async function getQuizAnswersBySession(sessionId: number): Promise<QuizAnswer[]> {
  const response = await fetch(`/api/quiz-answers/session/${sessionId}`);
  if (!response.ok) throw new Error("Failed to fetch quiz answers");
  return response.json();
}

export async function createQuizAnswer(data: InsertQuizAnswer): Promise<QuizAnswer> {
  const response = await apiRequest("/api/quiz-answers", "POST", data);
  return response;
}

// Quiz Stats API
export async function getQuizStats(): Promise<QuizStat[]> {
  const response = await fetch("/api/quiz-stats");
  if (!response.ok) throw new Error("Failed to fetch quiz stats");
  return response.json();
}

export async function createQuizStat(data: InsertQuizStat): Promise<QuizStat> {
  const response = await apiRequest("/api/quiz-stats", "POST", data);
  return response;
}

// Files API
export async function getFiles(): Promise<FileItem[]> {
  const response = await fetch("/api/files");
  if (!response.ok) throw new Error("Failed to fetch files");
  return response.json();
}

export async function createFile(data: InsertFile): Promise<FileItem> {
  const response = await apiRequest("/api/files", "POST", data);
  return response;
}

export async function deleteFile(id: number): Promise<void> {
  await apiRequest(`/api/files/${id}`, "DELETE");
}

// Folders API
export async function getFolders(): Promise<Folder[]> {
  const response = await fetch("/api/folders");
  if (!response.ok) throw new Error("Failed to fetch folders");
  return response.json();
}

export async function createFolder(data: InsertFolder): Promise<Folder> {
  const response = await apiRequest("/api/folders", "POST", data);
  return response;
}

export async function deleteFolder(id: number): Promise<void> {
  await apiRequest(`/api/folders/${id}`, "DELETE");
}

// Messages API
export async function getMessages(): Promise<Message[]> {
  const response = await fetch("/api/messages");
  if (!response.ok) throw new Error("Failed to fetch messages");
  return response.json();
}

export async function createMessage(data: InsertMessage): Promise<Message> {
  const response = await apiRequest("/api/messages", "POST", data);
  return response;
}

export async function deleteMessage(id: number): Promise<void> {
  await apiRequest(`/api/messages/${id}`, "DELETE");
}

// Study Sessions API
export async function getStudySessions(): Promise<StudySession[]> {
  const response = await fetch("/api/study-sessions");
  if (!response.ok) throw new Error("Failed to fetch study sessions");
  return response.json();
}

export async function createStudySession(data: InsertStudySession): Promise<StudySession> {
  const response = await apiRequest("/api/study-sessions", "POST", data);
  return response;
}

// Schedule Events API
export async function getScheduleEvents(): Promise<ScheduleEvent[]> {
  const response = await fetch("/api/schedule-events");
  if (!response.ok) throw new Error("Failed to fetch schedule events");
  return response.json();
}

export async function createScheduleEvent(data: InsertScheduleEvent): Promise<ScheduleEvent> {
  const response = await apiRequest("/api/schedule-events", "POST", data);
  return response;
}

export async function updateScheduleEvent(id: number, data: Partial<InsertScheduleEvent>): Promise<ScheduleEvent> {
  const response = await apiRequest(`/api/schedule-events/${id}`, "PUT", data);
  return response;
}

export async function deleteScheduleEvent(id: number): Promise<void> {
  await apiRequest(`/api/schedule-events/${id}`, "DELETE");
}

// Utility API
export async function clearAllData(): Promise<void> {
  await apiRequest("/api/clear-all", "DELETE");
}

// Helper functions to maintain compatibility with existing frontend code
export async function getUserStats(): Promise<{
  totalQuizzes: number;
  averageScore: number;
  totalQuestions: number;
  correctAnswers: number;
  studyStreak: number;
}> {
  const stats = await getQuizStats();
  const totalQuizzes = stats.length;
  const averageScore = stats.length > 0 ? stats.reduce((sum, stat) => sum + stat.percentage, 0) / stats.length : 0;
  const totalQuestions = stats.reduce((sum, stat) => sum + stat.totalQuestions, 0);
  const correctAnswers = stats.reduce((sum, stat) => sum + stat.score, 0);
  
  return {
    totalQuizzes,
    averageScore: Math.round(averageScore),
    totalQuestions,
    correctAnswers,
    studyStreak: 0, // Can be calculated based on dates if needed
  };
}

export function ensureInitialized(): Promise<void> {
  // No initialization needed for server-backed API
  return Promise.resolve();
}