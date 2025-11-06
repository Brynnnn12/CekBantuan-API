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

export { User, Announcement, Recipient, AidProgram, ProgramRecipient, AuthRequest };

declare global {
  namespace Express {
    interface Request {
      user?: Pick<User, 'id' | 'email' | 'username'>;
    }
  }
}
