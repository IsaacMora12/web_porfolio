const sections = ['name', 'title', 'subtitle', 'technologies', 'logoContainer', 'logoPython', 'logoHTML', 'logoCSS', 'logoJavaScript', 'logoReact', 'aboutTitle', 'aboutText', 'projectsTitle', 'projects1', 'projects2',  'experienceTitle1', 'experienceText1', 'experienceText2', "experienceText3", 'expreienceLi1','expreienceLi2','expreienceLi3','expreienceLi4','expreienceLi5','expreienceLi6', 'contactTitle', 'contactEmail', 'contactPhone', 'contactLinkedin', 'contactGithub',  ];
let currentIndex = 0;
let typingEnabled = true;
let glitchEnabled = true;

function typeWriter(element, text, i, fn) {
    if (i < text.length && typingEnabled) {
      element.innerHTML = text.substring(0, i + 1) + '<span aria-hidden="true"></span>';
      setTimeout(() => {
        typeWriter(element, text, i + 1, fn);
      }, 50);
    } else {
      element.innerHTML = text;
      if (typeof fn === 'function') {
        setTimeout(fn, 700);
      }
    }
  }
function startTyping() {
    if (currentIndex < sections.length) {
      const currentElement = document.getElementById(sections[currentIndex]);
      currentElement.classList.remove('hidden');
  
      // Skip typing for non-text elements like DIVs or SVGs
      if (['DIV', 'SECTION'].includes(currentElement.tagName)) {
        currentElement.style.visibility = 'visible';
        currentIndex++;
        startTyping();
      } else {
        const text = currentElement.innerText;
        currentElement.innerHTML = '';
        if (typingEnabled) {
          typeWriter(currentElement, text, 0, () => {
            currentElement.classList.remove('typing-effect');
            currentIndex++;
            startTyping();
          });
        } else {
          currentElement.innerHTML = text;
          currentIndex++;
          startTyping();
        }
      }
    }
  }

function activateGlitch() {
    
        const glitchElements = document.querySelectorAll('.glitch');
        glitchElements.forEach(element => {
            element.classList.add('active-glitch');
        });
    
}

function toggleTyping() {
    typingEnabled = !typingEnabled;
    if (!typingEnabled) {
        sections.forEach(sectionId => {
            const element = document.getElementById(sectionId);
            if (element) {
                element.classList.remove('hidden');
                element.classList.remove('typing-effect');
                 element.style.visibility = 'visible';
                element.innerHTML = element.innerText;
            }
        });
    } else {
        currentIndex = 0;
        sections.forEach(sectionId => {
            const element = document.getElementById(sectionId);
            if (element) {
                element.classList.add('hidden');
            }
        });
        startTyping();
    }
}

function toggleGlitch() {
    glitchEnabled = !glitchEnabled;
    const glitchElements = document.querySelectorAll('.glitch, .glitchend');
    glitchElements.forEach(element => {
        if (glitchEnabled) {
            element.classList.remove('glitchend');
            element.classList.add('glitch');
            if (!typingEnabled || !element.classList.contains('hidden')) {
                element.classList.add('active-glitch');
            }
        } else {
            element.classList.remove('glitch' );
            element.classList.add('glitchend');
        }
    });
}

window.onload = function() {
    startTyping();
    setInterval(activateGlitch, 10000);
    
    document.getElementById('toggleTyping').addEventListener('click', function() {
        typingEnabled = !typingEnabled;
    
        if (typingEnabled) {
            // Reiniciar el proceso de escritura cuando typingEnabled sea true
            currentIndex = 0; // Reiniciar el índice
            startTyping();
        }
    });
    document.getElementById('toggleGlitch').addEventListener('click', toggleGlitch);
};