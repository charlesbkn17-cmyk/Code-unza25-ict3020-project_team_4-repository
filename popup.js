document.addEventListener('DOMContentLoaded', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    chrome.scripting.executeScript(
      {
        target: { tabId: tabs[0].id },
        func: () => window.wikipediaMissingInfo
      },
      (results) => {
        const issues = results && results[0] && results[0].result ? results[0].result : [];
        const issuesDiv = document.getElementById('issues');
        if (issues.length === 0) {
          issuesDiv.innerHTML = "<p>No issues found! 🎉</p>";
        } else {
          issues.forEach(issue => {
            issuesDiv.innerHTML += `
              <div class="issue">
                <span class="type">${issue.type}</span>
                <div class="section">${issue.section ? issue.section : ''}</div>
                <div class="text">${issue.text ? issue.text : ''}</div>
              </div>
            `;
          });
        }
      }
    );
  });
});