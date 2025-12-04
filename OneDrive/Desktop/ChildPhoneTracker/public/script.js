// API Base URL
const API_BASE = 'http://localhost:3000/api';

// DOM Elements
const modal = document.getElementById('modal');
const closeBtn = document.querySelector('.close');
const form = document.getElementById('form');
const modalTitle = document.getElementById('modal-title');

// Navigation
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove active class from all links
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        // Add active class to clicked link
        link.classList.add('active');
        
        // Hide all sections
        document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
        
        // Show selected section
        const section = document.getElementById(link.dataset.section);
        if (section) {
            section.classList.add('active');
            
            // Load data for the section
            loadSectionData(link.dataset.section);
        }
    });
});

// Modal Functions
closeBtn.addEventListener('click', () => {
    modal.classList.remove('active');
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
    }
});

// Load section data
function loadSectionData(section) {
    switch(section) {
        case 'dashboard':
            loadDashboard();
            break;
        case 'calls':
            loadCallLogs();
            break;
        case 'messages':
            loadMessages();
            break;
        case 'social':
            loadSocialMedia();
            break;
        case 'location':
            loadLocation();
            break;
        case 'apps':
            loadApps();
            break;
        case 'screen-time':
            loadScreenTime();
            break;
    }
}

// ==================== DASHBOARD ====================
async function loadDashboard() {
    try {
        const response = await fetch(`${API_BASE}/dashboard`);
        const data = await response.json();

        // Update stats
        document.getElementById('total-calls').textContent = data.statistics.totalCalls;
        document.getElementById('total-messages').textContent = data.statistics.totalMessages;
        document.getElementById('total-social').textContent = data.statistics.totalSocialMediaActivities;
        document.getElementById('total-locations').textContent = data.statistics.totalLocations;

        // Current location
        if (data.currentLocation) {
            document.getElementById('location-info').innerHTML = `
                <ul class="list-group">
                    <li class="list-item">
                        <span class="list-item-title">📍 ${data.currentLocation.locationName}</span>
                        <span class="text-small">${data.currentLocation.date}</span>
                    </li>
                    <li class="list-item">
                        <span>Latitude</span>
                        <span class="text-small">${data.currentLocation.latitude.toFixed(4)}</span>
                    </li>
                    <li class="list-item">
                        <span>Longitude</span>
                        <span class="text-small">${data.currentLocation.longitude.toFixed(4)}</span>
                    </li>
                </ul>
            `;
        } else {
            document.getElementById('location-info').innerHTML = '<p class="placeholder">No location data yet</p>';
        }

        // Top apps
        if (data.topApps && data.topApps.length > 0) {
            let appsHtml = '';
            const maxTime = Math.max(...data.topApps.map(app => app.totalTime));
            data.topApps.forEach(app => {
                const percentage = (app.totalTime / maxTime) * 100;
                appsHtml += `
                    <div class="chart-bar">
                        <div class="chart-bar-label">${app.appName}</div>
                        <div class="chart-bar-container">
                            <div class="chart-bar-fill" style="width: ${percentage}%">
                                ${app.totalTime}m
                            </div>
                        </div>
                    </div>
                `;
            });
            document.getElementById('top-apps').innerHTML = appsHtml;
        }

        // Top contacts
        if (data.statistics.topContacts && data.statistics.topContacts.length > 0) {
            let contactsHtml = '';
            data.statistics.topContacts.forEach(contact => {
                contactsHtml += `
                    <div class="list-item">
                        <span class="list-item-title">${contact.contactName}</span>
                        <span class="badge badge-primary">${contact.messageCount} messages</span>
                    </div>
                `;
            });
            document.getElementById('top-contacts').innerHTML = contactsHtml;
        }

        // Average screen time
        document.getElementById('avg-screen-time').innerHTML = `
            <h3 style="text-align: center; font-size: 32px; margin-top: 10px;">
                ${data.statistics.averageDailyScreenTime} <span style="font-size: 16px; color: #64748b;">minutes</span>
            </h3>
        `;

        // Recent activity
        let activityHtml = '';
        if (data.recentCalls && data.recentCalls.length > 0) {
            activityHtml += '<h4>Recent Calls</h4>';
            data.recentCalls.slice(0, 3).forEach(call => {
                activityHtml += `
                    <div class="list-item">
                        <span>📞 <strong>${call.contactName}</strong> - ${call.type}</span>
                        <span class="text-small">${new Date(call.timestamp).toLocaleString()}</span>
                    </div>
                `;
            });
        }

        if (data.recentMessages && data.recentMessages.length > 0) {
            activityHtml += '<h4 style="margin-top: 15px;">Recent Messages</h4>';
            data.recentMessages.slice(0, 3).forEach(msg => {
                activityHtml += `
                    <div class="list-item">
                        <span>💬 <strong>${msg.contactName}</strong></span>
                        <span class="text-small">${new Date(msg.timestamp).toLocaleString()}</span>
                    </div>
                `;
            });
        }

        if (data.recentSocialMedia && data.recentSocialMedia.length > 0) {
            activityHtml += '<h4 style="margin-top: 15px;">Recent Social Activity</h4>';
            data.recentSocialMedia.slice(0, 3).forEach(activity => {
                activityHtml += `
                    <div class="list-item">
                        <span>📱 <strong>${activity.platform}</strong> - ${activity.activityType}</span>
                        <span class="text-small">${new Date(activity.timestamp).toLocaleString()}</span>
                    </div>
                `;
            });
        }

        if (!activityHtml) {
            activityHtml = '<p class="placeholder">No recent activities</p>';
        }
        document.getElementById('recent-activity').innerHTML = activityHtml;

    } catch (error) {
        console.error('Error loading dashboard:', error);
    }
}

