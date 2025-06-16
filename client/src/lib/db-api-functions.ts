import { apiRequest } from './queryClient';
import type { File, FolderDB, MessageDB, InsertFile, InsertFolder, InsertMessage } from "@shared/schema";

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