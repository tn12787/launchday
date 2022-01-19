import axios from 'axios';
import { Release, ReleaseTask } from '@prisma/client';

import { DeleteCommentVars, NewCommentVars } from './types';

import { ReleaseTaskEventWithUser } from 'types';

export const fetchSingleTask = async (id: string) => {
  if (!id) return; //TODO: deal with this hack

  return await axios.get<ReleaseTask & { release: Release }>(`/api/tasks/${id}`);
};

export const fetchTaskActivity = async (id: string) => {
  if (!id) return; //TODO: deal with this hack

  return await axios.get<ReleaseTaskEventWithUser[]>(`/api/tasks/${id}/activity`);
};

export const postNewComment = async ({ id, text }: NewCommentVars) => {
  if (!id) return; //TODO: deal with this hack

  return await axios.post(`/api/tasks/${id}/activity/comments`, { text });
};

export const deleteComment = async ({ commentId, taskId }: DeleteCommentVars) => {
  if (!taskId || !commentId) return;

  return await axios.delete(`/api/tasks/${taskId}/activity/comments/${commentId}`);
};
