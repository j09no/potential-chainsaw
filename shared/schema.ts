import { z } from "zod";

// Types
export interface QuizStat {
  id: number;
  date: Date;
  chapterTitle: string;
  subtopicTitle?: string;
  subjectTitle: string;
  score: number;
  totalQuestions: number;
  percentage: number;
}