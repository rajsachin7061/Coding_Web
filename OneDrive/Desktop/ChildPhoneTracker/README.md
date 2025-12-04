# 📱 Child Phone Tracker

A comprehensive parental control and phone monitoring software that tracks everything on a child's phone including calls, messages, social media activity, location, app usage, and screen time.

## 🌟 Features

### Core Tracking Features
- **📞 Call Monitoring**: Track incoming, outgoing, and missed calls with duration
- **💬 Message Tracking**: Monitor SMS, WhatsApp, Telegram, Instagram DM, and Facebook messages
- **📱 Social Media Monitoring**: Track activity on Instagram, TikTok, Facebook, Snapchat, Twitter, YouTube, and Discord
- **📍 Location Tracking**: GPS-based location monitoring with accuracy metrics
- **⏱️ App Usage Monitoring**: Track which apps are being used and for how long
- **📊 Screen Time Tracking**: Daily screen time statistics and unlock counts

### Dashboard Features
- **Real-time Statistics**: Overview of total calls, messages, social activities, and locations
- **Current Location**: Display of the latest tracked location
- **Top Apps Chart**: Visual representation of most-used apps
- **Top Contacts**: List of most-contacted individuals
- **Average Screen Time**: Daily average screen time calculation
- **Recent Activity Feed**: Timeline of recent activities across all categories

### Data Management
- **Flexible Data Entry**: Easy-to-use forms for adding tracking data
- **Filtering Options**: Filter data by type, platform, contact, etc.
- **Data Visualization**: Charts and graphs for better insights
- **Historical Data**: Keep records of up to 30 days of data
- **Export Capability**: View and analyze trends

## 🛠️ Technology Stack

### Backend
- **Node.js & Express.js**: REST API server
- **Body Parser & CORS**: Middleware for handling requests
- **UUID**: Unique identifier generation
- **File System (JSON)**: Local data storage

### Frontend
- **HTML5**: Semantic markup
- **CSS3**: Responsive design with modern styling
- **JavaScript (Vanilla)**: Dynamic functionality and API integration
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## 📋 Project Structure

```
ChildPhoneTracker/
├── public/
│   ├── index.html        # Main dashboard HTML
│   ├── styles.css        # Complete styling
│   └── script.js         # Frontend logic and API integration
├── src/
│   └── database.js       # Database operations and data models
├── data/                 # JSON data storage
│   ├── callLogs.json
│   ├── messages.json
│   ├── socialMedia.json
│   ├── locations.json
│   ├── apps.json
│   └── screenTime.json
├── server.js             # Express server and API routes
├── package.json          # Project dependencies
└── README.md             # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v12 or higher)
- npm or yarn

### Installation

1. **Clone/Navigate to Project**
   ```bash
   cd ChildPhoneTracker
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start the Server**
   ```bash
   npm start
   # Or for development with auto-reload:
   npm run dev
   ```

4. **Access the Dashboard**
   Open your browser and go to:
   ```
   http://localhost:3000
   ```

## 📡 API Endpoints

### Call Logs
- `POST /api/call-logs` - Add a new call log
- `GET /api/call-logs?limit=50` - Get call logs

### Messages
- `POST /api/messages` - Add a new message
- `GET /api/messages?limit=100` - Get all messages
- `GET /api/messages/:contactNumber` - Get messages from a specific contact

### Social Media
- `POST /api/social-media` - Add social media activity
- `GET /api/social-media?limit=50` - Get all activities
- `GET /api/social-media/:platform` - Get activities from specific platform

### Location
- `POST /api/locations` - Add location data
- `GET /api/locations/latest` - Get latest location
- `GET /api/locations?limit=30` - Get location history

### App Usage
- `POST /api/app-usage` - Add app usage data
- `GET /api/app-usage?limit=50` - Get app usage history
- `GET /api/app-usage/top?limit=10` - Get top apps by usage time

### Screen Time
- `POST /api/screen-time` - Add screen time data
- `GET /api/screen-time?days=7` - Get screen time for last X days

### Analytics
- `GET /api/statistics` - Get comprehensive statistics
- `GET /api/dashboard` - Get full dashboard data
- `DELETE /api/old-data?days=30` - Delete data older than X days

## 💾 Data Models

### Call Log
```json
{
  "id": "uuid",
  "phoneNumber": "1234567890",
  "contactName": "John Doe",
  "duration": 300,
  "type": "incoming|outgoing|missed",
  "timestamp": "2025-12-03T10:30:00Z",
  "date": "12/3/2025"
}
```

### Message
```json
{
  "id": "uuid",
  "contactNumber": "1234567890",
  "contactName": "John Doe",
  "messageText": "Hello there!",
  "type": "sms|whatsapp|telegram|instagram|facebook",
  "direction": "incoming|outgoing",
  "timestamp": "2025-12-03T10:30:00Z",
  "date": "12/3/2025",
  "isRead": false
}
```

