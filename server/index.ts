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
// Chat Endpoints
app.get('/api/chat/session', async (req, res) => {
  try {
    const userId = req.query.userId as string;
    // Find or create a session for this user
    let session = await prisma.session.findFirst({
      where: { userId, type: 'vizzy_chat' },
      orderBy: { createdAt: 'desc' }
    });

    if (!session) {
      // Initialize with a welcome message
      const initialContent = JSON.stringify([
        { id: '1', sender: 'vizzy', text: "Hi! I'm Vizzy, your AI companion. I'm connected to the live backend now! What would you like to explore today?" }
      ]);
      session = await prisma.session.create({
        data: {
          title: 'General Chat',
          type: 'vizzy_chat',
          content: initialContent,
          userId: userId
        }
      });
    }

    res.json(session);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/api/chat/session', async (req, res) => {
  try {
    const { sessionId, userName } = req.body;
    const greetingName = userName ? userName.split(' ')[0] : 'there';
    const initialContent = JSON.stringify([
      { id: Date.now().toString(), sender: 'vizzy', text: `Hey ${greetingName}, how can I help you?` }
    ]);
    
    const session = await prisma.session.update({
      where: { id: sessionId },
      data: { content: initialContent }
    });
    
    res.json(session);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error clearing chat' });
  }
});

app.post('/api/chat/message', async (req, res) => {
  try {
    const { sessionId, message, history } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey || apiKey === "your-key-here") {
      // Fallback mock mode if no API key is provided
      const mockResponse = { id: Date.now().toString(), sender: 'vizzy', text: "I'm in mock mode because no GEMINI_API_KEY was found in server/.env! Add one to chat with the real me." };
      const newHistory = [...history, { id: Date.now().toString(), sender: 'student', text: message }, mockResponse];
      
      await prisma.session.update({
        where: { id: sessionId },
        data: { content: JSON.stringify(newHistory) }
      });
      
      return res.json(mockResponse);
    }

    // Call Real Gemini API
    const { GoogleGenAI } = await import('@google/genai');
    const ai = new GoogleGenAI({ apiKey });
    
    // Format history for Gemini
    const systemInstruction = `You are Vizzy, an encouraging, Socratic AI tutor for a student. Guide them to answers using questions rather than just giving the direct answer. Keep responses concise. Focus on the user's latest message but use history for context.
    
IMPORTANT VISUAL RULE: If the student asks to "show visually", "generate an image", or requests visual context, you MUST return a Markdown image using the Pollinations AI service.
Format: ![description](https://image.pollinations.ai/prompt/detailed-visual-description?width=800&height=400&nologo=true)
Example: ![A futuristic cyber city with neon lights](https://image.pollinations.ai/prompt/A%20futuristic%20cyber%20city%20with%20neon%20lights?width=800&height=400&nologo=true)
Always URL-encode the prompt in the URL. Keep the image description highly detailed for the best result.`;
    
    const formattedHistory = history.map((msg: any) => `${msg.sender === 'vizzy' ? 'Vizzy' : 'Student'}: ${msg.text}`).join('\n');
    const promptWithHistory = `Past Conversation:\n${formattedHistory}\n\nStudent's New Message: ${message}`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: promptWithHistory,
      config: {
        systemInstruction: systemInstruction,
      }
    });

    const aiText = response.text || "I'm not sure how to respond to that.";
    const aiMessage = { id: Date.now().toString(), sender: 'vizzy', text: aiText };
    const newHistory = [...history, { id: Date.now().toString(), sender: 'student', text: message }, aiMessage];
    
    // Save to DB
    await prisma.session.update({
      where: { id: sessionId },
      data: { content: JSON.stringify(newHistory) }
    });
    
    res.json(aiMessage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error processing AI response.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
