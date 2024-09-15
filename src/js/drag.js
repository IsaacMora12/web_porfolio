const draggableWindow = document.getElementById('draggable');
const header = draggableWindow.querySelector('.window-header');
const maximizeBtn = document.getElementById('maximizeBtn');
const closeBtn = document.getElementById('closeBtn');
const content = draggableWindow.querySelector('.window-content');

let isDragging = false;
let isFullSize = false;

function dragElement(elmnt) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    header.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        if (!isDragging) {
            isDragging = true;
            if (isFullSize) {
                toggleSize();
            }
        }
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
        isDragging = false;
    }
}

function toggleSize() {
    if (isFullSize) {
        draggableWindow.style.width = '50%';
        draggableWindow.style.height = '50%';
        draggableWindow.style.top = '0%';
        draggableWindow.style.left = '0%';
    } else {
        draggableWindow.style.width = '100%';
        draggableWindow.style.height = '100%';
        draggableWindow.style.top = '0';
        draggableWindow.style.left = '0';
    }
    isFullSize = !isFullSize;
}

function closeWindow() {
    draggableWindow.style.display = 'none';
    showErrorWindow();
}

function showErrorWindow() {
    const errorWindow = document.getElementById('errorWindow');
    const progressBar = document.getElementById('progressBar');
    errorWindow.style.display = 'flex';
    
    // Mostrar mensaje de error
    setTimeout(() => {
        document.getElementById('errorMessage').textContent = 'Error en el sistema';
        // Iniciar barra de progreso
        setTimeout(() => {
            document.getElementById('restartMessage').style.display = 'block';
            let progress = 0;
            const interval = setInterval(() => {
                progress += 10;
                progressBar.style.width = `${progress}%`;
                if (progress >= 100) {
                    clearInterval(interval);
                    // Ocultar ventana de error y mostrar contenedor principal
                    setTimeout(() => {
                        errorWindow.style.display = 'none';
                        draggableWindow.style.display = 'block';
                    }, 500);
                }
            }, 200);
        }, 1000);
    }, 500);
}


closeBtn.addEventListener('click', closeWindow);
// Agregar evento al botón de minimizar

// Iniciar función de arrastre
dragElement(draggableWindow);

// Agregar evento al botón de maximizar
maximizeBtn.addEventListener('click', toggleSize);
closeBtn.addEventListener('click', closeWindow);
