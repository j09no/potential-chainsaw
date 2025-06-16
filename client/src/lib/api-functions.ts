import { indexedDB } from './indexed-db';

// Types
interface FileItem {
  id: number;
  name: string;
  type: "folder" | "pdf" | "image" | "document";
  size?: string;
  path: string;
  createdAt: Date;
}

interface Folder {
  id: number;
  name: string;
  path: string;
  createdAt: Date;
}

interface Message {
  id: number;
  text: string;
  timestamp: Date;
  sender: "user";
}

interface Subject {
  id: number;
  name: string;
  color: string;
}

interface Chapter {
  id: number;
  subjectId: number;
  title: string;
  description: string;
  progress: number;
  totalQuestions: number;
  difficulty: string;
}

interface Question {
  id: number;
  chapterId: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: "easy" | "medium" | "hard";
}

interface QuizSession {
  id: number;
  chapterId: number;
  totalQuestions: number;
  currentQuestion: number;
  score: number;
  isCompleted: boolean;
  createdAt: Date;
}

interface QuizAnswer {
  id: number;
  sessionId: number;
  questionId: number;
  selectedAnswer: number;
  isCorrect: boolean;
}

// Initialize default data
async function initializeDefaultData() {
  try {
    console.log('Starting IndexedDB initialization...');
    await indexedDB.init();
    console.log('IndexedDB initialized successfully');

    // Check if subjects exist, if not add default ones
    const subjects = await indexedDB.getAll('subjects');
    console.log('Existing subjects:', subjects.length);
    
    if (subjects.length === 0) {
      console.log('Adding default subjects...');
      await indexedDB.add('subjects', { id: 1, name: "Physics", color: "blue" });
      await indexedDB.add('subjects', { id: 2, name: "Chemistry", color: "green" });
      await indexedDB.add('subjects', { id: 3, name: "Biology", color: "purple" });
      console.log('Default subjects added');
    }

    // Check if chapters exist
    const chapters = await indexedDB.getAll('chapters');
    console.log('Existing chapters:', chapters.length);
    
    if (chapters.length === 0) {
      console.log('Adding default chapters...');
      await indexedDB.add('chapters', {
        id: 1,
        subjectId: 1,
        title: "Mechanics",
        description: "Study of motion and forces",
        progress: 0,
        totalQuestions: 50,
        difficulty: "medium"
      });
      await indexedDB.add('chapters', {
        id: 2,
        subjectId: 1,
        title: "Thermodynamics",
        description: "Study of heat and energy",
        progress: 0,
        totalQuestions: 30,
        difficulty: "hard"
      });
      console.log('Default chapters added');
    }

    // Check if questions exist
    const questions = await indexedDB.getAll('questions');
    console.log('Existing questions:', questions.length);
    
    if (questions.length === 0) {
      console.log('Adding default question...');
      await indexedDB.add('questions', {
        id: 1,
        chapterId: 1,
        question: "What is Newton's first law of motion?",
        options: [
          "An object at rest stays at rest",
          "Force equals mass times acceleration",
          "For every action there's an equal and opposite reaction",
          "Energy cannot be created or destroyed"
        ],
        correctAnswer: 0,
        explanation: "Newton's first law states that an object at rest stays at rest and an object in motion stays in motion unless acted upon by an external force.",
        difficulty: "easy"
      });
      console.log('Default question added');
    }
    
    console.log('Default data initialization completed');
  } catch (error) {
    console.error('Error initializing default data:', error);
  }
}

// Initialize with delay to ensure DOM is ready
let initializationPromise: Promise<void> | null = null;

export function ensureInitialized(): Promise<void> {
  if (!initializationPromise) {
    initializationPromise = initializeDefaultData();
  }
  return initializationPromise;
}

// File Functions
export async function getFiles(): Promise<FileItem[]> {
  try {
    await ensureInitialized();
    return await indexedDB.getAll('files');
  } catch (error) {
    console.error('Error getting files:', error);
    return [];
  }
}

export async function createFile(fileData: { 
  name: string; 
  type: string; 
  size?: string; 
  path: string 
}): Promise<FileItem> {
  try {
    await ensureInitialized();
    const id = await indexedDB.getNextId('files');
    const newFile: FileItem = {
      id,
      name: fileData.name,
      type: fileData.type as FileItem['type'],
      size: fileData.size,
      path: fileData.path,
      createdAt: new Date()
    };

    return await indexedDB.add('files', newFile);
  } catch (error) {
    console.error('Error creating file:', error);
    throw error;
  }
}

export async function deleteFile(id: number): Promise<boolean> {
  try {
    await ensureInitialized();
    return await indexedDB.delete('files', id);
  } catch (error) {
    console.error('Error deleting file:', error);
    return false;
  }
}

