        // --- Topic Voting Logic ---
        const topics = JSON.parse(localStorage.getItem('fl-topics')) || {
            topic1: 0,
            topic2: 0
        };

        function renderTopics() {
            const total = (topics.topic1 + topics.topic2) || 1; // avoid division by zero
            
            // Update Topic 1
            const t1 = document.getElementById('count-topic1');
            const b1 = document.getElementById('bar-topic1');
            if(t1) t1.innerText = topics.topic1;
            if(b1) b1.style.width = `${(topics.topic1 / total) * 100}%`;
            
            // Update Topic 2
            const t2 = document.getElementById('count-topic2');
            const b2 = document.getElementById('bar-topic2');
            if(t2) t2.innerText = topics.topic2;
            if(b2) b2.style.width = `${(topics.topic2 / total) * 100}%`;
        }

        function voteTopic(topicId) {
            topics[topicId]++;
            localStorage.setItem('fl-topics', JSON.stringify(topics));
            renderTopics();
            alert('感謝投票！');
        }

        // Only call if elements exist
        if(document.getElementById('count-topic1')) {
            renderTopics();
        }