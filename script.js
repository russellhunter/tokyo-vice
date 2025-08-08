// Dashboard v3.5 Features:
// - Enhanced Places to Visit with drag & drop (5 pre-loaded destinations)
// - Image upload/AI generation placeholders
// - One-sentence overviews for each place
// - Real website links (not imagined)
// - Tag system with common categories
// - Editable titles, overviews, and notes
// - 24-hour time format throughout
// - Week 2 check-in/out times updated (15:00 check-in, 11:00 checkout)
// - Changelog viewer with version history

// Smooth scroll to section
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Live Countdown Timer
function updateCountdown() {
    const departureDate = new Date('2025-09-23T13:10:00');
    const now = new Date();
    const difference = departureDate - now;

    if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        document.getElementById('countdown').innerHTML =
            `${days}d ${hours}h ${minutes}m ${seconds}s`;
    } else {
        document.getElementById('countdown').innerHTML = "Journey begun! 🎌";
    }
}

// Live Time Zones
function updateTimeZones() {
    const now = new Date();

    // London time
    const londonTime = now.toLocaleTimeString('en-GB', {
        timeZone: 'Europe/London',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });
    document.getElementById('londonTime').textContent = londonTime;

    // Tokyo time
    const tokyoTime = now.toLocaleTimeString('en-GB', {
        timeZone: 'Asia/Tokyo',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });
    document.getElementById('tokyoTime').textContent = tokyoTime;

    // Calculate time difference (accounting for DST)
    const londonOffset = new Date().toLocaleString('en-US', {timeZone: 'Europe/London', timeZoneName: 'short'});
    const tokyoOffset = new Date().toLocaleString('en-US', {timeZone: 'Asia/Tokyo', timeZoneName: 'short'});
    const isBST = londonOffset.includes('BST');
    const timeDiff = isBST ? 8 : 9;
    document.getElementById('timeDiff').textContent = timeDiff;
}

// Currency Converter
const exchangeRates = {
    JPY: { GBP: 0.0058, USD: 0.0065 },
    GBP: { JPY: 172.41, USD: 1.12 },
    USD: { JPY: 153.85, GBP: 0.89 }
};

function updateConversion() {
    const amount = parseFloat(document.getElementById('amountInput').value) || 0;
    const currency = document.getElementById('currencySelect').value;
    const resultDiv = document.getElementById('conversionResult');

    if (currency === 'JPY') {
        const gbp = (amount * exchangeRates.JPY.GBP).toFixed(2);
        const usd = (amount * exchangeRates.JPY.USD).toFixed(2);
        resultDiv.innerHTML = `¥${amount.toLocaleString()} = £${gbp} / $${usd}`;
    } else if (currency === 'GBP') {
        const jpy = Math.round(amount * exchangeRates.GBP.JPY);
        const usd = (amount * exchangeRates.GBP.USD).toFixed(2);
        resultDiv.innerHTML = `£${amount} = ¥${jpy.toLocaleString()} / $${usd}`;
    } else if (currency === 'USD') {
        const jpy = Math.round(amount * exchangeRates.USD.JPY);
        const gbp = (amount * exchangeRates.USD.GBP).toFixed(2);
        resultDiv.innerHTML = `$${amount} = ¥${jpy.toLocaleString()} / £${gbp}`;
    }
}

// Currency display update
function updateRates() {
    // Simulated rate fluctuation (in reality, fetch from API)
    const baseGBP = 172;
    const baseUSD = 154;
    const gbpRate = Math.round(baseGBP + (Math.random() - 0.5) * 2);
    const usdRate = Math.round(baseUSD + (Math.random() - 0.5) * 2);

    document.getElementById('gbpRate').textContent = `¥${gbpRate}`;
    document.getElementById('usdRate').textContent = `¥${usdRate}`;

    // Update exchange rates object for converter
    exchangeRates.JPY.GBP = 1 / gbpRate;
    exchangeRates.JPY.USD = 1 / usdRate;
    exchangeRates.GBP.JPY = gbpRate;
    exchangeRates.USD.JPY = usdRate;

    updateConversion();
}

