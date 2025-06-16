import type { SubjectDB, ChapterDB, SubtopicDB } from "@shared/schema";

const API_BASE = '/api';

// Subject API functions
export async function getSubjects(): Promise<SubjectDB[]> {
  try {
    const response = await fetch(`${API_BASE}/subjects`);
    if (!response.ok) {
      throw new Error(`Failed to fetch subjects: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error getting subjects:', error);
    throw error;
  }
}

export async function createSubject(subjectData: { name: string; color: string }): Promise<SubjectDB> {
  try {
    const response = await fetch(`${API_BASE}/subjects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(subjectData),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to create subject: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error creating subject:', error);
    throw error;
  }
}

export async function deleteSubject(id: number): Promise<void> {
  try {
    const response = await fetch(`${API_BASE}/subjects/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error(`Failed to delete subject: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error deleting subject:', error);
    throw error;
  }
}

// Chapter API functions
export async function getChapters(): Promise<ChapterDB[]> {
  try {
    const response = await fetch(`${API_BASE}/chapters`);
    if (!response.ok) {
      throw new Error(`Failed to fetch chapters: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error getting chapters:', error);
    throw error;
  }
}

export async function getChaptersBySubject(subjectId: number): Promise<ChapterDB[]> {
  try {
    const response = await fetch(`${API_BASE}/subjects/${subjectId}/chapters`);
    if (!response.ok) {
      throw new Error(`Failed to fetch chapters by subject: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error getting chapters by subject:', error);
    throw error;
  }
}

export async function createChapter(chapterData: {
  subjectId: number;
  title: string;
  description: string;
  progress?: number;
  totalQuestions?: number;
  difficulty: string;
}): Promise<ChapterDB> {
  try {
    const response = await fetch(`${API_BASE}/chapters`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...chapterData,
        progress: chapterData.progress || 0,
        totalQuestions: chapterData.totalQuestions || 0,
      }),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to create chapter: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error creating chapter:', error);
    throw error;
  }
}

export async function deleteChapter(id: number): Promise<void> {
  try {
    const response = await fetch(`${API_BASE}/chapters/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error(`Failed to delete chapter: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error deleting chapter:', error);
    throw error;
  }
}

// Subtopic API functions
export async function getSubtopics(): Promise<SubtopicDB[]> {
  try {
    const response = await fetch(`${API_BASE}/subtopics`);
    if (!response.ok) {
      throw new Error(`Failed to fetch subtopics: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error getting subtopics:', error);
    throw error;
  }
}

export async function getSubtopicsByChapter(chapterId: number): Promise<SubtopicDB[]> {
  try {
    const response = await fetch(`${API_BASE}/chapters/${chapterId}/subtopics`);
    if (!response.ok) {
      throw new Error(`Failed to fetch subtopics by chapter: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error getting subtopics by chapter:', error);
    throw error;
  }
}

export async function createSubtopic(subtopicData: {
  chapterId: number;
  title: string;
  description?: string;
}): Promise<SubtopicDB> {
  try {
    const response = await fetch(`${API_BASE}/subtopics`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(subtopicData),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to create subtopic: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error creating subtopic:', error);
    throw error;
  }
}

export async function deleteSubtopic(id: number): Promise<void> {
  try {
    const response = await fetch(`${API_BASE}/subtopics/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error(`Failed to delete subtopic: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error deleting subtopic:', error);
    throw error;
  }
}

// Initialize default subjects for NEET
export async function initializeDefaultSubjects(): Promise<void> {
  try {
    const existingSubjects = await getSubjects();
    if (existingSubjects.length > 0) {
      return; // Already initialized
    }

    const defaultSubjects = [
      { name: "Physics", color: "#3B82F6" },
      { name: "Chemistry", color: "#10B981" },
      { name: "Biology", color: "#F59E0B" }
    ];

    for (const subject of defaultSubjects) {
      await createSubject(subject);
    }
  } catch (error) {
    console.error('Error initializing default subjects:', error);
    throw error;
  }
}