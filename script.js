// Initial Sample Data
const sampleStories = [
    {
        id: '1',
        title: '打破枷鎖',
        content: '我意識到唯一阻礙我的是我自己的恐懼。我辭掉了工作，買了一張單程票，再也沒有回頭。世界比我們的擔憂大得多。',
        authorName: 'Sarah J.',
        timestamp: Date.now() - 100000000,
        votes: 124,
        image: 'https://coreva-normal.trae.ai/api/ide/v1/text_to_image?prompt=bird%20flying%20high%20in%20the%20blue%20sky%2C%20freedom&image_size=landscape_4_3'
    },
    {
        id: '2',
        title: '山頂',
        content: '攀登那座山不僅僅是身體上的挑戰。這是為了向自己證明我可以克服任何障礙。山頂的景色就是自由。',
        authorName: 'Mike T.',
        timestamp: Date.now() - 200000000,
        votes: 89,
        image: 'https://coreva-normal.trae.ai/api/ide/v1/text_to_image?prompt=hiker%20on%20mountain%20top%20looking%20at%20sunset%2C%20freedom&image_size=landscape_4_3'
    },
    {
        id: '3',
        title: '尋找平靜',
        content: '真正的自由來自內心。通過冥想和正念，我學會了放下混亂，在自己的腦海中找到平靜的避難所。',
        authorName: 'Emma W.',
        timestamp: Date.now() - 300000000,
        votes: 256,
        image: 'https://coreva-normal.trae.ai/api/ide/v1/text_to_image?prompt=open%20field%20with%20wildflowers%20and%20sunshine%2C%20peaceful&image_size=landscape_4_3'
    },
    {
        id: '4',
        title: '海風',
        content: '站在海邊，聽著海浪拍打的聲音，我感到無限。大海的浩瀚提醒我，我的可能性是無限的。',
        authorName: 'David L.',
        timestamp: Date.now() - 400000000,
        votes: 45,
        image: 'https://coreva-normal.trae.ai/api/ide/v1/text_to_image?prompt=ocean%20waves%20crashing%20on%20beach%20sunny%20day&image_size=landscape_4_3'
    },
    {
        id: '5',
        title: '無目的地的公路旅行',
        content: '沒有地圖，沒有目的地，只有開闊的道路和我最喜歡的播放列表。有時候迷路是找到自己最好的方式。',
        authorName: 'Alex R.',
        timestamp: Date.now() - 500000000,
        votes: 112,
        image: 'https://coreva-normal.trae.ai/api/ide/v1/text_to_image?prompt=open%20road%20highway%20through%20nature%20freedom&image_size=landscape_4_3'
    },
    {
        id: '6',
        title: '放下的藝術',
        content: '我花了很多年時間懷恨在心。放下它們就像放下了一個我不知道自己背著的沉重背包。我很輕盈。我很自由。',
        authorName: 'Olivia P.',
        timestamp: Date.now() - 600000000,
        votes: 78,
        image: 'https://coreva-normal.trae.ai/api/ide/v1/text_to_image?prompt=abstract%20art%20colorful%20freedom%20expression&image_size=landscape_4_3'
    }
];

// Initialize LocalStorage
function initStorage() {
    if (!localStorage.getItem('fl_stories')) {
        localStorage.setItem('fl_stories', JSON.stringify(sampleStories));
    }
    if (!localStorage.getItem('fl_user_votes')) {
        localStorage.setItem('fl_user_votes', JSON.stringify({}));
    }
}

// Get Stories
function getStories() {
    const stories = JSON.parse(localStorage.getItem('fl_stories'));
    return stories.sort((a, b) => b.timestamp - a.timestamp); // Sort by newest
}

// Save Story
function saveStory(story) {
    const stories = getStories();
    stories.unshift(story);
    localStorage.setItem('fl_stories', JSON.stringify(stories));
}

// Render Stories Grid
function renderStories() {
    const grid = document.getElementById('stories-grid');
    if (!grid) return;

    const stories = getStories();
    grid.innerHTML = '';

    stories.forEach(story => {
        const col = document.createElement('div');
        col.className = 'col-md-4 fade-in';
        
        // Generate a random image if none exists (for new submissions)
        const imageSrc = story.image || `https://source.unsplash.com/random/800x600/?freedom,nature,sky&sig=${story.id}`;

        col.innerHTML = `
            <div class="card h-100 story-card">
                <img src="${imageSrc}" class="card-img-top" alt="${story.title}" style="height: 200px; object-fit: cover;">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${story.title}</h5>
                    <p class="card-text text-muted flex-grow-1">${story.content.substring(0, 100)}...</p>
                    <div class="d-flex justify-content-between align-items-center mt-3 border-top pt-3">
                        <small class="text-muted">作者：${story.authorName || '匿名'}</small>
                        <div class="d-flex align-items-center">
                            <button class="vote-btn me-2" onclick="handleVote('${story.id}', this)">
                                <i class="fas fa-dove"></i>
                            </button>
                            <span class="vote-count fw-bold text-primary" id="vote-${story.id}">${story.votes}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
        grid.appendChild(col);
    });
}

// Handle Vote
function handleVote(storyId, btnElement) {
    // Check if already voted (simple check for demo)
    const userVotes = JSON.parse(localStorage.getItem('fl_user_votes')) || {};
    
    // Animation
    const bird = document.createElement('i');
    bird.className = 'fas fa-dove flying-bird';
    bird.style.left = btnElement.getBoundingClientRect().left + 'px';
    bird.style.top = btnElement.getBoundingClientRect().top + 'px';
    document.body.appendChild(bird);
    
    setTimeout(() => bird.remove(), 1000);

    // Logic
    if (userVotes[storyId]) {
        // Already voted, maybe remove vote? For now, just animate.
        return; 
    }

    const stories = getStories();
    const storyIndex = stories.findIndex(s => s.id === storyId);
    
    if (storyIndex !== -1) {
        stories[storyIndex].votes += 1;
        localStorage.setItem('fl_stories', JSON.stringify(stories));
        
        userVotes[storyId] = true;
        localStorage.setItem('fl_user_votes', JSON.stringify(userVotes));
        
        // Update UI
        document.getElementById(`vote-${storyId}`).textContent = stories[storyIndex].votes;
        btnElement.classList.add('active');
    }
}

// Handle Submission
function setupSubmission() {
    const form = document.getElementById('submit-story-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const title = document.getElementById('storyTitle').value;
        const content = document.getElementById('storyContent').value;
        const authorName = document.getElementById('authorName').value;
        
        const newStory = {
            id: Date.now().toString(),
            title,
            content,
            authorName,
            timestamp: Date.now(),
            votes: 0,
            image: 'https://coreva-normal.trae.ai/api/ide/v1/text_to_image?prompt=freedom%20concept%20abstract%20sky&image_size=landscape_4_3' // Default image for new stories
        };

        saveStory(newStory);
        
        // Show success and redirect
        alert('故事提交成功！願你的故事能激發自由。');
        window.location.href = 'stories.html';
    });
}

// Main Execution
document.addEventListener('DOMContentLoaded', () => {
    initStorage();
    renderStories();
    setupSubmission();
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            nav.classList.add('shadow-sm');
        } else {
            nav.classList.remove('shadow-sm');
        }
    });
});

// Expose handleVote to window so onclick works
window.handleVote = handleVote;
