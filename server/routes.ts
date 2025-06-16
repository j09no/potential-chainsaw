import { Router } from "express";
import { storage } from "./storage";
import { 
  insertSubjectSchema,
  insertChapterSchema,
  insertSubtopicSchema,
  insertQuestionSchema,
  insertQuizSessionSchema,
  insertQuizAnswerSchema,
  insertQuizStatSchema,
  insertFileSchema,
  insertFolderSchema,
  insertMessageSchema,
  insertStudySessionSchema,
  insertScheduleEventSchema
} from "@shared/schema";

const router = Router();

// Subjects
router.get("/api/subjects", async (req, res) => {
  try {
    const subjects = await storage.getSubjects();
    res.json(subjects);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch subjects" });
  }
});

router.post("/api/subjects", async (req, res) => {
  try {
    const validatedData = insertSubjectSchema.parse(req.body);
    const subject = await storage.createSubject(validatedData);
    res.json(subject);
  } catch (error) {
    res.status(400).json({ error: "Invalid subject data" });
  }
});

router.put("/api/subjects/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const validatedData = insertSubjectSchema.partial().parse(req.body);
    const subject = await storage.updateSubject(id, validatedData);
    if (!subject) {
      return res.status(404).json({ error: "Subject not found" });
    }
    res.json(subject);
  } catch (error) {
    res.status(400).json({ error: "Invalid subject data" });
  }
});

router.delete("/api/subjects/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await storage.deleteSubject(id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete subject" });
  }
});

// Chapters
router.get("/api/chapters", async (req, res) => {
  try {
    const chapters = await storage.getChapters();
    res.json(chapters);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch chapters" });
  }
});

router.get("/api/chapters/subject/:subjectId", async (req, res) => {
  try {
    const subjectId = parseInt(req.params.subjectId);
    const chapters = await storage.getChaptersBySubject(subjectId);
    res.json(chapters);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch chapters" });
  }
});

router.get("/api/chapters/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const chapter = await storage.getChapter(id);
    if (!chapter) {
      return res.status(404).json({ error: "Chapter not found" });
    }
    res.json(chapter);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch chapter" });
  }
});

router.post("/api/chapters", async (req, res) => {
  try {
    const validatedData = insertChapterSchema.parse(req.body);
    const chapter = await storage.createChapter(validatedData);
    res.json(chapter);
  } catch (error) {
    res.status(400).json({ error: "Invalid chapter data" });
  }
});

router.put("/api/chapters/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const validatedData = insertChapterSchema.partial().parse(req.body);
    const chapter = await storage.updateChapter(id, validatedData);
    if (!chapter) {
      return res.status(404).json({ error: "Chapter not found" });
    }
    res.json(chapter);
  } catch (error) {
    res.status(400).json({ error: "Invalid chapter data" });
  }
});

router.delete("/api/chapters/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await storage.deleteChapter(id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete chapter" });
  }
});

// Subtopics
router.get("/api/subtopics/chapter/:chapterId", async (req, res) => {
  try {
    const chapterId = parseInt(req.params.chapterId);
    const subtopics = await storage.getSubtopicsByChapter(chapterId);
    res.json(subtopics);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch subtopics" });
  }
});

router.post("/api/subtopics", async (req, res) => {
  try {
    const validatedData = insertSubtopicSchema.parse(req.body);
    const subtopic = await storage.createSubtopic(validatedData);
    res.json(subtopic);
  } catch (error) {
    res.status(400).json({ error: "Invalid subtopic data" });
  }
});

router.delete("/api/subtopics/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await storage.deleteSubtopic(id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete subtopic" });
  }
});

// Questions
router.get("/api/questions", async (req, res) => {
  try {
    const questions = await storage.getQuestions();
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch questions" });
  }
});

router.get("/api/questions/chapter/:chapterId", async (req, res) => {
  try {
    const chapterId = parseInt(req.params.chapterId);
    const questions = await storage.getQuestionsByChapter(chapterId);
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch questions" });
  }
});

router.get("/api/questions/subtopic/:subtopicId", async (req, res) => {
  try {
    const subtopicId = parseInt(req.params.subtopicId);
    const questions = await storage.getQuestionsBySubtopic(subtopicId);
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch questions" });
  }
});

router.post("/api/questions", async (req, res) => {
  try {
    const validatedData = insertQuestionSchema.parse(req.body);
    const question = await storage.createQuestion(validatedData);
    res.json(question);
  } catch (error) {
    res.status(400).json({ error: "Invalid question data" });
  }
});

router.post("/api/questions/bulk", async (req, res) => {
  try {
    const validatedData = req.body.map((q: any) => insertQuestionSchema.parse(q));
    const questions = await storage.createBulkQuestions(validatedData);
    res.json(questions);
  } catch (error) {
    res.status(400).json({ error: "Invalid questions data" });
  }
});

router.put("/api/questions/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const validatedData = insertQuestionSchema.partial().parse(req.body);
    const question = await storage.updateQuestion(id, validatedData);
    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }
    res.json(question);
  } catch (error) {
    res.status(400).json({ error: "Invalid question data" });
  }
});

router.delete("/api/questions/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await storage.deleteQuestion(id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete question" });
  }
});