// Copy to clipboard
function copyToClipboard(elementId) {
    const text = document.getElementById(elementId).innerText;
    navigator.clipboard.writeText(text).then(function() {
        // Visual feedback
        event.target.textContent = 'Copied! ✓';
        setTimeout(() => {
            event.target.textContent = 'Copy Address';
        }, 2000);
    });
}

// Task Progress
function updateProgress() {
    const checkboxes = document.querySelectorAll('.task-list input[type="checkbox"]');
    const checkedBoxes = document.querySelectorAll('.task-list input[type="checkbox"]:checked');
    const progress = Math.round((checkedBoxes.length / checkboxes.length) * 100);

    const progressBar = document.getElementById('taskProgress');
    progressBar.style.width = progress + '%';
    progressBar.textContent = progress + '%';
}

// Drag and Drop for Places
let draggedElement = null;

function handleDragStart(e) {
    draggedElement = this;
    this.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDragEnd(e) {
    this.classList.remove('dragging');
    document.querySelectorAll('.place-card').forEach(card => {
        card.classList.remove('drag-over');
    });
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }
    e.dataTransfer.dropEffect = 'move';
    return false;
}

function handleDragEnter(e) {
    this.classList.add('drag-over');
}

function handleDragLeave(e) {
    this.classList.remove('drag-over');
}

function handleDrop(e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    }

    if (draggedElement !== this) {
        const placesList = document.getElementById('placesList');
        const allCards = [...placesList.querySelectorAll('.place-card')];
        const draggedIndex = allCards.indexOf(draggedElement);
        const targetIndex = allCards.indexOf(this);

        if (draggedIndex < targetIndex) {
            this.parentNode.insertBefore(draggedElement, this.nextSibling);
        } else {
            this.parentNode.insertBefore(draggedElement, this);
        }

        updatePlaceNumbers();
    }

    return false;
}

function updatePlaceNumbers() {
    document.querySelectorAll('.place-card').forEach((card, index) => {
        const marker = card.querySelector('.place-marker span');
        marker.textContent = index + 1;
        card.setAttribute('data-place-id', index + 1);
    });
    // Update place count
    const placeCount = document.getElementById('placeCount');
    if (placeCount) {
        placeCount.textContent = document.querySelectorAll('.place-card').length;
    }
}

function deletePlace(element) {
    const card = element.closest('.place-card');
    card.style.transform = 'translateX(-100%)';
    card.style.opacity = '0';
    setTimeout(() => {
        card.remove();
        updatePlaceNumbers();
    }, 300);
}

function addNewPlace() {
    const placesList = document.getElementById('placesList');
    const newId = placesList.children.length + 1;

    const newPlace = document.createElement('div');
    newPlace.className = 'place-card';
    newPlace.draggable = true;
    newPlace.setAttribute('data-place-id', newId);
    newPlace.innerHTML = `
        <div class="place-marker">
            <span>${newId}</span>
        </div>
        <div class="place-content">
            <div class="place-title" contenteditable="true">New Place</div>
            <div class="place-overview" contenteditable="true">Add a brief description of this place...</div>
            <div class="place-tags">
                <span class="add-tag-btn" onclick="addTag(this)">+ Add tag</span>
            </div>
            <a href="#" onclick="editWebsite(this); return false;" class="place-website">
                <span>🔗</span> Add website
            </a>
            <div class="place-notes" contenteditable="true">Add notes, tips, or reminders here...</div>
            <div class="place-actions">
                <div class="place-action">
                    <span>🕐</span> Add time
                </div>
                <div class="place-action">
                    <span>📎</span> Attach
                </div>
                <div class="place-action">
                    <span>💴</span> Add cost
                </div>
            </div>
        </div>
        <div class="place-image-container">
            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='120' viewBox='0 0 180 120'%3E%3Crect fill='%23554466' width='180' height='120'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23999' font-family='sans-serif' font-size='14'%3EAdd Image%3C/text%3E%3C/svg%3E" alt="Place" class="place-image">
            <div class="image-overlay">
                <button class="image-btn" onclick="uploadImage(this)">📷 Upload</button>
                <button class="image-btn" onclick="generateAI(this)">✨ Generate AI</button>
            </div>
        </div>
        <span class="added-by-label">Added by you</span>
        <div class="delete-place" onclick="deletePlace(this)">✕</div>
    `;

    placesList.appendChild(newPlace);

    // Add event listeners to new card
    newPlace.addEventListener('dragstart', handleDragStart);
    newPlace.addEventListener('dragend', handleDragEnd);
    newPlace.addEventListener('dragover', handleDragOver);
    newPlace.addEventListener('drop', handleDrop);
    newPlace.addEventListener('dragenter', handleDragEnter);
    newPlace.addEventListener('dragleave', handleDragLeave);

    // Focus on the title for immediate editing
    const titleElement = newPlace.querySelector('.place-title');
    titleElement.focus();

    // Select all text for easy replacement
    const range = document.createRange();
    range.selectNodeContents(titleElement);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);

    // Update place count
    const placeCount = document.getElementById('placeCount');
    if (placeCount) {
        placeCount.textContent = document.querySelectorAll('.place-card').length;
    }
}

