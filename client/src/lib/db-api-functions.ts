import { apiRequest } from './queryClient';
import type { File, FolderDB, MessageDB, ChapterDB, SubtopicDB, InsertFile, InsertFolder, InsertMessage, InsertChapter, InsertSubtopic } from "@shared/schema";

// File operations - Permanent PostgreSQL Database
export async function getFiles(): Promise<File[]> {
  const response = await fetch('/api/files');
  if (!response.ok) {
    throw new Error('Failed to fetch files');
  }
  return response.json();
}

export async function createFile(fileData: InsertFile): Promise<File> {
  const response = await fetch('/api/files', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(fileData),
  });
  
  if (!response.ok) {
    throw new Error('Failed to create file');
  }
  return response.json();
}

export async function deleteFile(id: number): Promise<void> {
  const response = await fetch(`/api/files/${id}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    throw new Error('Failed to delete file');
  }
}

// Folder operations - Permanent PostgreSQL Database
export async function getFolders(): Promise<FolderDB[]> {
  const response = await fetch('/api/folders');
  if (!response.ok) {
    throw new Error('Failed to fetch folders');
  }
  return response.json();
}

export async function createFolder(folderData: InsertFolder): Promise<FolderDB> {
  const response = await fetch('/api/folders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(folderData),
  });
  
  if (!response.ok) {
    throw new Error('Failed to create folder');
  }
  return response.json();
}

export async function deleteFolder(id: number): Promise<void> {
  const response = await fetch(`/api/folders/${id}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    throw new Error('Failed to delete folder');
  }
}

// Message operations - Permanent PostgreSQL Database
export async function getMessages(): Promise<MessageDB[]> {
  const response = await fetch('/api/messages');
  if (!response.ok) {
    throw new Error('Failed to fetch messages');
  }
  return response.json();
}

export async function createMessage(messageData: InsertMessage): Promise<MessageDB> {
  const response = await fetch('/api/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(messageData),
  });
  
  if (!response.ok) {
    throw new Error('Failed to create message');
  }
  return response.json();
}

export async function deleteMessage(id: number): Promise<void> {
  const response = await fetch(`/api/messages/${id}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    throw new Error('Failed to delete message');
  }
}

export async function clearMessages(): Promise<void> {
  const response = await fetch('/api/messages', {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    throw new Error('Failed to clear messages');
  }
}

// Chapter operations - Permanent PostgreSQL Database
export async function getChapters(): Promise<ChapterDB[]> {
  const response = await fetch('/api/chapters');
  if (!response.ok) {
    throw new Error('Failed to fetch chapters');
  }
  return response.json();
}

export async function createChapter(chapterData: InsertChapter): Promise<ChapterDB> {
  const response = await fetch('/api/chapters', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(chapterData),
  });
  
  if (!response.ok) {
    throw new Error('Failed to create chapter');
  }
  return response.json();
}

export async function deleteChapter(id: number): Promise<void> {
  const response = await fetch(`/api/chapters/${id}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    throw new Error('Failed to delete chapter');
  }
}

// Subtopic operations - Permanent PostgreSQL Database
export async function getSubtopics(): Promise<SubtopicDB[]> {
  const response = await fetch('/api/subtopics');
  if (!response.ok) {
    throw new Error('Failed to fetch subtopics');
  }
  return response.json();
}

export async function getSubtopicsByChapter(chapterId: number): Promise<SubtopicDB[]> {
  const response = await fetch(`/api/chapters/${chapterId}/subtopics`);
  if (!response.ok) {
    throw new Error('Failed to fetch subtopics for chapter');
  }
  return response.json();
}

export async function createSubtopic(subtopicData: InsertSubtopic): Promise<SubtopicDB> {
  const response = await fetch('/api/subtopics', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(subtopicData),
  });
  
  if (!response.ok) {
    throw new Error('Failed to create subtopic');
  }
  return response.json();
}

export async function deleteSubtopic(id: number): Promise<void> {
  const response = await fetch(`/api/subtopics/${id}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    throw new Error('Failed to delete subtopic');
  }
}