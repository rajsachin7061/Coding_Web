const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const dataDir = path.join(__dirname, '../data');

// Ensure data directory exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

class TrackingDatabase {
  constructor() {
    this.callLogsFile = path.join(dataDir, 'callLogs.json');
    this.messagesFile = path.join(dataDir, 'messages.json');
    this.socialMediaFile = path.join(dataDir, 'socialMedia.json');
    this.locationsFile = path.join(dataDir, 'locations.json');
    this.appsFile = path.join(dataDir, 'apps.json');
    this.screenTimeFile = path.join(dataDir, 'screenTime.json');
    this.accountsFile = path.join(dataDir, 'accounts.json');
    
    this.initializeFiles();
  }

  initializeFiles() {
    const files = [
      this.callLogsFile,
      this.messagesFile,
      this.socialMediaFile,
      this.locationsFile,
      this.appsFile,
      this.screenTimeFile,
      this.accountsFile
    ];

    files.forEach(file => {
      if (!fs.existsSync(file)) {
        fs.writeFileSync(file, JSON.stringify([], null, 2));
      }
    });
  }

  // Account Methods
  createAccount(name, ownerEmail) {
    const accounts = this.readFile(this.accountsFile);
    const token = uuidv4();
    const account = {
      id: uuidv4(),
      name,
      ownerEmail: ownerEmail || null,
      token,
      createdAt: new Date().toISOString(),
      registeredDevices: [],
      permissionsGranted: false
    };
    accounts.push(account);
    this.writeFile(this.accountsFile, accounts);
    return account;
  }

  getAccountByToken(token) {
    const accounts = this.readFile(this.accountsFile);
    return accounts.find(a => a.token === token) || null;
  }

  getAccountById(id) {
    const accounts = this.readFile(this.accountsFile);
    return accounts.find(a => a.id === id) || null;
  }

  registerDeviceToAccount(token, deviceId, permissions = []) {
    const accounts = this.readFile(this.accountsFile);
    const idx = accounts.findIndex(a => a.token === token);
    if (idx === -1) return null;
    const device = {
      id: deviceId || uuidv4(),
      permissions: permissions,
      registeredAt: new Date().toISOString()
    };
    accounts[idx].registeredDevices.push(device);
    // if any permissions were provided, mark permissionsGranted true
    if (permissions && permissions.length > 0) accounts[idx].permissionsGranted = true;
    this.writeFile(this.accountsFile, accounts);
    return accounts[idx];
  }

  // Call Log Methods
  addCallLog(phoneNumber, contactName, duration, type, timestamp, accountId) {
    const logs = this.readFile(this.callLogsFile);
    const callLog = {
      id: uuidv4(),
      phoneNumber,
      contactName,
      duration: duration, // in seconds
      type: type, // incoming, outgoing, missed
      timestamp: timestamp || new Date().toISOString(),
      date: new Date(timestamp || new Date()).toLocaleDateString()
    };
    if (accountId) callLog.accountId = accountId;
    logs.push(callLog);
    this.writeFile(this.callLogsFile, logs);
    return callLog;
  }

  getCallLogs(limit = 50) {
    const logs = this.readFile(this.callLogsFile);
    return logs.slice(-limit).reverse();
  }

  // Message Methods
  addMessage(contactNumber, contactName, messageText, type, timestamp, accountId) {
    const messages = this.readFile(this.messagesFile);
    const message = {
      id: uuidv4(),
      contactNumber,
      contactName,
      messageText,
      type: type, // sms, whatsapp, telegram, etc.
      direction: 'incoming', // incoming or outgoing
      timestamp: timestamp || new Date().toISOString(),
      date: new Date(timestamp || new Date()).toLocaleDateString(),
      isRead: false
    };
    if (accountId) message.accountId = accountId;
    messages.push(message);
    this.writeFile(this.messagesFile, messages);
    return message;
  }

  getMessages(limit = 100) {
    const messages = this.readFile(this.messagesFile);
    return messages.slice(-limit).reverse();
  }

