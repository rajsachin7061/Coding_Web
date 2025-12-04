# PowerShell Script to Add Sample Data to Child Phone Tracker
# Run this script in PowerShell to populate the database with example tracking data

$BASE_URL = "http://localhost:3000/api"

function Add-Data {
    param(
        [string]$endpoint,
        [object]$data
    )
    
    try {
        $jsonData = $data | ConvertTo-Json
        $response = Invoke-WebRequest -Uri "$BASE_URL$endpoint" `
            -Method POST `
            -ContentType "application/json" `
            -Body $jsonData `
            -ErrorAction SilentlyContinue
        Write-Host "✓ Added to $endpoint" -ForegroundColor Green
    }
    catch {
        Write-Host "✗ Error adding to $endpoint" -ForegroundColor Red
    }
}

Write-Host "🚀 Adding Sample Data to Child Phone Tracker..." -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# Add sample call logs
Write-Host "📞 Adding sample call logs..." -ForegroundColor Yellow

Add-Data "/call-logs" @{
    phoneNumber = "5551234567"
    contactName = "Mom"
    duration = 300
    type = "incoming"
}

Add-Data "/call-logs" @{
    phoneNumber = "5559876543"
    contactName = "Best Friend"
    duration = 1800
    type = "outgoing"
}

Add-Data "/call-logs" @{
    phoneNumber = "5552468135"
    contactName = "School"
    duration = 0
    type = "missed"
}

# Add sample messages
Write-Host ""
Write-Host "💬 Adding sample messages..." -ForegroundColor Yellow

Add-Data "/messages" @{
    contactNumber = "5551234567"
    contactName = "Mom"
    messageText = "Don't forget your homework"
    type = "sms"
}

Add-Data "/messages" @{
    contactNumber = "5559876543"
    contactName = "Best Friend"
    messageText = "Hey! Wanna play video games later?"
    type = "whatsapp"
}

Add-Data "/messages" @{
    contactNumber = "instagram_user"
    contactName = "Instagram Friend"
    messageText = "Check out my latest post!"
    type = "instagram"
}

# Add sample social media activities
Write-Host ""
Write-Host "📱 Adding sample social media activities..." -ForegroundColor Yellow

Add-Data "/social-media" @{
    platform = "Instagram"
    username = "@yourchild"
    activityType = "posted"
    details = "New photo uploaded"
}

Add-Data "/social-media" @{
    platform = "TikTok"
    username = "@yourchild"
    activityType = "liked"
    details = "Liked funny video"
}

Add-Data "/social-media" @{
    platform = "Snapchat"
    username = "yourchild"
    activityType = "sent_snap"
    details = "Snap sent to friends"
}

Add-Data "/social-media" @{
    platform = "YouTube"
    username = "yourchild"
    activityType = "watched"
    details = "Watched gaming videos"
}

Add-Data "/social-media" @{
    platform = "Facebook"
    username = "yourchild"
    activityType = "commented"
    details = "Commented on a friend's post"
}

# Add sample locations
Write-Host ""
Write-Host "📍 Adding sample locations..." -ForegroundColor Yellow

Add-Data "/locations" @{
    latitude = 40.7128
    longitude = -74.0060
    accuracy = 15
    locationName = "Home"
}

Add-Data "/locations" @{
    latitude = 40.7580
    longitude = -73.9855
    accuracy = 20
    locationName = "School"
}

Add-Data "/locations" @{
    latitude = 40.7489
    longitude = -73.9680
    accuracy = 18
    locationName = "Park"
}

Add-Data "/locations" @{
    latitude = 40.7614
    longitude = -73.9776
    accuracy = 25
    locationName = "Shopping Center"
}

# Add sample app usage
Write-Host ""
Write-Host "📱 Adding sample app usage..." -ForegroundColor Yellow

Add-Data "/app-usage" @{
    appName = "Instagram"
    packageName = "com.instagram.android"
    timeSpent = 45
}

Add-Data "/app-usage" @{
    appName = "TikTok"
    packageName = "com.ss.android.ugc.tiktok"
    timeSpent = 60
}

Add-Data "/app-usage" @{
    appName = "YouTube"
    packageName = "com.google.android.youtube"
    timeSpent = 75
}

Add-Data "/app-usage" @{
    appName = "Game of Thrones Conquest"
    packageName = "com.disneygames.gotc.android"
    timeSpent = 120
}

Add-Data "/app-usage" @{
    appName = "Snapchat"
    packageName = "com.snapchat.android"
    timeSpent = 30
}

Add-Data "/app-usage" @{
    appName = "WhatsApp"
    packageName = "com.whatsapp"
    timeSpent = 25
}

# Add sample screen time
Write-Host ""
Write-Host "⏱️ Adding sample screen time..." -ForegroundColor Yellow

Add-Data "/screen-time" @{
    date = "2025-11-27"
    totalMinutes = 420
    unlockedCount = 85
}

Add-Data "/screen-time" @{
    date = "2025-11-28"
    totalMinutes = 380
    unlockedCount = 72
}

Add-Data "/screen-time" @{
    date = "2025-11-29"
    totalMinutes = 450
    unlockedCount = 95
}

Add-Data "/screen-time" @{
    date = "2025-11-30"
    totalMinutes = 320
    unlockedCount = 65
}

Add-Data "/screen-time" @{
    date = "2025-12-01"
    totalMinutes = 480
    unlockedCount = 110
}

Add-Data "/screen-time" @{
    date = "2025-12-02"
    totalMinutes = 360
    unlockedCount = 75
}

Add-Data "/screen-time" @{
    date = "2025-12-03"
    totalMinutes = 410
    unlockedCount = 88
}

Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "✅ Sample data added successfully!" -ForegroundColor Green
Write-Host "📊 Open http://localhost:3000 to view the dashboard" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