// ==================== CALL LOGS ====================
async function loadCallLogs() {
    try {
        const response = await fetch(`${API_BASE}/call-logs?limit=100`);
        const data = await response.json();

        const tbody = document.getElementById('calls-table');
        const filterSelect = document.getElementById('call-filter');

        function renderTable() {
            const filtered = filterSelect.value 
                ? data.filter(log => log.type === filterSelect.value)
                : data;

            if (filtered.length === 0) {
                tbody.innerHTML = '<tr><td colspan="5" class="placeholder">No calls found</td></tr>';
                return;
            }

            tbody.innerHTML = filtered.map(log => `
                <tr>
                    <td><strong>${log.contactName}</strong></td>
                    <td>${log.phoneNumber}</td>
                    <td>${formatDuration(log.duration)}</td>
                    <td><span class="badge badge-primary">${log.type}</span></td>
                    <td>${new Date(log.timestamp).toLocaleString()}</td>
                </tr>
            `).join('');
        }

        filterSelect.addEventListener('change', renderTable);
        renderTable();

    } catch (error) {
        console.error('Error loading calls:', error);
    }
}

// ==================== MESSAGES ====================
async function loadMessages() {
    try {
        const response = await fetch(`${API_BASE}/messages?limit=100`);
        const data = await response.json();

        const tbody = document.getElementById('messages-table');
        const filterSelect = document.getElementById('message-type-filter');

        function renderTable() {
            const filtered = filterSelect.value
                ? data.filter(msg => msg.type === filterSelect.value)
                : data;

            if (filtered.length === 0) {
                tbody.innerHTML = '<tr><td colspan="4" class="placeholder">No messages found</td></tr>';
                return;
            }

            tbody.innerHTML = filtered.map(msg => `
                <tr>
                    <td><strong>${msg.contactName}</strong></td>
                    <td><span class="badge badge-primary">${msg.type}</span></td>
                    <td style="max-width: 300px; overflow: hidden; text-overflow: ellipsis;">${msg.messageText}</td>
                    <td>${new Date(msg.timestamp).toLocaleString()}</td>
                </tr>
            `).join('');
        }

        filterSelect.addEventListener('change', renderTable);
        renderTable();

    } catch (error) {
        console.error('Error loading messages:', error);
    }
}

// ==================== SOCIAL MEDIA ====================
async function loadSocialMedia() {
    try {
        const response = await fetch(`${API_BASE}/social-media?limit=100`);
        const data = await response.json();

        const tbody = document.getElementById('social-table');
        const filterSelect = document.getElementById('platform-filter');

        function renderTable() {
            const filtered = filterSelect.value
                ? data.filter(activity => activity.platform === filterSelect.value)
                : data;

            if (filtered.length === 0) {
                tbody.innerHTML = '<tr><td colspan="5" class="placeholder">No activities found</td></tr>';
                return;
            }

            tbody.innerHTML = filtered.map(activity => `
                <tr>
                    <td><strong>${activity.platform}</strong></td>
                    <td>${activity.username}</td>
                    <td><span class="badge badge-success">${activity.activityType}</span></td>
                    <td style="max-width: 250px; overflow: hidden; text-overflow: ellipsis;">${activity.details || '-'}</td>
                    <td>${new Date(activity.timestamp).toLocaleString()}</td>
                </tr>
            `).join('');
        }

        filterSelect.addEventListener('change', renderTable);
        renderTable();

    } catch (error) {
        console.error('Error loading social media:', error);
    }
}

