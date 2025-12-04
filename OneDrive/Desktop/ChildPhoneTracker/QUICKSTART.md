## Quick Start Guide - Child Phone Tracker

### 🚀 Installation & Setup (5 minutes)

#### Step 1: Install Dependencies
Open Command Prompt or PowerShell in the project folder and run:
```bash
npm install
```

#### Step 2: Start the Server
```bash
npm start
```

You should see:
```
╔════════════════════════════════════════╗
║  Child Phone Tracker Server            ║
║  Server running on port 3000           ║
║  http://localhost:3000                 ║
╚════════════════════════════════════════╝
```

#### Step 3: Open Dashboard
Open your web browser and navigate to:
```
http://localhost:3000
```

---

### 📊 First Time Use

#### Option A: Add Data Manually
1. Click the **"Add [Type]"** buttons on each section
2. Fill in the required information
3. Click Submit to save

#### Option B: Load Sample Data (Recommended)
1. **On Windows**: Right-click `add-sample-data.ps1` → Run with PowerShell
   - Or open PowerShell in the folder and run: `.\add-sample-data.ps1`

2. **On Mac/Linux**: Run in terminal:
   ```bash
   bash add-sample-data.sh
   ```

The dashboard will automatically populate with example data!

---

### 🎯 Main Dashboard Sections

#### 📊 Dashboard (Home)
- View all statistics at a glance
- See current location
- Check top apps
- Review top contacts
- View recent activities

#### 📞 Call Logs
- Track all incoming, outgoing, and missed calls
- View contact names and phone numbers
- See call duration and timestamps
- Filter by call type

#### 💬 Messages
- Monitor all text messages
- Support for SMS, WhatsApp, Telegram, Instagram, Facebook
- View message content and timestamps
- Filter by message type

#### 📱 Social Media
- Track activity on major platforms
- Platforms: Instagram, TikTok, Facebook, Snapchat, Twitter, YouTube, Discord
- Monitor activity types: posts, likes, comments, stories, follows
- Filter by platform

#### 📍 Location
- View current location with coordinates
- See location history
- Track GPS accuracy
- Named locations (Home, School, Park, etc.)

#### 📱 App Usage
- See which apps are being used most
- Time spent on each app
- Visual charts of top apps
- Daily app usage tracking

#### ⏱️ Screen Time
- Daily screen time statistics (last 7 days)
- Total minutes per day
- Number of unlocks per day
- Average time per unlock

---

### 💾 Adding Tracking Data

#### Via Dashboard (GUI)
1. Navigate to the section you want (Calls, Messages, etc.)
2. Click the "Add [Type]" button
3. Fill in the form fields marked with *
4. Click Submit

#### Via PowerShell/Terminal (API)
Example - Add a call:
```powershell
$body = @{
    phoneNumber = "5551234567"
    contactName = "John Doe"
    duration = 300
    type = "incoming"
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:3000/api/call-logs" `
    -Method POST `
    -ContentType "application/json" `
    -Body $body
