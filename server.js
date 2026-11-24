app.use(express.json());
// OWNER ONLY GLOBAL CHAT

const globalMessages = [];

app.get('/api/global-chat', verifyUser, async (req, res) => {
  const isOwner =
    req.user.email_verified === true &&
    req.user.email?.toLowerCase() === process.env.OWNER_EMAIL?.toLowerCase();

  if (!isOwner) {
    return res.status(403).json({ error: 'Owner only' });
  }

  res.json(globalMessages);
});

app.post('/api/global-chat', verifyUser, async (req, res) => {
  const isOwner =
    req.user.email_verified === true &&
    req.user.email?.toLowerCase() === process.env.OWNER_EMAIL?.toLowerCase();

  if (!isOwner) {
    return res.status(403).json({ error: 'Owner only' });
  }

  const { message } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Invalid message' });
  }

  globalMessages.push({
    message: message.slice(0, 1000),
    time: new Date().toISOString(),
  });

  res.json({ success: true });
});
