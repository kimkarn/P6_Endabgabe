const imgs = document.querySelectorAll('.draggable');
const audioFiles = {
    area1: { element: document.getElementById('audio1'), maxVolume: 1 },
    area2: { element: document.getElementById('audio2'), maxVolume: 1 },
    area3: { element: document.getElementById('audio3'), maxVolume: 1 },
    area4: { element: document.getElementById('audio4'), maxVolume: 1 },
    area5: { element: document.getElementById('audio5'), maxVolume: 1 },
    area6: { element: document.getElementById('audio6'), maxVolume: 1 },
    area7: { element: document.getElementById('audio7'), maxVolume: 1 },
    area8: { element: document.getElementById('audio8'), maxVolume: 1 },
    area9: { element: document.getElementById('audio9'), maxVolume: 1 },
    area10: { element: document.getElementById('audio10'), maxVolume: 1 },
    area11: { element: document.getElementById('audio11'), maxVolume: 1 },
    area12: { element: document.getElementById('audio12'), maxVolume: 1 },
    area13: { element: document.getElementById('audio13'), maxVolume: 1 },
    area14: { element: document.getElementById('audio14'), maxVolume: 1 }
};

let currentlyPlaying = {};

imgs.forEach(img => {
    img.addEventListener('dragstart', dragStart);
    img.addEventListener('dragend', dragEnd);
});

function dragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.id);
}

function dragEnd(event) {
    const img = event.target;
    const containerRect = document.getElementById('container').getBoundingClientRect();

    let newLeft = event.clientX - containerRect.left - img.offsetWidth / 2;
    let newTop = event.clientY - containerRect.top - img.offsetHeight / 2;

    img.style.left = `${newLeft}px`;
    img.style.top = `${newTop}px`;

    checkAudio();
}

function checkAudio() {
    const counts = {
        area1: 0,
        area2: 0,
        area3: 0,
        area4: 0,
        area5: 0,
        area6: 0,
        area7: 0,
        area8: 0,
        area9: 0,
        area10: 0,
        area11: 0,
        area12: 0,
        area13: 0,
        area14: 0
    };

    imgs.forEach(img => {
        const imgLeft = parseInt(img.style.left);
        const imgTop = parseInt(img.style.top);

        if (imgLeft >= 730 && imgLeft < 930 && imgTop >= 480 && imgTop < 700) {
            counts.area1++;
        } else if (imgLeft >= 200 && imgLeft < 400 && imgTop >= 270 && imgTop < 470) {
            counts.area2++;
        } else if (imgLeft >= 660 && imgLeft < 860 && imgTop >= 70 && imgTop < 270) {
            counts.area3++;
        } else if (imgLeft >= 30 && imgLeft < 230 && imgTop >= 10 && imgTop < 210) {
            counts.area4++;
        } else if (imgLeft >= 400 && imgLeft < 600 && imgTop >= 40 && imgTop < 240) {
            counts.area5++;
        } else if (imgLeft >= 920 && imgLeft < 1120 && imgTop >= 10 && imgTop < 210) {
            counts.area6++;
        } else if (imgLeft >= 350 && imgLeft < 550 && imgTop >= 480 && imgTop < 700) {
            counts.area7++;
        } else if (imgLeft >= 20 && imgLeft < 220 && imgTop >= 500 && imgTop < 700) {
            counts.area8++;
        } else if (imgLeft >= 500 && imgLeft < 700 && imgTop >= 300 && imgTop < 500) {
            counts.area9++;
        } else if (imgLeft >= 860 && imgLeft < 940 && imgTop >= 200 && imgTop < 280) {
            counts.area10++;
        } else if (imgLeft >= 1000 && imgLeft < 1100 && imgTop >= 200 && imgTop < 300) {
            counts.area11++;
        } else if (imgLeft >= 800 && imgLeft < 900 && imgTop >= 330 && imgTop < 440) {
            counts.area12++;
        } else if (imgLeft >= 980 && imgLeft < 1100 && imgTop >= 330 && imgTop < 420) {
            counts.area13++;
        } else if (imgLeft >= 950 && imgLeft < 1100 && imgTop >= 430 && imgTop < 530) {
            counts.area14++;
        }
    });

    updateAudio('area1', counts.area1);
    updateAudio('area2', counts.area2);
    updateAudio('area3', counts.area3);
    updateAudio('area4', counts.area4);
    updateAudio('area5', counts.area5);
    updateAudio('area6', counts.area6);
    updateAudio('area7', counts.area7);
    updateAudio('area8', counts.area8);
    updateAudio('area9', counts.area9);
    updateAudio('area10', counts.area10);
    updateAudio('area11', counts.area11);
    updateAudio('area12', counts.area12);
    updateAudio('area13', counts.area13);
    updateAudio('area14', counts.area14);
}

function updateAudio(position, count) {
    const audio = audioFiles[position].element;
    const maxVolume = audioFiles[position].maxVolume;
    const currentVolume = audio.volume;

    if (count > 0 && count <= 3) {
        if (!currentlyPlaying[position]) {
            audio.currentTime = 0;
            audio.play();
            currentlyPlaying[position] = true;
        }
        const newVolume = Math.min(maxVolume, count * 0.2);
        if (newVolume !== currentVolume) {
            audio.volume = newVolume;
        }
    } else if (count > 3) {
        if (!currentlyPlaying[position]) {
            audio.currentTime = 0;
            audio.play();
            currentlyPlaying[position] = true;
        }
    } else if (count === 0) {
        audio.pause();
        audio.currentTime = 0;
        currentlyPlaying[position] = false;
    }
}
