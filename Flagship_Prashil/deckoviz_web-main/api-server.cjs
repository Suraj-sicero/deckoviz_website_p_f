const express = require('express');
const cors = require('cors');
const { recordMode } = require('./render-worker.cjs');

const app = express();
app.use(cors());
app.use(express.json());

const jobs = {};

app.post('/api/export', (req, res) => {
  const { modeId, durationMinutes } = req.body;
  
  if (!modeId || !durationMinutes) {
    return res.status(400).json({ error: 'Missing modeId or durationMinutes' });
  }

  const jobId = Date.now().toString();
  jobs[jobId] = { status: 'rendering', modeId, durationMinutes };

  console.log(`Received job request [${jobId}]: ${modeId} for ${durationMinutes} minutes`);
  
  recordMode(modeId, parseFloat(durationMinutes))
    .then(() => {
      console.log(`Job complete: ${modeId}`);
      jobs[jobId].status = 'complete';
      jobs[jobId].file = `${modeId}_${durationMinutes}min.mp4`;
    })
    .catch(err => {
      console.error(`Job failed: ${modeId}`, err);
      jobs[jobId].status = 'error';
      jobs[jobId].error = err.message;
    });

  // Instantly return success to the UI with Job ID
  res.json({ message: 'Export job queued successfully', jobId, modeId, durationMinutes });
});

app.get('/api/status/:jobId', (req, res) => {
  const job = jobs[req.params.jobId];
  if (!job) return res.status(404).json({ error: 'Job not found' });
  res.json(job);
});

// Endpoint to download the finished video
const path = require('path');
app.get('/api/download/:filename', (req, res) => {
  const file = path.join(__dirname, req.params.filename);
  res.download(file);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`API Server running on http://localhost:${PORT}`);
});