// Folder Functions
export async function getFolders(): Promise<Folder[]> {
  try {
    await ensureInitialized();
    return await indexedDB.getAll('folders');
  } catch (error) {
    console.error('Error getting folders:', error);
    return [];
  }
}

export async function createFolder(folderData: { 
  name: string; 
  path: string 
}): Promise<Folder> {
  try {
    await ensureInitialized();
    const id = await indexedDB.getNextId('folders');
    const newFolder: Folder = {
      id,
      name: folderData.name,
      path: folderData.path,
      createdAt: new Date()
    };

    return await indexedDB.add('folders', newFolder);
  } catch (error) {
    console.error('Error creating folder:', error);
    throw error;
  }
}

export async function deleteFolder(id: number): Promise<boolean> {
  try {
    await ensureInitialized();
    return await indexedDB.delete('folders', id);
  } catch (error) {
    console.error('Error deleting folder:', error);
    return false;
  }
}

// Message Functions
export async function getMessages(): Promise<Message[]> {
  try {
    await ensureInitialized();
    return await indexedDB.getAll('messages');
  } catch (error) {
    console.error('Error getting messages:', error);
    return [];
  }
}

export async function createMessage(messageData: {
  text: string;
  sender: "user";
}): Promise<Message> {
  try {
    await ensureInitialized();
    const id = await indexedDB.getNextId('messages');
    const newMessage: Message = {
      id,
      text: messageData.text,
      timestamp: new Date(),
      sender: messageData.sender
    };

    return await indexedDB.add('messages', newMessage);
  } catch (error) {
    console.error('Error creating message:', error);
    throw error;
  }
}

// Subject Functions
export async function getSubjects(): Promise<Subject[]> {
  try {
    await ensureInitialized();
    return await indexedDB.getAll('subjects');
  } catch (error) {
    console.error('Error getting subjects:', error);
    return [];
  }
}

export async function createSubject(subjectData: {
  name: string;
  color: string;
}): Promise<Subject> {
  try {
    await ensureInitialized();
    const id = await indexedDB.getNextId('subjects');
    const newSubject: Subject = {
      id,
      name: subjectData.name,
      color: subjectData.color
    };

    return await indexedDB.add('subjects', newSubject);
  } catch (error) {
    console.error('Error creating subject:', error);
    throw error;
  }
}

// Chapter Functions
export async function getChapters(): Promise<Chapter[]> {
  try {
    await ensureInitialized();
    return await indexedDB.getAll('chapters');
  } catch (error) {
    console.error('Error getting chapters:', error);
    return [];
  }
}

export async function getChaptersBySubject(subjectId: number): Promise<Chapter[]> {
  try {
    await ensureInitialized();
    return await indexedDB.getByIndex('chapters', 'subjectId', subjectId);
  } catch (error) {
    console.error('Error getting chapters by subject:', error);
    return [];
  }
}

export async function getChapterById(id: number): Promise<Chapter | undefined> {
  try {
    await ensureInitialized();
    return await indexedDB.getById('chapters', id);
  } catch (error) {
    console.error('Error getting chapter by id:', error);
    return undefined;
  }
}

export async function createChapter(chapterData: {
  subjectId: number;
  title: string;
  description: string;
  difficulty: string;
}): Promise<Chapter> {
  try {
    await ensureInitialized();
    const id = await indexedDB.getNextId('chapters');
    const newChapter: Chapter = {
      id,
      subjectId: chapterData.subjectId,
      title: chapterData.title,
      description: chapterData.description,
      progress: 0,
      totalQuestions: 0,
      difficulty: chapterData.difficulty
    };

    return await indexedDB.add('chapters', newChapter);
  } catch (error) {
    console.error('Error creating chapter:', error);
    throw error;
  }
}

export async function deleteChapter(id: number): Promise<boolean> {
  try {
    await ensureInitialized();
    // Delete the chapter
    const chapterDeleted = await indexedDB.delete('chapters', id);
    
    if (chapterDeleted) {
      // Also delete all questions associated with this chapter
      const questions = await indexedDB.getByIndex('questions', 'chapterId', id);
      for (const question of questions) {
        await indexedDB.delete('questions', question.id);
      }
      
      // Delete quiz sessions for this chapter
      const sessions = await indexedDB.getByIndex('quizSessions', 'chapterId', id);
      for (const session of sessions) {
        await indexedDB.delete('quizSessions', session.id);
        
        // Delete quiz answers for each session
        const answers = await indexedDB.getByIndex('quizAnswers', 'sessionId', session.id);
        for (const answer of answers) {
          await indexedDB.delete('quizAnswers', answer.id);
        }
      }
    }
    
    return chapterDeleted;
  } catch (error) {
    console.error('Error deleting chapter:', error);
    return false;
  }
}