// Quiz Sessions
router.get("/api/quiz-sessions", async (req, res) => {
  try {
    const sessions = await storage.getQuizSessions();
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch quiz sessions" });
  }
});

router.post("/api/quiz-sessions", async (req, res) => {
  try {
    const validatedData = insertQuizSessionSchema.parse(req.body);
    const session = await storage.createQuizSession(validatedData);
    res.json(session);
  } catch (error) {
    res.status(400).json({ error: "Invalid quiz session data" });
  }
});

router.put("/api/quiz-sessions/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const validatedData = insertQuizSessionSchema.partial().parse(req.body);
    const session = await storage.updateQuizSession(id, validatedData);
    if (!session) {
      return res.status(404).json({ error: "Quiz session not found" });
    }
    res.json(session);
  } catch (error) {
    res.status(400).json({ error: "Invalid quiz session data" });
  }
});

router.delete("/api/quiz-sessions/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await storage.deleteQuizSession(id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete quiz session" });
  }
});

// Quiz Answers
router.get("/api/quiz-answers", async (req, res) => {
  try {
    const answers = await storage.getQuizAnswers();
    res.json(answers);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch quiz answers" });
  }
});

router.get("/api/quiz-answers/session/:sessionId", async (req, res) => {
  try {
    const sessionId = parseInt(req.params.sessionId);
    const answers = await storage.getQuizAnswersBySession(sessionId);
    res.json(answers);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch quiz answers" });
  }
});

router.post("/api/quiz-answers", async (req, res) => {
  try {
    const validatedData = insertQuizAnswerSchema.parse(req.body);
    const answer = await storage.createQuizAnswer(validatedData);
    res.json(answer);
  } catch (error) {
    res.status(400).json({ error: "Invalid quiz answer data" });
  }
});

// Quiz Stats
router.get("/api/quiz-stats", async (req, res) => {
  try {
    const stats = await storage.getQuizStats();
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch quiz stats" });
  }
});

router.post("/api/quiz-stats", async (req, res) => {
  try {
    const validatedData = insertQuizStatSchema.parse(req.body);
    const stat = await storage.createQuizStat(validatedData);
    res.json(stat);
  } catch (error) {
    res.status(400).json({ error: "Invalid quiz stat data" });
  }
});

// Files
router.get("/api/files", async (req, res) => {
  try {
    const files = await storage.getFiles();
    res.json(files);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch files" });
  }
});

router.post("/api/files", async (req, res) => {
  try {
    const validatedData = insertFileSchema.parse(req.body);
    const file = await storage.createFile(validatedData);
    res.json(file);
  } catch (error) {
    res.status(400).json({ error: "Invalid file data" });
  }
});

router.delete("/api/files/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await storage.deleteFile(id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete file" });
  }
});

// Folders
router.get("/api/folders", async (req, res) => {
  try {
    const folders = await storage.getFolders();
    res.json(folders);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch folders" });
  }
});

router.post("/api/folders", async (req, res) => {
  try {
    const validatedData = insertFolderSchema.parse(req.body);
    const folder = await storage.createFolder(validatedData);
    res.json(folder);
  } catch (error) {
    res.status(400).json({ error: "Invalid folder data" });
  }
});

router.delete("/api/folders/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await storage.deleteFolder(id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete folder" });
  }
});

// Messages
router.get("/api/messages", async (req, res) => {
  try {
    const messages = await storage.getMessages();
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

router.post("/api/messages", async (req, res) => {
  try {
    const validatedData = insertMessageSchema.parse(req.body);
    const message = await storage.createMessage(validatedData);
    res.json(message);
  } catch (error) {
    res.status(400).json({ error: "Invalid message data" });
  }
});

router.delete("/api/messages/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await storage.deleteMessage(id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete message" });
  }
});

// Study Sessions
router.get("/api/study-sessions", async (req, res) => {
  try {
    const sessions = await storage.getStudySessions();
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch study sessions" });
  }
});

router.post("/api/study-sessions", async (req, res) => {
  try {
    const validatedData = insertStudySessionSchema.parse(req.body);
    const session = await storage.createStudySession(validatedData);
    res.json(session);
  } catch (error) {
    res.status(400).json({ error: "Invalid study session data" });
  }
});

// Schedule Events
router.get("/api/schedule-events", async (req, res) => {
  try {
    const events = await storage.getScheduleEvents();
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch schedule events" });
  }
});

router.post("/api/schedule-events", async (req, res) => {
  try {
    const validatedData = insertScheduleEventSchema.parse(req.body);
    const event = await storage.createScheduleEvent(validatedData);
    res.json(event);
  } catch (error) {
    res.status(400).json({ error: "Invalid schedule event data" });
  }
});

router.put("/api/schedule-events/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const validatedData = insertScheduleEventSchema.partial().parse(req.body);
    const event = await storage.updateScheduleEvent(id, validatedData);
    if (!event) {
      return res.status(404).json({ error: "Schedule event not found" });
    }
    res.json(event);
  } catch (error) {
    res.status(400).json({ error: "Invalid schedule event data" });
  }
});

router.delete("/api/schedule-events/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await storage.deleteScheduleEvent(id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete schedule event" });
  }
});

// Utility
router.delete("/api/clear-all", async (req, res) => {
  try {
    await storage.clearAllData();
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to clear all data" });
  }
});

export default router;