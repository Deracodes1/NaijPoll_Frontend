export interface PollOption {
  id: string;
  optionText: string;
  pollId: string;
  createdAt: string;
  updatedAt: string;
}

export interface PollCreator {
  id: string;
  name: string;
  email: string;
  state: string;
  role: string;
  joinedDate: string;
  updatedAt: string;
}

export type PollStatus = 'draft' | 'active' | 'closed';

export interface Poll {
  id: string;
  name: string;
  description: string;
  status: PollStatus;
  endsAt: string | null;
  createdById: string;
  createdBy: PollCreator;
  options: PollOption[];
  createdAt: string;
  updatedAt: string;
}

export interface PollMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PollsResponse {
  data: Poll[];
  meta: PollMeta;
}
export interface VoteResult {
  optionId: string;
  optionText: string;
  count: number;
}

export interface ResultsResponse {
  success: boolean;
  statusCode: number;
  data: VoteResult[];
  message: string;
  timestamp: string;
}