  getMessagesByContact(contactNumber) {
    const messages = this.readFile(this.messagesFile);
    return messages.filter(msg => msg.contactNumber === contactNumber).reverse();
  }

  // Social Media Methods
  addSocialMediaActivity(platform, username, activityType, details, timestamp, accountId) {
    const activities = this.readFile(this.socialMediaFile);
    const activity = {
      id: uuidv4(),
      platform, // Instagram, TikTok, Facebook, Snapchat, etc.
      username,
      activityType, // post, like, comment, story, follow, etc.
      details,
      timestamp: timestamp || new Date().toISOString(),
      date: new Date(timestamp || new Date()).toLocaleDateString()
    };
    if (accountId) activity.accountId = accountId;
    activities.push(activity);
    this.writeFile(this.socialMediaFile, activities);
    return activity;
  }

  getSocialMediaActivity(limit = 50) {
    const activities = this.readFile(this.socialMediaFile);
    return activities.slice(-limit).reverse();
  }

  getSocialMediaByPlatform(platform) {
    const activities = this.readFile(this.socialMediaFile);
    return activities.filter(act => act.platform.toLowerCase() === platform.toLowerCase()).reverse();
  }

  // Location Methods
  addLocation(latitude, longitude, accuracy, locationName, timestamp, accountId) {
    const locations = this.readFile(this.locationsFile);
    const location = {
      id: uuidv4(),
      latitude,
      longitude,
      accuracy,
      locationName: locationName || 'Unknown Location',
      timestamp: timestamp || new Date().toISOString(),
      date: new Date(timestamp || new Date()).toLocaleDateString()
    };
    if (accountId) location.accountId = accountId;
    locations.push(location);
    this.writeFile(this.locationsFile, locations);
    return location;
  }

  getLatestLocation() {
    const locations = this.readFile(this.locationsFile);
    return locations.length > 0 ? locations[locations.length - 1] : null;
  }

  getLocationHistory(limit = 30) {
    const locations = this.readFile(this.locationsFile);
    return locations.slice(-limit).reverse();
  }

  // App Usage Methods
  addAppUsage(appName, packageName, timeSpent, timestamp, accountId) {
    const apps = this.readFile(this.appsFile);
    const appUsage = {
      id: uuidv4(),
      appName,
      packageName,
      timeSpent: timeSpent, // in minutes
      timestamp: timestamp || new Date().toISOString(),
      date: new Date(timestamp || new Date()).toLocaleDateString()
    };
    if (accountId) appUsage.accountId = accountId;
    apps.push(appUsage);
    this.writeFile(this.appsFile, apps);
    return appUsage;
  }

  getAppUsage(limit = 50) {
    const apps = this.readFile(this.appsFile);
    return apps.slice(-limit).reverse();
  }

  getTopApps(limit = 10) {
    const apps = this.readFile(this.appsFile);
    const appMap = {};
    
    apps.forEach(app => {
      if (!appMap[app.appName]) {
        appMap[app.appName] = { appName: app.appName, totalTime: 0, usageCount: 0 };
      }
      appMap[app.appName].totalTime += app.timeSpent;
      appMap[app.appName].usageCount++;
    });

    return Object.values(appMap)
      .sort((a, b) => b.totalTime - a.totalTime)
      .slice(0, limit);
  }

  // Screen Time Methods
  addScreenTime(date, totalMinutes, unlockedCount, accountId) {
    const screenTime = this.readFile(this.screenTimeFile);
    const entry = {
      id: uuidv4(),
      date: date || new Date().toLocaleDateString(),
      totalMinutes,
      unlockedCount
    };
    if (accountId) entry.accountId = accountId;
    
    // Remove existing entry for the same date if it exists
    const filtered = screenTime.filter(st => st.date !== entry.date);
    filtered.push(entry);
    this.writeFile(this.screenTimeFile, filtered);
    return entry;
  }

