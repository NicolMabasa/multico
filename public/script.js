const multiplyBtn = document.getElementById('multiply-btn');
const contentInput = document.getElementById('content-input');
const resultsDiv = document.getElementById('results');

multiplyBtn.addEventListener('click', async () => {
    const content = contentInput.value.trim();
    
    const checkboxes = document.querySelectorAll('.platform-checkboxes input[type="checkbox"]:checked');
    const platforms = Array.from(checkboxes).map(checkbox => checkbox.value);

    if (!content) {
        alert('Please paste your content first');
        return;
    }

    if (platforms.length === 0) {
        alert('Please select at least one platform');
        return;
    }

    multiplyBtn.textContent = 'Multiplying your content...';
    multiplyBtn.disabled = true;
    resultsDiv.innerHTML = '';

    try {
        const response = await fetch('/multiply', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ content, platforms })
        });

        const data = await response.json();

        if (data.error) {
            alert(data.error);
            return;
        }

        displayResults(data.results);

    } catch (error) {
        alert('Something went wrong. Please try again.');
        console.error(error);
    } finally {
        multiplyBtn.textContent = 'Multiply My Content';
        multiplyBtn.disabled = false;
    }
});

function displayResults(results) {
    resultsDiv.innerHTML = '';

    const platformNames = {
        tiktok: 'TikTok Script',
        linkedin: 'LinkedIn Post',
        instagram: 'Instagram Caption',
        facebook: 'Facebook Post',
        twitter: 'Twitter Thread',
        newsletter: 'Newsletter',
        youtube: 'YouTube Shorts Script'
    };

    for (const platform in results) {
        const card = document.createElement('div');
        card.className = 'result-card';

        const title = document.createElement('h4');
        title.textContent = platformNames[platform];

        const text = document.createElement('p');
        text.textContent = results[platform];

        const copyBtn = document.createElement('button');
        copyBtn.className = 'copy-btn';
        copyBtn.textContent = 'Copy to clipboard';

        copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(results[platform]);
            copyBtn.textContent = 'Copied!';
            setTimeout(() => {
                copyBtn.textContent = 'Copy to clipboard';
            }, 2000);
        });

        card.appendChild(title);
        card.appendChild(text);
        card.appendChild(copyBtn);
        resultsDiv.appendChild(card);
    }
}