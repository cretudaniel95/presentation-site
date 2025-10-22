import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { prisma } from '@/lib/db';

describe('Contact API Integration', () => {
  const testMessageData = {
    name: 'Test User',
    email: 'test@example.com',
    phone: '+1234567890',
    subject: 'Test Subject',
    message: 'This is a test message',
  };

  let createdMessageId: string;

  beforeAll(async () => {
    // Clean up test data
    await prisma.contactMessage.deleteMany({
      where: { email: 'test@example.com' },
    });
  });

  afterAll(async () => {
    // Clean up test data
    await prisma.contactMessage.deleteMany({
      where: { email: 'test@example.com' },
    });
  });

  it('should create a contact message', async () => {
    const message = await prisma.contactMessage.create({
      data: testMessageData,
    });

    createdMessageId = message.id;
    expect(message).toBeDefined();
    expect(message.name).toBe(testMessageData.name);
    expect(message.email).toBe(testMessageData.email);
    expect(message.read).toBe(false);
  });

  it('should retrieve contact messages', async () => {
    const messages = await prisma.contactMessage.findMany({
      where: { email: 'test@example.com' },
    });

    expect(messages).toHaveLength(1);
    expect(messages[0].name).toBe(testMessageData.name);
  });

  it('should mark message as read', async () => {
    const updatedMessage = await prisma.contactMessage.update({
      where: { id: createdMessageId },
      data: { read: true },
    });

    expect(updatedMessage.read).toBe(true);
  });

  it('should delete a contact message', async () => {
    await prisma.contactMessage.delete({
      where: { id: createdMessageId },
    });

    const message = await prisma.contactMessage.findUnique({
      where: { id: createdMessageId },
    });

    expect(message).toBeNull();
  });

  it('should retrieve unread messages', async () => {
    // Create test messages
    await prisma.contactMessage.createMany({
      data: [
        { ...testMessageData, subject: 'Unread 1', read: false },
        { ...testMessageData, subject: 'Read 1', read: true },
        { ...testMessageData, subject: 'Unread 2', read: false },
      ],
    });

    const unreadMessages = await prisma.contactMessage.findMany({
      where: { email: 'test@example.com', read: false },
    });

    expect(unreadMessages.length).toBeGreaterThan(0);
    unreadMessages.forEach((msg) => {
      expect(msg.read).toBe(false);
    });

    // Clean up
    await prisma.contactMessage.deleteMany({
      where: { email: 'test@example.com' },
    });
  });

  it('should order messages by creation date', async () => {
    // Create test messages
    const msg1 = await prisma.contactMessage.create({
      data: { ...testMessageData, subject: 'First' },
    });

    const msg2 = await prisma.contactMessage.create({
      data: { ...testMessageData, subject: 'Second' },
    });

    const messages = await prisma.contactMessage.findMany({
      where: { email: 'test@example.com' },
      orderBy: { createdAt: 'desc' },
    });

    expect(messages[0].id).toBe(msg2.id);
    expect(messages[1].id).toBe(msg1.id);

    // Clean up
    await prisma.contactMessage.deleteMany({
      where: { email: 'test@example.com' },
    });
  });
});

