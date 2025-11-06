import prisma from '../../config/database';

export async function assignRecipientToProgram(programId: string, recipientId: string) {
  return prisma.programRecipient.create({
    data: { programId, recipientId },
    include: { program: true, recipient: true },
  });
}

export async function removeRecipientFromProgram(programId: string, recipientId: string) {
  return prisma.programRecipient.delete({
    where: {
      programId_recipientId: { programId, recipientId },
    },
  });
}

export async function findRecipientsByProgram(programId: string) {
  return prisma.programRecipient.findMany({
    where: { programId },
    include: { recipient: true },
  });
}

export async function findProgramsByRecipient(recipientId: string) {
  return prisma.programRecipient.findMany({
    where: { recipientId },
    include: { program: true },
  });
}

export async function checkRecipientAssignment(programId: string, recipientId: string) {
  return prisma.programRecipient.findUnique({
    where: {
      programId_recipientId: { programId, recipientId },
    },
  });
}
