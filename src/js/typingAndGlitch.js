
const sections = ['name', 'title', 'subtitle', 'technologies', 'logoContainer', 'logoPython', 'logoHTML', 'logoCSS', 'logoJavaScript', 'logoReact', 'aboutTitle', 'aboutText', 'experienceTitle1', 'experienceText1', 'experienceText2', "experienceText3", 'expreienceLi1','expreienceLi2','expreienceLi3','expreienceLi4','expreienceLi5'  ];
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
function showAllText() {
  sections.forEach(sectionId => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.style.visibility = 'visible';
      element.classList.remove('hidden');
      if (isNonTextElement(currentElement)) {
  
        showElementImmediately(currentElement);
        currentIndex++;
        startTyping();
      } else {
     
        handleTextTyping(currentElement);
      }
      
    }
  });
}


function startTyping() {
  
  if (currentIndex >= sections.length) return;
  const currentElement = document.getElementById(sections[currentIndex]);
  if (!currentElement) { 
    currentIndex++;
    return startTyping(); 
  }

  currentElement.classList.remove('hidden'); 

  if (isNonTextElement(currentElement)) {
  
    showElementImmediately(currentElement);
    currentIndex++;
    startTyping();
  } else {
 
    handleTextTyping(currentElement);
  }
}


function isNonTextElement(element) {
  return ['DIV', 'SECTION'].includes(element.tagName);
}


function showElementImmediately(element) {
  element.style.visibility = 'visible';
}


function handleTextTyping(element) {
  const text = element.innerText;
  element.innerHTML = ''; 

  if (typingEnabled) {
    typeWriter(element, text, 0, () => {
      currentIndex++;
      startTyping();
    });
  } else {
    element.innerHTML = text;
    currentIndex++;
    startTyping();
  }
}


function activateGlitch() {
  const glitchElements = document.querySelectorAll('.glitch');
  glitchElements.forEach(element => {
    element.classList.add('active-glitch');
  });
}


function resetAndRestartTyping() {
console.log("resetAndRestartTyping");
  sections.forEach(sectionId => {
    const element = document.getElementById(sectionId);
    if (element) {
      
      element.classList.add('hidden'); 
                  
       
  
    }
  });
  currentIndex = 0; 
  startTyping(); 
}

function toggleTyping() {
  typingEnabled = !typingEnabled;

  if (!typingEnabled) {
    showAllText(); 
   
  } else { 
    resetAndRestartTyping(); 
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
                element.classList.add('glitch');
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
    
    document.getElementById('toggleTyping').addEventListener('click', toggleTyping );
    document.getElementById('toggleGlitch').addEventListener('click', toggleGlitch);
  }; 

  export { resetAndRestartTyping };