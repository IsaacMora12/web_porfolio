const sections = ['name', 'title', 'subtitle', 'technologies', 'logoPython', 'logoJavaScript', 'logoHTML', 'logoCSS', 'aboutTitle', 'aboutText', 'projectsTitle', 'projects1', 'projects2',  'experienceTitle1', 'experienceText1', 'experienceText2', "experienceText3", 'contactTitle', 'contactEmail', 'contactPhone', 'contactLinkedin', 'contactGithub'];
let currentIndex = 0;
let typingEnabled = true;
let glitchEnabled = true;

function typeWriter(element, text, i, fn) {
    if (i < text.length && typingEnabled) {
        element.innerHTML = text.substring(0, i+1) + '<span aria-hidden="true"></span>';
        setTimeout(function() {
            typeWriter(element, text, i + 1, fn)
        }, 50);
    } else {
        element.innerHTML = text;
        if (typeof fn == 'function') {
            setTimeout(fn, 700);
        }
    }
}

function startTyping() {
    if (currentIndex < sections.length) {
        const currentElement = document.getElementById(sections[currentIndex]);
        currentElement.classList.remove('hidden');
        
        if (currentElement.tagName === 'DIV' || currentElement.tagName === 'SECTION') {
            currentElement.style.visibility = 'visible';
            currentIndex++;
            startTyping();
        } else {
            const text = currentElement.innerText;
            currentElement.innerHTML = '';
            if (typingEnabled) {
                currentElement.classList.add('typing-effect');
                typeWriter(currentElement, text, 0, function() {
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
    if (glitchEnabled) {
        const glitchElements = document.querySelectorAll('.glitch');
        glitchElements.forEach(element => {
            element.classList.add('active-glitch');
            setTimeout(() => {
                element.classList.remove('active-glitch');
            }, 2000);
        });
    }
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
    const glitchElements = document.querySelectorAll('.glitch');
    glitchElements.forEach(element => {
        if (glitchEnabled) {
            element.classList.add('glitch');
        } else {
            element.classList.remove('glitch', 'active-glitch');
        }
    });
}

window.onload = function() {
    startTyping();
    setInterval(activateGlitch, 10000);
    
    document.getElementById('toggleTyping').addEventListener('click', toggleTyping);
    document.getElementById('toggleGlitch').addEventListener('click', toggleGlitch);
};