// ==================== LOCATION ====================
async function loadLocation() {
    try {
        const latestResponse = await fetch(`${API_BASE}/locations/latest`);
        const latest = await latestResponse.json();

        if (latest) {
            document.getElementById('current-location-details').innerHTML = `
                <ul class="list-group">
                    <li class="list-item">
                        <span class="list-item-title">Location Name</span>
                        <span>${latest.locationName}</span>
                    </li>
                    <li class="list-item">
                        <span class="list-item-title">Latitude</span>
                        <span>${latest.latitude.toFixed(6)}</span>
                    </li>
                    <li class="list-item">
                        <span class="list-item-title">Longitude</span>
                        <span>${latest.longitude.toFixed(6)}</span>
                    </li>
                    <li class="list-item">
                        <span class="list-item-title">Accuracy</span>
                        <span>${latest.accuracy} meters</span>
                    </li>
                    <li class="list-item">
                        <span class="list-item-title">Last Updated</span>
                        <span>${new Date(latest.timestamp).toLocaleString()}</span>
                    </li>
                </ul>
            `;
        }

        const historyResponse = await fetch(`${API_BASE}/locations?limit=50`);
        const history = await historyResponse.json();

        const tbody = document.getElementById('location-table');
        if (history.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5" class="placeholder">No location data</td></tr>';
        } else {
            tbody.innerHTML = history.map(location => `
                <tr>
                    <td>${location.locationName}</td>
                    <td>${location.latitude.toFixed(6)}</td>
                    <td>${location.longitude.toFixed(6)}</td>
                    <td>${location.accuracy} m</td>
                    <td>${new Date(location.timestamp).toLocaleString()}</td>
                </tr>
            `).join('');
        }

    } catch (error) {
        console.error('Error loading location:', error);
    }
}

// ==================== APP USAGE ====================
async function loadApps() {
    try {
        const topResponse = await fetch(`${API_BASE}/app-usage/top?limit=10`);
        const topApps = await topResponse.json();

        const chartDiv = document.getElementById('top-apps-chart');
        if (topApps.length === 0) {
            chartDiv.innerHTML = '<p class="placeholder">No app usage data</p>';
        } else {
            let chartHtml = '';
            const maxTime = Math.max(...topApps.map(app => app.totalTime));
            topApps.forEach(app => {
                const percentage = (app.totalTime / maxTime) * 100;
                chartHtml += `
                    <div class="chart-bar">
                        <div class="chart-bar-label">${app.appName}</div>
                        <div class="chart-bar-container">
                            <div class="chart-bar-fill" style="width: ${percentage}%">
                                ${app.totalTime}m
                            </div>
                        </div>
                    </div>
                `;
            });
            chartDiv.innerHTML = chartHtml;
        }

        const allResponse = await fetch(`${API_BASE}/app-usage?limit=50`);
        const allApps = await allResponse.json();

        const tbody = document.getElementById('apps-table');
        if (allApps.length === 0) {
            tbody.innerHTML = '<tr><td colspan="4" class="placeholder">No app usage data</td></tr>';
        } else {
            tbody.innerHTML = allApps.map(app => `
                <tr>
                    <td><strong>${app.appName}</strong></td>
                    <td>${app.packageName}</td>
                    <td>${app.timeSpent} minutes</td>
                    <td>${new Date(app.timestamp).toLocaleString()}</td>
                </tr>
            `).join('');
        }

    } catch (error) {
        console.error('Error loading apps:', error);
    }
}

// ==================== SCREEN TIME ====================
async function loadScreenTime() {
    try {
        const response = await fetch(`${API_BASE}/screen-time?days=7`);
        const data = await response.json();

        const chartDiv = document.getElementById('screen-time-chart');
        if (data.length === 0) {
            chartDiv.innerHTML = '<p class="placeholder">No screen time data</p>';
        } else {
            let chartHtml = '';
            const maxTime = Math.max(...data.map(st => st.totalMinutes));
            data.forEach(st => {
                const percentage = (st.totalMinutes / maxTime) * 100;
                chartHtml += `
                    <div class="chart-bar">
                        <div class="chart-bar-label">${st.date}</div>
                        <div class="chart-bar-container">
                            <div class="chart-bar-fill" style="width: ${percentage}%">
                                ${st.totalMinutes}m
                            </div>
                        </div>
                    </div>
                `;
            });
            chartDiv.innerHTML = chartHtml;
        }

        const tbody = document.getElementById('screen-time-table');
        if (data.length === 0) {
            tbody.innerHTML = '<tr><td colspan="4" class="placeholder">No screen time data</td></tr>';
        } else {
            tbody.innerHTML = data.map(st => `
                <tr>
                    <td><strong>${st.date}</strong></td>
                    <td>${st.totalMinutes} minutes</td>
                    <td>${st.unlockedCount} times</td>
                    <td>${(st.totalMinutes / st.unlockedCount).toFixed(1)} min/unlock</td>
                </tr>
            `).join('');
        }

    } catch (error) {
        console.error('Error loading screen time:', error);
    }
}

