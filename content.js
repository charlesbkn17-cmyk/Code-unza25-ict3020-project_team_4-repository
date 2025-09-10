(function() {
  function findMissingInfo() {
    const issues = [];

    // Find 'citation needed' tags
    document.querySelectorAll('.noprint.Inline-Template.Template-Fact').forEach(el => {
      const parent = el.closest('p') || el.parentElement;
      issues.push({
        type: 'Citation needed',
        text: parent ? parent.innerText.trim().slice(0, 100) + '...' : 'Context not found.'
      });
    });

    // Find empty sections
    document.querySelectorAll('#mw-content-text h2, #mw-content-text h3').forEach(header => {
      let next = header.nextElementSibling;
      // Skip edit links
      while (next && next.tagName === 'DIV' && next.classList.contains('mw-editsection')) {
        next = next.nextElementSibling;
      }
      if (
        next &&
        next.tagName === 'P' &&
        next.innerText.trim() === ''
      ) {
        issues.push({
          type: 'Empty section',
          section: header.innerText.replace('[edit]', '').trim()
        });
      }
    });

    // Find missing infobox
    if (!document.querySelector('.infobox')) {
      issues.push({
        type: 'Missing Infobox',
        section: 'Lead'
      });
    }

    // Short lead section (optional)
    const firstPara = document.querySelector('#mw-content-text > div.mw-parser-output > p');
    if (firstPara && firstPara.innerText.length < 100) {
      issues.push({
        type: 'Short lead section',
        section: 'Introduction'
      });
    }

    return issues;
  }

  // Make results available to popup
  window.wikipediaMissingInfo = findMissingInfo();
})();
