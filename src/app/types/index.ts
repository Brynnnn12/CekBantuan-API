import { Request } from 'express';

interface User {
  id: string;
  username: string;
  password: string;
  email: string;
  announcements: Announcement[];
  aidPrograms: AidProgram[];
}

interface Announcement {
  id: string;
  title: string;
  content: string;
  status: 'DRAFT' | 'PUBLISHED';
  createdAt: Date;
  authorId: string;
  author: User;
}

interface Recipient {
  id: string;
  nik: string;
  name: string;
  address: string;
  notes?: string;
  programs: ProgramRecipient[];
}

interface AidProgram {
  id: string;
  name: string;
  description: string;
  status: 'DRAFT' | 'ACTIVE';
  adminId: string;
  admin: User;
  recipients: ProgramRecipient[];
}

interface ProgramRecipient {
  programId: string;
  program: AidProgram;
  recipientId: string;
  recipient: Recipient;
}

interface AuthRequest extends Request {
  user?: User;
}

interface AidProgramWithDetails {
  id: string;
  name: string;
  description: string;
  status: 'DRAFT' | 'ACTIVE';
  adminId: string;
  admin: { id: string; username: string; email: string };
  recipients: Array<{
    recipient: { id: string; nik: string; name: string; address: string; notes: string | null };
  }>;
}

interface RecipientWithPrograms {
  id: string;
  nik: string;
  name: string;
  address: string;
  notes: string | null;
  programs: Array<{
    programId: string;
    recipientId: string;
  }>;
}

interface ProgramRecipientWithDetails {
  programId: string;
  recipientId: string;
  program: {
    id: string;
    name: string;
    description: string;
    status: 'DRAFT' | 'ACTIVE';
    adminId: string;
  };
  recipient: {
    id: string;
    nik: string;
    name: string;
    address: string;
    notes: string | null;
  };
}

interface RecipientByProgram {
  programId: string;
  recipientId: string;
  recipient: {
    id: string;
    nik: string;
    name: string;
    address: string;
    notes: string | null;
  };
}

interface ProgramByRecipient {
  programId: string;
  recipientId: string;
  program: {
    id: string;
    name: string;
    description: string;
    status: 'DRAFT' | 'ACTIVE';
    adminId: string;
  };
}

export {
  User,
  Announcement,
  Recipient,
  AidProgram,
  ProgramRecipient,
  AuthRequest,
  AidProgramWithDetails,
  RecipientWithPrograms,
  ProgramRecipientWithDetails,
  RecipientByProgram,
  ProgramByRecipient,
};

declare module 'express' {
  interface Request {
    user?: Pick<User, 'id' | 'email' | 'username'>;
  }
}
