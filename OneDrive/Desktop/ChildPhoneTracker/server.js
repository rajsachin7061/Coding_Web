const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const TrackingDatabase = require('./src/database');
const QRCode = require('qrcode');

const app = express();
const db = new TrackingDatabase();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3000;

// ==================== ACCOUNT & REGISTRATION ROUTES ====================
// Create a parent account and return a registration token/link.
app.post('/api/accounts', (req, res) => {
  try {
    const { name, ownerEmail } = req.body;
    if (!name) return res.status(400).json({ error: 'Missing account name' });
    const account = db.createAccount(name, ownerEmail);
    const link = `${req.protocol}://${req.get('host')}/register.html?token=${account.token}`;
    res.status(201).json({ accountId: account.id, token: account.token, registrationLink: link });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint for a device to register to an account using the token (consent required)
app.post('/api/accounts/:token/register', (req, res) => {
  try {
    const { token } = req.params;
    const { deviceId, permissions } = req.body;
    const account = db.registerDeviceToAccount(token, deviceId, permissions || []);
    if (!account) return res.status(404).json({ error: 'Invalid registration token' });
    res.json({ message: 'Device registered (consent required)', account });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all data for a given account (requires that data be associated with accountId)
app.get('/api/accounts/:accountId/data', (req, res) => {
  try {
    const { accountId } = req.params;
    const account = db.getAccountById(accountId);
    if (!account) return res.status(404).json({ error: 'Account not found' });
    const data = db.getAllDataForAccount(accountId);
    res.json({ account, data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Short universal redirect link for token (works in any browser/device)
app.get('/r/:token', (req, res) => {
  try {
    const { token } = req.params;
    const account = db.getAccountByToken(token);
    if (!account) return res.status(404).send('Invalid token');
    return res.redirect(`/register.html?token=${encodeURIComponent(token)}`);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// QR code endpoint for a registration token — returns PNG image
app.get('/api/accounts/:token/qrcode', async (req, res) => {
  try {
    const { token } = req.params;
    const account = db.getAccountByToken(token);
    if (!account) return res.status(404).json({ error: 'Invalid token' });
    const link = `${req.protocol}://${req.get('host')}/r/${encodeURIComponent(token)}`;
    const buffer = await QRCode.toBuffer(link, { type: 'png', errorCorrectionLevel: 'H', width: 300 });
    res.type('png').send(buffer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==================== CALL LOG ROUTES ====================
app.post('/api/call-logs', (req, res) => {
  try {
    const { phoneNumber, contactName, duration, type, timestamp } = req.body;
    const accountId = req.body.accountId;
    
    if (!phoneNumber || !contactName || duration === undefined) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const callLog = db.addCallLog(phoneNumber, contactName, duration, type || 'incoming', timestamp, accountId);
    res.status(201).json(callLog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/call-logs', (req, res) => {
  try {
    const limit = req.query.limit || 50;
    const logs = db.getCallLogs(parseInt(limit));
    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==================== MESSAGE ROUTES ====================
app.post('/api/messages', (req, res) => {
  try {
    const { contactNumber, contactName, messageText, type, timestamp } = req.body;
    const accountId = req.body.accountId;
    
    if (!contactNumber || !contactName || !messageText) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const message = db.addMessage(contactNumber, contactName, messageText, type || 'sms', timestamp, accountId);
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/messages', (req, res) => {
  try {
    const limit = req.query.limit || 100;
    const messages = db.getMessages(parseInt(limit));
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/messages/:contactNumber', (req, res) => {
  try {
    const { contactNumber } = req.params;
    const messages = db.getMessagesByContact(contactNumber);
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==================== SOCIAL MEDIA ROUTES ====================
app.post('/api/social-media', (req, res) => {
  try {
    const { platform, username, activityType, details, timestamp } = req.body;
    const accountId = req.body.accountId;
    
    if (!platform || !username || !activityType) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const activity = db.addSocialMediaActivity(platform, username, activityType, details || '', timestamp, accountId);
    res.status(201).json(activity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/social-media', (req, res) => {
  try {
    const limit = req.query.limit || 50;
    const activities = db.getSocialMediaActivity(parseInt(limit));
    res.json(activities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/social-media/:platform', (req, res) => {
  try {
    const { platform } = req.params;
    const activities = db.getSocialMediaByPlatform(platform);
    res.json(activities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==================== LOCATION ROUTES ====================
app.post('/api/locations', (req, res) => {
  try {
    const { latitude, longitude, accuracy, locationName, timestamp } = req.body;
    const accountId = req.body.accountId;
    
    if (latitude === undefined || longitude === undefined) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const location = db.addLocation(latitude, longitude, accuracy || 0, locationName, timestamp, accountId);
    res.status(201).json(location);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/locations/latest', (req, res) => {
  try {
    const location = db.getLatestLocation();
    res.json(location);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/locations', (req, res) => {
  try {
    const limit = req.query.limit || 30;
    const locations = db.getLocationHistory(parseInt(limit));
    res.json(locations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==================== APP USAGE ROUTES ====================
app.post('/api/app-usage', (req, res) => {
  try {
    const { appName, packageName, timeSpent, timestamp } = req.body;
    const accountId = req.body.accountId;
    
    if (!appName || !packageName || timeSpent === undefined) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const usage = db.addAppUsage(appName, packageName, timeSpent, timestamp, accountId);
    res.status(201).json(usage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/app-usage', (req, res) => {
  try {
    const limit = req.query.limit || 50;
    const usage = db.getAppUsage(parseInt(limit));
    res.json(usage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/app-usage/top', (req, res) => {
  try {
    const limit = req.query.limit || 10;
    const topApps = db.getTopApps(parseInt(limit));
    res.json(topApps);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==================== SCREEN TIME ROUTES ====================
app.post('/api/screen-time', (req, res) => {
  try {
    const { date, totalMinutes, unlockedCount } = req.body;
    const accountId = req.body.accountId;
    
    if (totalMinutes === undefined) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const screenTime = db.addScreenTime(date, totalMinutes, unlockedCount || 0, accountId);
    res.status(201).json(screenTime);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/screen-time', (req, res) => {
  try {
    const days = req.query.days || 7;
    const screenTime = db.getScreenTime(parseInt(days));
    res.json(screenTime);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==================== STATISTICS & ANALYTICS ====================
app.get('/api/statistics', (req, res) => {
  try {
    const stats = db.getStatistics();
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/dashboard', (req, res) => {
  try {
    const stats = db.getStatistics();
    const callLogs = db.getCallLogs(10);
    const messages = db.getMessages(10);
    const socialMedia = db.getSocialMediaActivity(10);
    const location = db.getLatestLocation();
    const topApps = db.getTopApps(5);
    const screenTime = db.getScreenTime(7);

    res.json({
      statistics: stats,
      recentCalls: callLogs,
      recentMessages: messages,
      recentSocialMedia: socialMedia,
      currentLocation: location,
      topApps: topApps,
      screenTimeData: screenTime
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==================== MAINTENANCE ====================
app.delete('/api/old-data', (req, res) => {
  try {
    const daysToKeep = req.query.days || 30;
    const result = db.clearOldData(parseInt(daysToKeep));
    res.json({ message: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running', timestamp: new Date().toISOString() });
});

// Serve static files
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`
  ╔════════════════════════════════════════╗
  ║  Child Phone Tracker Server            ║
  ║  Server running on port ${PORT}         ║
  ║  http://localhost:${PORT}               ║
  ╚════════════════════════════════════════╝
  `);
});

module.exports = app;