// ==================== ADD DATA FUNCTIONS ====================
document.getElementById('add-call-btn').addEventListener('click', () => {
    openAddForm('call', 'Add Call Log');
});

document.getElementById('add-message-btn').addEventListener('click', () => {
    openAddForm('message', 'Add Message');
});

document.getElementById('add-social-btn').addEventListener('click', () => {
    openAddForm('social', 'Add Social Media Activity');
});

document.getElementById('add-location-btn').addEventListener('click', () => {
    openAddForm('location', 'Add Location');
});

document.getElementById('add-app-btn').addEventListener('click', () => {
    openAddForm('app', 'Add App Usage');
});

document.getElementById('add-screen-time-btn').addEventListener('click', () => {
    openAddForm('screen-time', 'Add Screen Time');
});

function openAddForm(type, title) {
    modalTitle.textContent = title;
    form.innerHTML = '';

    switch(type) {
        case 'call':
            form.innerHTML = `
                <div>
                    <label>Contact Name *</label>
                    <input type="text" id="contactName" required>
                </div>
                <div>
                    <label>Phone Number *</label>
                    <input type="tel" id="phoneNumber" required>
                </div>
                <div>
                    <label>Duration (seconds) *</label>
                    <input type="number" id="duration" required>
                </div>
                <div>
                    <label>Type *</label>
                    <select id="callType">
                        <option value="incoming">Incoming</option>
                        <option value="outgoing">Outgoing</option>
                        <option value="missed">Missed</option>
                    </select>
                </div>
                <button type="submit" class="btn btn-primary" style="width: 100%;">Add Call</button>
            `;
            form.onsubmit = async (e) => {
                e.preventDefault();
                const payload = {
                    contactName: document.getElementById('contactName').value,
                    phoneNumber: document.getElementById('phoneNumber').value,
                    duration: parseInt(document.getElementById('duration').value),
                    type: document.getElementById('callType').value
                };
                await submitData(`${API_BASE}/call-logs`, payload);
                loadCallLogs();
                modal.classList.remove('active');
            };
            break;

        case 'message':
            form.innerHTML = `
                <div>
                    <label>Contact Name *</label>
                    <input type="text" id="contactName" required>
                </div>
                <div>
                    <label>Phone/Contact Number *</label>
                    <input type="text" id="contactNumber" required>
                </div>
                <div>
                    <label>Message *</label>
                    <textarea id="messageText" required></textarea>
                </div>
                <div>
                    <label>Type *</label>
                    <select id="messageType">
                        <option value="sms">SMS</option>
                        <option value="whatsapp">WhatsApp</option>
                        <option value="telegram">Telegram</option>
                        <option value="instagram">Instagram DM</option>
                        <option value="facebook">Facebook Message</option>
                    </select>
                </div>
                <button type="submit" class="btn btn-primary" style="width: 100%;">Add Message</button>
            `;
            form.onsubmit = async (e) => {
                e.preventDefault();
                const payload = {
                    contactName: document.getElementById('contactName').value,
                    contactNumber: document.getElementById('contactNumber').value,
                    messageText: document.getElementById('messageText').value,
                    type: document.getElementById('messageType').value
                };
                await submitData(`${API_BASE}/messages`, payload);
                loadMessages();
                modal.classList.remove('active');
            };
            break;

        case 'social':
            form.innerHTML = `
                <div>
                    <label>Platform *</label>
                    <select id="platform">
                        <option value="Instagram">Instagram</option>
                        <option value="TikTok">TikTok</option>
                        <option value="Facebook">Facebook</option>
                        <option value="Snapchat">Snapchat</option>
                        <option value="Twitter">Twitter</option>
                        <option value="YouTube">YouTube</option>
                        <option value="Discord">Discord</option>
                    </select>
                </div>
                <div>
                    <label>Username *</label>
                    <input type="text" id="username" required>
                </div>
                <div>
                    <label>Activity Type *</label>
                    <input type="text" id="activityType" placeholder="e.g., post, like, comment, story" required>
                </div>
                <div>
                    <label>Details</label>
                    <textarea id="details" placeholder="Optional details about the activity"></textarea>
                </div>
                <button type="submit" class="btn btn-primary" style="width: 100%;">Add Activity</button>
            `;
            form.onsubmit = async (e) => {
                e.preventDefault();
                const payload = {
                    platform: document.getElementById('platform').value,
                    username: document.getElementById('username').value,
                    activityType: document.getElementById('activityType').value,
                    details: document.getElementById('details').value
                };
                await submitData(`${API_BASE}/social-media`, payload);
                loadSocialMedia();
                modal.classList.remove('active');
            };
            break;

        case 'location':
            form.innerHTML = `
                <div>
                    <label>Location Name</label>
                    <input type="text" id="locationName" placeholder="e.g., School, Home, Park">
                </div>
                <div>
                    <label>Latitude *</label>
                    <input type="number" id="latitude" step="0.000001" required>
                </div>
                <div>
                    <label>Longitude *</label>
                    <input type="number" id="longitude" step="0.000001" required>
                </div>
                <div>
                    <label>Accuracy (meters)</label>
                    <input type="number" id="accuracy" placeholder="0">
                </div>
                <button type="submit" class="btn btn-primary" style="width: 100%;">Add Location</button>
            `;
            form.onsubmit = async (e) => {
                e.preventDefault();
                const payload = {
                    latitude: parseFloat(document.getElementById('latitude').value),
                    longitude: parseFloat(document.getElementById('longitude').value),
                    accuracy: parseFloat(document.getElementById('accuracy').value) || 0,
                    locationName: document.getElementById('locationName').value || 'Unknown Location'
                };
                await submitData(`${API_BASE}/locations`, payload);
                loadLocation();
                modal.classList.remove('active');
            };
            break;

        case 'app':
            form.innerHTML = `
                <div>
                    <label>App Name *</label>
                    <input type="text" id="appName" required>
                </div>
                <div>
                    <label>Package Name *</label>
                    <input type="text" id="packageName" placeholder="e.g., com.instagram.android" required>
                </div>
                <div>
                    <label>Time Spent (minutes) *</label>
                    <input type="number" id="timeSpent" required>
                </div>
                <button type="submit" class="btn btn-primary" style="width: 100%;">Add App Usage</button>
            `;
            form.onsubmit = async (e) => {
                e.preventDefault();
                const payload = {
                    appName: document.getElementById('appName').value,
                    packageName: document.getElementById('packageName').value,
                    timeSpent: parseInt(document.getElementById('timeSpent').value)
                };
                await submitData(`${API_BASE}/app-usage`, payload);
                loadApps();
                modal.classList.remove('active');
            };
            break;

        case 'screen-time':
            form.innerHTML = `
                <div>
                    <label>Date *</label>
                    <input type="date" id="date" required>
                </div>
                <div>
                    <label>Total Minutes *</label>
                    <input type="number" id="totalMinutes" required>
                </div>
                <div>
                    <label>Unlock Count *</label>
                    <input type="number" id="unlockedCount" required>
                </div>
                <button type="submit" class="btn btn-primary" style="width: 100%;">Add Screen Time</button>
            `;
            form.onsubmit = async (e) => {
                e.preventDefault();
                const payload = {
                    date: document.getElementById('date').value,
                    totalMinutes: parseInt(document.getElementById('totalMinutes').value),
                    unlockedCount: parseInt(document.getElementById('unlockedCount').value)
                };
                await submitData(`${API_BASE}/screen-time`, payload);
                loadScreenTime();
                modal.classList.remove('active');
            };
            break;
    }

    modal.classList.add('active');
}

async function submitData(endpoint, payload) {
    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            alert('Data added successfully!');
        } else {
            alert('Error adding data');
        }
    } catch (error) {
        console.error('Error submitting data:', error);
        alert('Error: ' + error.message);
    }
}

// ==================== UTILITY FUNCTIONS ====================
function formatDuration(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
        return `${hours}h ${minutes}m`;
    } else if (minutes > 0) {
        return `${minutes}m ${secs}s`;
    } else {
        return `${secs}s`;
    }
}

// Load dashboard on page load
window.addEventListener('load', () => {
    loadDashboard();
});