```

---

### 🔍 Data Fields Reference

#### Call Log Required Fields:
- Contact Name (e.g., "Mom", "John Doe")
- Phone Number (e.g., "5551234567")
- Duration in seconds (e.g., 300)
- Type: incoming, outgoing, or missed

#### Message Required Fields:
- Contact Name (e.g., "Sarah")
- Phone/Contact Number
- Message Text
- Type: sms, whatsapp, telegram, instagram, facebook

#### Social Media Required Fields:
- Platform: Instagram, TikTok, Facebook, Snapchat, Twitter, YouTube, Discord
- Username (with @ if applicable)
- Activity Type: post, like, comment, story, follow, etc.

#### Location Required Fields:
- Latitude (e.g., 40.7128)
- Longitude (e.g., -74.0060)
- (Optional) Location Name: Home, School, Park, etc.
- (Optional) Accuracy in meters

#### App Usage Required Fields:
- App Name (e.g., "Instagram")
- Package Name (e.g., "com.instagram.android")
- Time Spent in minutes

#### Screen Time Required Fields:
- Date (YYYY-MM-DD format)
- Total Minutes (e.g., 480)
- Unlock Count (number of times phone was unlocked)

---

### 🛠️ Common Tasks

#### Check Today's Activity
1. Go to Dashboard
2. Scroll down to "Recent Activity"
3. All recent activities will be listed by timestamp

#### Find Messages from Specific Contact
1. Go to Messages section
2. Use the filter dropdown to search
3. Or go to specific contact's conversation

#### View Top Apps
1. Go to Apps section
2. See the "Top Apps by Usage Time" chart
3. Shows most-used apps with time spent

#### Track Daily Screen Time Trends
1. Go to Screen Time section
2. View the chart for last 7 days
3. Compare trends day-by-day

#### Clear Old Data
1. Old data (30+ days) is automatically managed
2. To manually clear: Use the API endpoint:
   ```
   DELETE http://localhost:3000/api/old-data?days=30
   ```

---

### ⚙️ Development Commands

#### Start Server with Auto-Reload
```bash
npm run dev
```
(Requires nodemon - installs automatically)

#### Check Server Status
Navigate to:
```
http://localhost:3000/api/health
```

#### Get Full Dashboard Data
Open in browser or API call:
```
http://localhost:3000/api/dashboard
```

---

### 🐛 Troubleshooting

**Q: Port 3000 is already in use**
- Change port: Edit `server.js`, change `const PORT = 3000` to another number
- Or close the application using port 3000

**Q: Data is not showing after adding**
- Refresh the page (F5 or Ctrl+R)
- Check browser console for errors (F12)
- Ensure server is running

**Q: Dashboard looks broken on mobile**
- The app is responsive and should work on all devices
- Clear browser cache and reload
- Try a different browser

**Q: Can't connect to server**
- Check if server is running (`npm start`)
- Verify URL is `http://localhost:3000` (not https)
- Check if port 3000 is accessible

---

### 📱 Mobile Monitoring Integration

To monitor a mobile device, you would need:
1. A mobile app (Android/iOS) that collects data
2. An API integration to send data to this server
3. The mobile app periodically sends:
   - Call logs
   - Messages
   - Social media activity
   - Location data
   - App usage
   - Screen time

---

### 📊 Data Storage Location

All data is stored in JSON files in the `data/` folder:
- `callLogs.json` - Call records
- `messages.json` - Text messages
- `socialMedia.json` - Social media activities
- `locations.json` - GPS locations
- `apps.json` - App usage data
- `screenTime.json` - Daily screen time

You can backup these files or analyze them separately.

---

### 🔐 Security Notes

- The current version has no authentication (admin password)
- Run on trusted networks only
- Consider adding authentication for production use
- Protect your system password and access
- Ensure consent before monitoring

---

### 💡 Tips & Tricks

1. **Export Data**: You can open `data/*.json` files with any text editor to see raw data
2. **Bulk Import**: Edit JSON files directly to add large amounts of data
3. **Share Reports**: Export the dashboard as PDF using browser print (Ctrl+P)
4. **Analyze Trends**: Check the statistics endpoint for insights
5. **Automate**: Use the API with scripts to automatically log device activity

---

### 📞 What's Next?

After setting up:
1. Add real monitoring data from the child's device
2. Create a mobile app that sends data to this server
3. Set up periodic sync from the child's phone
4. Create alerts for concerning activities
5. Generate weekly/monthly reports

---

### ✅ Setup Checklist

- [ ] npm install completed
- [ ] Server running on http://localhost:3000
- [ ] Dashboard loads in browser
- [ ] Sample data added (optional)
- [ ] Can see statistics on dashboard
- [ ] Can add new data via forms
- [ ] Can view data in tables

Once all items are checked, you're ready to start monitoring!

---

**Need Help?** Refer to the main README.md file for detailed API documentation.