// Question Functions
export async function getQuestions(): Promise<Question[]> {
  try {
    await ensureInitialized();
    return await indexedDB.getAll('questions');
  } catch (error) {
    console.error('Error getting questions:', error);
    return [];
  }
}

export async function getQuestionsByChapter(chapterId: number): Promise<Question[]> {
  try {
    await ensureInitialized();
    return await indexedDB.getByIndex('questions', 'chapterId', chapterId);
  } catch (error) {
    console.error('Error getting questions by chapter:', error);
    return [];
  }
}

export async function createQuestion(questionData: {
  chapterId: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: "easy" | "medium" | "hard";
}): Promise<Question> {
  try {
    await ensureInitialized();
    const id = await indexedDB.getNextId('questions');
    const newQuestion: Question = {
      id,
      chapterId: questionData.chapterId,
      question: questionData.question,
      options: questionData.options,
      correctAnswer: questionData.correctAnswer,
      explanation: questionData.explanation,
      difficulty: questionData.difficulty
    };

    return await indexedDB.add('questions', newQuestion);
  } catch (error) {
    console.error('Error creating question:', error);
    throw error;
  }
}

export async function createBulkQuestions(questionsData: {
  chapterId: number;
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAnswer: string;
  explanation?: string;
  difficulty?: string;
  subtopicId?: number;
}[]): Promise<Question[]> {
  try {
    await ensureInitialized();
    const createdQuestions: Question[] = [];
    
    for (const questionData of questionsData) {
      const id = await indexedDB.getNextId('questions');
      
      // Convert option format to array and correct answer to index
      const options = [
        questionData.optionA,
        questionData.optionB,
        questionData.optionC,
        questionData.optionD
      ];
      
      // Convert letter answer (A, B, C, D) to index (0, 1, 2, 3)
      const correctAnswerIndex = questionData.correctAnswer.toUpperCase() === 'A' ? 0 :
                                questionData.correctAnswer.toUpperCase() === 'B' ? 1 :
                                questionData.correctAnswer.toUpperCase() === 'C' ? 2 : 3;
      
      const newQuestion: Question = {
        id,
        chapterId: questionData.chapterId,
        question: questionData.question,
        options: options,
        correctAnswer: correctAnswerIndex,
        explanation: questionData.explanation || '',
        difficulty: (questionData.difficulty as "easy" | "medium" | "hard") || "medium"
      };

      const createdQuestion = await indexedDB.add('questions', newQuestion);
      createdQuestions.push(createdQuestion);
    }

    return createdQuestions;
  } catch (error) {
    console.error('Error creating bulk questions:', error);
    throw error;
  }
}

// Quiz Session Functions
export async function createQuizSession(sessionData: {
  chapterId: number;
  totalQuestions: number;
}): Promise<QuizSession> {
  try {
    await ensureInitialized();
    const id = await indexedDB.getNextId('quizSessions');
    const newSession: QuizSession = {
      id,
      chapterId: sessionData.chapterId,
      totalQuestions: sessionData.totalQuestions,
      currentQuestion: 0,
      score: 0,
      isCompleted: false,
      createdAt: new Date()
    };

    return await indexedDB.add('quizSessions', newSession);
  } catch (error) {
    console.error('Error creating quiz session:', error);
    throw error;
  }
}

export async function getQuizSession(id: number): Promise<QuizSession | undefined> {
  try {
    await ensureInitialized();
    return await indexedDB.getById('quizSessions', id);
  } catch (error) {
    console.error('Error getting quiz session:', error);
    return undefined;
  }
}

export async function updateQuizSession(id: number, sessionData: Partial<QuizSession>): Promise<QuizSession | undefined> {
  try {
    await ensureInitialized();
    const existingSession = await indexedDB.getById('quizSessions', id);
    if (!existingSession) return undefined;

    const updatedSession = {
      ...existingSession,
      ...sessionData
    };

    return await indexedDB.put('quizSessions', updatedSession);
  } catch (error) {
    console.error('Error updating quiz session:', error);
    return undefined;
  }
}

// Quiz Answer Functions
export async function createQuizAnswer(answerData: {
  sessionId: number;
  questionId: number;
  selectedAnswer: number;
  isCorrect: boolean;
}): Promise<QuizAnswer> {
  try {
    await ensureInitialized();
    const id = await indexedDB.getNextId('quizAnswers');
    const newAnswer: QuizAnswer = {
      id,
      sessionId: answerData.sessionId,
      questionId: answerData.questionId,
      selectedAnswer: answerData.selectedAnswer,
      isCorrect: answerData.isCorrect
    };

    return await indexedDB.add('quizAnswers', newAnswer);
  } catch (error) {
    console.error('Error creating quiz answer:', error);
    throw error;
  }
}

