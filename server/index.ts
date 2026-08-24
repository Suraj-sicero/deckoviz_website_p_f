import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Deckoviz Backend is running!' });
});

// Get user profile
app.get('/api/users/me', async (req, res) => {
  try {
    const role = req.query.role as string || 'teacher';
    // In a real app we use JWT, here we just query by role
    const user = await prisma.user.findFirst({
      where: { role: role }
    });
    
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Teacher dashboard endpoints
app.get('/api/teacher/dashboard', async (req, res) => {
  try {
    const teacherId = req.query.teacherId as string;
    
    // Get their classes
    const activeClassesCount = await prisma.class.count({
      where: { teacherId: teacherId }
    });
    
    res.json({
      activeClasses: activeClassesCount,
      studentsNeedingAttention: 3, // mock complex logic
      alerts: [
        { id: 1, message: 'New messages in Year 9 Science' }
      ]
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Student dashboard endpoints
app.get('/api/student/dashboard', async (req, res) => {
  try {
    const studentId = req.query.studentId as string;
    
    // Fetch their recent journal entries or stats
    const recentJournals = await prisma.journalEntry.findMany({
      where: { studentId: studentId },
      orderBy: { createdAt: 'desc' },
      take: 2
    });
    
    res.json({
      streak: 5,
      currentFocus: 'Quantum Physics',
      recentJournals
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Collections endpoint
app.get('/api/collections', async (req, res) => {
  try {
    const userId = req.query.userId as string;
    const collections = await prisma.collection.findMany({
      where: { userId: userId },
      include: { artworks: true }
    });
    res.json(collections);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});
// Journals endpoints
app.get('/api/journals', async (req, res) => {
  try {
    const studentId = req.query.studentId as string;
    const journals = await prisma.journalEntry.findMany({
      where: { studentId: studentId },
      orderBy: { createdAt: 'desc' }
    });
    res.json(journals);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/journals', async (req, res) => {
  try {
    const { studentId, content, sentiment, tags } = req.body;
    const newJournal = await prisma.journalEntry.create({
      data: {
        studentId,
        content,
        sentiment: sentiment || 'neutral',
        tags: JSON.stringify(tags || [])
      }
    });
    res.json(newJournal);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