  // Return all stored data for a given accountId (consent-based)
  getAllDataForAccount(accountId) {
    if (!accountId) return null;
    const callLogs = this.readFile(this.callLogsFile).filter(i => i.accountId === accountId);
    const messages = this.readFile(this.messagesFile).filter(i => i.accountId === accountId);
    const socialMedia = this.readFile(this.socialMediaFile).filter(i => i.accountId === accountId);
    const locations = this.readFile(this.locationsFile).filter(i => i.accountId === accountId);
    const apps = this.readFile(this.appsFile).filter(i => i.accountId === accountId);
    const screenTime = this.readFile(this.screenTimeFile).filter(i => i.accountId === accountId);

    return {
      callLogs,
      messages,
      socialMedia,
      locations,
      apps,
      screenTime
    };
  }

  getScreenTime(days = 7) {
    const screenTime = this.readFile(this.screenTimeFile);
    return screenTime.slice(-days);
  }

  // Utility Methods
  readFile(filePath) {
    try {
      const data = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error(`Error reading file ${filePath}:`, error);
      return [];
    }
  }

  writeFile(filePath, data) {
    try {
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    } catch (error) {
      console.error(`Error writing file ${filePath}:`, error);
    }
  }

  // Get comprehensive statistics
  getStatistics() {
    const callLogs = this.readFile(this.callLogsFile);
    const messages = this.readFile(this.messagesFile);
    const socialMedia = this.readFile(this.socialMediaFile);
    const locations = this.readFile(this.locationsFile);
    const apps = this.readFile(this.appsFile);
    const screenTime = this.readFile(this.screenTimeFile);

    return {
      totalCalls: callLogs.length,
      totalMessages: messages.length,
      totalSocialMediaActivities: socialMedia.length,
      totalLocations: locations.length,
      totalAppUsages: apps.length,
      totalScreenTimeRecords: screenTime.length,
      lastActivity: this.getLastActivity(),
      topContacts: this.getTopContacts(5),
      topApps: this.getTopApps(5),
      averageDailyScreenTime: this.getAverageDailyScreenTime()
    };
  }

  getLastActivity() {
    const all = [];
    
    const callLogs = this.readFile(this.callLogsFile);
    const messages = this.readFile(this.messagesFile);
    const socialMedia = this.readFile(this.socialMediaFile);
    const locations = this.readFile(this.locationsFile);

    if (callLogs.length > 0) all.push(callLogs[callLogs.length - 1]);
    if (messages.length > 0) all.push(messages[messages.length - 1]);
    if (socialMedia.length > 0) all.push(socialMedia[socialMedia.length - 1]);
    if (locations.length > 0) all.push(locations[locations.length - 1]);

    if (all.length === 0) return null;

    return all.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))[0];
  }

  getTopContacts(limit = 5) {
    const messages = this.readFile(this.messagesFile);
    const contactMap = {};

    messages.forEach(msg => {
      if (!contactMap[msg.contactNumber]) {
        contactMap[msg.contactNumber] = {
          contactNumber: msg.contactNumber,
          contactName: msg.contactName,
          messageCount: 0
        };
      }
      contactMap[msg.contactNumber].messageCount++;
    });

    return Object.values(contactMap)
      .sort((a, b) => b.messageCount - a.messageCount)
      .slice(0, limit);
  }

  getAverageDailyScreenTime() {
    const screenTime = this.readFile(this.screenTimeFile);
    if (screenTime.length === 0) return 0;
    
    const total = screenTime.reduce((sum, st) => sum + st.totalMinutes, 0);
    return Math.round(total / screenTime.length);
  }

  // Clear old data (older than X days)
  clearOldData(daysToKeep = 30) {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);

    const files = [
      this.callLogsFile,
      this.messagesFile,
      this.socialMediaFile,
      this.locationsFile,
      this.appsFile
    ];

    files.forEach(file => {
      const data = this.readFile(file);
      const filtered = data.filter(item => new Date(item.timestamp) > cutoffDate);
      this.writeFile(file, filtered);
    });

    return `Cleared data older than ${daysToKeep} days`;
  }
}

module.exports = TrackingDatabase;