export async function getQuizAnswersBySession(sessionId: number): Promise<QuizAnswer[]> {
  try {
    await ensureInitialized();
    return await indexedDB.getByIndex('quizAnswers', 'sessionId', sessionId);
  } catch (error) {
    console.error('Error getting quiz answers by session:', error);
    return [];
  }
}

// User Stats Functions
export async function getUserStats(): Promise<{
  totalQuestionsSolved: number;
  totalCorrectAnswers: number;
  studyStreak: number;
  totalStudyTimeMinutes: number;
  quizStats: any[];
}> {
  try {
    await ensureInitialized();
    const sessions = await indexedDB.getAll('quizSessions');
    const answers = await indexedDB.getAll('quizAnswers');
    
    const completedSessions = sessions.filter(session => session.isCompleted);
    const totalQuestionsSolved = answers.length;
    const totalCorrectAnswers = answers.filter(answer => answer.isCorrect).length;
    
    // Generate quiz stats from sessions
    const quizStats = completedSessions.map(session => ({
      date: new Date(session.createdAt).toLocaleDateString(),
      score: session.score,
      totalQuestions: session.totalQuestions,
      accuracy: Math.round((session.score / session.totalQuestions) * 100)
    }));

    return {
      totalQuestionsSolved,
      totalCorrectAnswers,
      studyStreak: 12, // Static for now
      totalStudyTimeMinutes: 850, // Static for now
      quizStats
    };
  } catch (error) {
    console.error('Error getting user stats:', error);
    return {
      totalQuestionsSolved: 0,
      totalCorrectAnswers: 0,
      studyStreak: 0,
      totalStudyTimeMinutes: 0,
      quizStats: []
    };
  }
}

export async function createQuizStat(statData: {
  subject: string;
  chapter: string;
  subtopic?: string;
  date: Date;
  score: number;
}): Promise<void> {
  try {
    // Since we're using IndexedDB instead of a separate quiz stats table,
    // we can store this data as part of quiz sessions
    console.log('Quiz stat would be saved:', statData);
  } catch (error) {
    console.error('Error creating quiz stat:', error);
  }
}

export async function updateUserStats(statsUpdate: {
  questionsSolved?: number;
  correctAnswers?: number;
  studyTime?: number;
}): Promise<void> {
  try {
    // For now, this is handled automatically through quiz sessions and answers
    console.log('User stats would be updated:', statsUpdate);
  } catch (error) {
    console.error('Error updating user stats:', error);
  }
}

export async function getSubtopicsByChapter(chapterId: number): Promise<any[]> {
  try {
    await ensureInitialized();
    // Since we don't have a subtopics table in our IndexedDB schema,
    // we'll return an empty array for now
    console.log('Getting subtopics for chapter:', chapterId);
    return [];
  } catch (error) {
    console.error('Error getting subtopics by chapter:', error);
    return [];
  }
}

export async function createSubtopic(subtopicData: {
  chapterId: number;
  title?: string;
  name?: string;
  description?: string;
}): Promise<{ id: number; chapterId: number; title: string; description?: string; created_at: string; }> {
  try {
    await ensureInitialized();
    // Since we don't have a subtopics table in our IndexedDB schema,
    // we'll just return a mock response for now
    const id = Math.floor(Math.random() * 10000);
    const newSubtopic = {
      id,
      chapterId: subtopicData.chapterId,
      title: subtopicData.title || subtopicData.name || '',
      description: subtopicData.description,
      created_at: new Date().toISOString()
    };
    
    console.log('Subtopic would be created:', newSubtopic);
    return newSubtopic;
  } catch (error) {
    console.error('Error creating subtopic:', error);
    throw error;
  }
}

export async function deleteSubtopic(id: number): Promise<boolean> {
  try {
    await ensureInitialized();
    // Since we don't have a subtopics table in our IndexedDB schema,
    // we'll just return true for now
    console.log('Subtopic would be deleted:', id);
    return true;
  } catch (error) {
    console.error('Error deleting subtopic:', error);
    return false;
  }
}

export async function getQuestionsBySubtopic(subtopicId: number): Promise<Question[]> {
  try {
    await ensureInitialized();
    // Since we don't have subtopics in our IndexedDB schema,
    // we'll return an empty array for now
    console.log('Getting questions for subtopic:', subtopicId);
    return [];
  } catch (error) {
    console.error('Error getting questions by subtopic:', error);
    return [];
  }
}

// Utility function to clear all data (for testing or reset)
export async function clearAllData(): Promise<void> {
  try {
    await ensureInitialized();
    await indexedDB.clear('files');
    await indexedDB.clear('folders');
    await indexedDB.clear('messages');
    await indexedDB.clear('subjects');
    await indexedDB.clear('chapters');
    await indexedDB.clear('questions');
    await indexedDB.clear('quizSessions');
    await indexedDB.clear('quizAnswers');
  } catch (error) {
    console.error('Error clearing all data:', error);
  }
}