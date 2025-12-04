#!/bin/bash

# This script adds sample data to the Child Phone Tracker
# Run this to populate the database with example tracking data

BASE_URL="http://localhost:3000/api"

# Add sample call logs
echo "Adding sample call logs..."
curl -X POST $BASE_URL/call-logs \
  -H "Content-Type: application/json" \
  -d '{"phoneNumber":"5551234567","contactName":"Mom","duration":300,"type":"incoming"}'

curl -X POST $BASE_URL/call-logs \
  -H "Content-Type: application/json" \
  -d '{"phoneNumber":"5559876543","contactName":"Best Friend","duration":1800,"type":"outgoing"}'

curl -X POST $BASE_URL/call-logs \
  -H "Content-Type: application/json" \
  -d '{"phoneNumber":"5552468135","contactName":"School","duration":0,"type":"missed"}'

# Add sample messages
echo "Adding sample messages..."
curl -X POST $BASE_URL/messages \
  -H "Content-Type: application/json" \
  -d '{"contactNumber":"5551234567","contactName":"Mom","messageText":"Dont forget your homework","type":"sms"}'

curl -X POST $BASE_URL/messages \
  -H "Content-Type: application/json" \
  -d '{"contactNumber":"5559876543","contactName":"Best Friend","messageText":"Hey! Wanna play video games later?","type":"whatsapp"}'

curl -X POST $BASE_URL/messages \
  -H "Content-Type: application/json" \
  -d '{"contactNumber":"instagram_user","contactName":"Instagram Friend","messageText":"Check out my latest post!","type":"instagram"}'

# Add sample social media activities
echo "Adding sample social media activities..."
curl -X POST $BASE_URL/social-media \
  -H "Content-Type: application/json" \
  -d '{"platform":"Instagram","username":"@yourchild","activityType":"posted","details":"New photo uploaded"}'

curl -X POST $BASE_URL/social-media \
  -H "Content-Type: application/json" \
  -d '{"platform":"TikTok","username":"@yourchild","activityType":"liked","details":"Liked funny video"}'

curl -X POST $BASE_URL/social-media \
  -H "Content-Type: application/json" \
  -d '{"platform":"Snapchat","username":"yourchild","activityType":"sent_snap","details":"Snap sent to friends"}'

curl -X POST $BASE_URL/social-media \
  -H "Content-Type: application/json" \
  -d '{"platform":"YouTube","username":"yourchild","activityType":"watched","details":"Watched gaming videos"}'

# Add sample locations
echo "Adding sample locations..."
curl -X POST $BASE_URL/locations \
  -H "Content-Type: application/json" \
  -d '{"latitude":40.7128,"longitude":-74.0060,"accuracy":15,"locationName":"Home"}'

curl -X POST $BASE_URL/locations \
  -H "Content-Type: application/json" \
  -d '{"latitude":40.7580,"longitude":-73.9855,"accuracy":20,"locationName":"School"}'

curl -X POST $BASE_URL/locations \
  -H "Content-Type: application/json" \
  -d '{"latitude":40.7489,"longitude":-73.9680,"accuracy":18,"locationName":"Park"}'

# Add sample app usage
echo "Adding sample app usage..."
curl -X POST $BASE_URL/app-usage \
  -H "Content-Type: application/json" \
  -d '{"appName":"Instagram","packageName":"com.instagram.android","timeSpent":45}'

curl -X POST $BASE_URL/app-usage \
  -H "Content-Type: application/json" \
  -d '{"appName":"TikTok","packageName":"com.ss.android.ugc.tiktok","timeSpent":60}'

curl -X POST $BASE_URL/app-usage \
  -H "Content-Type: application/json" \
  -d '{"appName":"YouTube","packageName":"com.google.android.youtube","timeSpent":75}'

curl -X POST $BASE_URL/app-usage \
  -H "Content-Type: application/json" \
  -d '{"appName":"Game of Thrones Conquest","packageName":"com.disneygames.gotc.android","timeSpent":120}'

curl -X POST $BASE_URL/app-usage \
  -H "Content-Type: application/json" \
  -d '{"appName":"Snapchat","packageName":"com.snapchat.android","timeSpent":30}'

# Add sample screen time
echo "Adding sample screen time..."
curl -X POST $BASE_URL/screen-time \
  -H "Content-Type: application/json" \
  -d '{"date":"2025-11-27","totalMinutes":420,"unlockedCount":85}'

curl -X POST $BASE_URL/screen-time \
  -H "Content-Type: application/json" \
  -d '{"date":"2025-11-28","totalMinutes":380,"unlockedCount":72}'

curl -X POST $BASE_URL/screen-time \
  -H "Content-Type: application/json" \
  -d '{"date":"2025-11-29","totalMinutes":450,"unlockedCount":95}'

curl -X POST $BASE_URL/screen-time \
  -H "Content-Type: application/json" \
  -d '{"date":"2025-11-30","totalMinutes":320,"unlockedCount":65}'

curl -X POST $BASE_URL/screen-time \
  -H "Content-Type: application/json" \
  -d '{"date":"2025-12-01","totalMinutes":480,"unlockedCount":110}'

curl -X POST $BASE_URL/screen-time \
  -H "Content-Type: application/json" \
  -d '{"date":"2025-12-02","totalMinutes":360,"unlockedCount":75}'

curl -X POST $BASE_URL/screen-time \
  -H "Content-Type: application/json" \
  -d '{"date":"2025-12-03","totalMinutes":410,"unlockedCount":88}'

echo "Sample data added successfully!"
