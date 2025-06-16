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
  return apiRequest({
    url: '/api/files',
    method: 'POST',
    body: fileData,
  });
}

export async function deleteFile(id: number): Promise<void> {
  await apiRequest({
    url: `/api/files/${id}`,
    method: 'DELETE',
  });
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
  return apiRequest({
    url: '/api/folders',
    method: 'POST',
    body: folderData,
  });
}

export async function deleteFolder(id: number): Promise<void> {
  await apiRequest({
    url: `/api/folders/${id}`,
    method: 'DELETE',
  });
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
  return apiRequest({
    url: '/api/messages',
    method: 'POST',
    body: messageData,
  });
}

export async function deleteMessage(id: number): Promise<void> {
  await apiRequest({
    url: `/api/messages/${id}`,
    method: 'DELETE',
  });
}

export async function clearMessages(): Promise<void> {
  await apiRequest({
    url: '/api/messages',
    method: 'DELETE',
  });
}