### Social Media Activity
```json
{
  "id": "uuid",
  "platform": "Instagram|TikTok|Facebook|...",
  "username": "@username",
  "activityType": "post|like|comment|story|follow|...",
  "details": "Additional details",
  "timestamp": "2025-12-03T10:30:00Z",
  "date": "12/3/2025"
}
```

### Location
```json
{
  "id": "uuid",
  "latitude": 40.7128,
  "longitude": -74.0060,
  "accuracy": 15,
  "locationName": "New York City",
  "timestamp": "2025-12-03T10:30:00Z",
  "date": "12/3/2025"
}
```

### App Usage
```json
{
  "id": "uuid",
  "appName": "Instagram",
  "packageName": "com.instagram.android",
  "timeSpent": 45,
  "timestamp": "2025-12-03T10:30:00Z",
  "date": "12/3/2025"
}
```

### Screen Time
```json
{
  "id": "uuid",
  "date": "12/3/2025",
  "totalMinutes": 480,
  "unlockedCount": 120
}
```

## 🎨 Dashboard Sections

### 1. Dashboard (Home)
- Overview statistics
- Current location
- Top apps
- Top contacts
- Average screen time
- Recent activity feed

### 2. Call Logs
- Complete call history
- Filter by type (incoming/outgoing/missed)
- Contact name and number
- Call duration
- Timestamp

### 3. Messages
- Message history
- Filter by message type
- Contact information
- Message preview
- Timestamp

### 4. Social Media
- Social media activity tracking
- Filter by platform
- Activity types (post, like, comment, story, etc.)
- Username and platform
- Activity details

### 5. Location
- Current location with details
- Location history
- GPS coordinates
- Accuracy information
- Location names

### 6. App Usage
- Top apps chart
- App usage history
- Time spent on each app
- Package names
- Usage statistics

### 7. Screen Time
- Daily screen time chart (last 7 days)
- Total minutes per day
- Unlock counts
- Average time per unlock
- Trends

## 🔒 Security Considerations

⚠️ **Important**: This application is designed for parental monitoring with proper consent. Ensure:
- All users know they are being monitored
- Comply with local laws and regulations
- Use strong passwords to protect the dashboard
- Run on a secure network
- Consider adding authentication (not included in basic version)

## ✅ Consent & Registration Flow

- **Consent Required**: This project does NOT and will NOT attempt to bypass device security or take permissions without explicit consent from the device owner. Creating links or tools that coerce or trick users into granting permissions is unethical and may be illegal.
- **How the provided registration works**: The server can create a registration token and link (`/register.html?token=...`) which the device owner can open on their device. The device owner must manually grant any OS-level permissions on their device.
- **Device registration is explicit**: When a device owner registers with the token, they supply a device identifier and a list of permissions they are granting. The server stores that registration and will only accept and show data associated with accounts/devices that were registered with consent.

## 📝 Usage Examples

### Adding Data via API

**Add a Call Log:**
```bash
curl -X POST http://localhost:3000/api/call-logs \
  -H "Content-Type: application/json" \
  -d '{
    "phoneNumber": "1234567890",
    "contactName": "Mom",
    "duration": 600,
    "type": "incoming"
  }'
```

**Add a Message:**
```bash
curl -X POST http://localhost:3000/api/messages \
  -H "Content-Type: application/json" \
  -d '{
    "contactNumber": "1234567890",
    "contactName": "Mom",
    "messageText": "Hey, how was your day?",
    "type": "sms"
  }'
```

**Add Location:**
```bash
curl -X POST http://localhost:3000/api/locations \
  -H "Content-Type: application/json" \
  -d '{
    "latitude": 40.7128,
    "longitude": -74.0060,
    "accuracy": 15,
    "locationName": "School"
  }'
```

## 🎯 Future Enhancements

- [ ] User authentication and authorization
- [ ] Real-time data sync with mobile app
- [ ] Advanced analytics and reports
- [ ] Alerts and notifications system
- [ ] Geofencing capabilities
- [ ] Web-based mobile app integration
- [ ] Cloud backup support
- [ ] Multi-device tracking
- [ ] Content filtering
- [ ] Screen time limits enforcement
- [ ] Database integration (MongoDB, PostgreSQL)
- [ ] Docker containerization

## 🐛 Troubleshooting

### Server won't start
- Check if port 3000 is already in use
- Verify Node.js is installed: `node --version`
- Check for syntax errors in JavaScript files

### Data not persisting
- Ensure the `data` folder has write permissions
- Check that `data/*.json` files exist and are readable

### Frontend not loading
- Clear browser cache (Ctrl+F5)
- Check browser console for errors
- Verify server is running on correct port

## 📄 License

This project is provided as-is for parental monitoring purposes.

## ⚠️ Disclaimer

This software is intended for parental supervision of devices with proper consent. Users are responsible for:
- Complying with all applicable laws and regulations
- Obtaining proper consent from all parties
- Protecting the privacy of monitored individuals
- Using the application ethically and responsibly

## 📞 Support

For issues and feature requests, refer to the documentation or review the code comments.

---

**Created:** December 2025
**Version:** 1.0.0