function addTag(element) {
    const commonTags = [
        "Temple", "Shrine", "Landmark", "Shopping", "Food", "Market",
        "Museum", "Art", "Photography", "Nightlife", "Historical",
        "Garden", "Park", "View", "Experience", "Culture", "Entertainment",
        "Morning", "Evening", "Instagram", "Kids", "Pokemon", "Anime",
        "Electronics", "Fashion", "Traditional", "Modern", "Free", "Must-see"
    ];

    const tagOptions = commonTags.join('\n');
    const tagName = prompt(`Enter tag name (or choose from common tags):\n\nCommon tags:\n${commonTags.slice(0, 10).join(', ')}...`);

    if (tagName) {
        const newTag = document.createElement('span');
        newTag.className = 'place-tag';
        newTag.textContent = tagName;
        newTag.onclick = function() { toggleTag(this); };
        element.parentNode.insertBefore(newTag, element);
    }
}

function toggleTag(element) {
    element.classList.toggle('selected');
}

function editWebsite(element) {
    const url = prompt("Enter website URL:");
    if (url) {
        element.href = url;
        element.innerHTML = `<span>🔗</span> ${new URL(url).hostname}`;
    }
}

function uploadImage(element) {
    alert("Image upload feature would open file selector here");
    // In a real implementation, this would open a file input
}

function generateAI(element) {
    alert("AI image generation would be triggered here");
    // In a real implementation, this would call an AI image generation API
}

// Initial setup on DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    // Timed updates
    updateCountdown();
    updateTimeZones();
    setInterval(() => {
        updateCountdown();
        updateTimeZones();
    }, 1000);

    // Currency converter
    document.getElementById('amountInput').addEventListener('input', updateConversion);
    document.getElementById('currencySelect').addEventListener('change', updateConversion);
    updateRates();

    // Task list
    document.querySelectorAll('.task-list input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const taskItem = this.parentElement;
            if (this.checked) {
                taskItem.classList.add('completed');
            } else {
                taskItem.classList.remove('completed');
            }
            updateProgress();
            localStorage.setItem(this.id, this.checked);
        });

        const savedState = localStorage.getItem(checkbox.id);
        if (savedState === 'true') {
            checkbox.checked = true;
            checkbox.parentElement.classList.add('completed');
        }
    });
    updateProgress();

    // Drag and drop for places
    document.querySelectorAll('.place-card').forEach(card => {
        card.addEventListener('dragstart', handleDragStart);
        card.addEventListener('dragend', handleDragEnd);
        card.addEventListener('dragover', handleDragOver);
        card.addEventListener('drop', handleDrop);
        card.addEventListener('dragenter', handleDragEnter);
        card.addEventListener('dragleave', handleDragLeave);
    });

    // Tag click handlers
    document.querySelectorAll('.place-tag').forEach(tag => {
        if (!tag.classList.contains('add-tag-btn')) {
            tag.onclick = function() { toggleTag(this); };
        }
    });
});
