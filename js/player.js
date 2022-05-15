document.addEventListener("DOMContentLoaded", function(event) {
    let initial = false;
    const container = document.querySelector('.player_layer');
    const player = document.getElementById("player");
    player.addEventListener("canplay", () => {
        if(!initial) {
            initControls(container);
            initial = true;
        }        
    });
    player.addEventListener("ended", () => {
        togglePlay(player);
        player.currentTime = 0;
    });
});


function initControls(container) {
    const playButton = container.closest('.video_container').querySelector('.play_button');
    const timeline = player.closest('.video_container').querySelector('.timeline');
    const muteButton = container.closest('.video_container').querySelector('.mute');
    const volume = container.closest('.video_container').querySelector('.volume');
    const volumeLevel = volume.querySelector('.level');
    container.addEventListener("click", () => {
        togglePlay(player);
    });

    playButton.addEventListener("click", () => {
        togglePlay(player);
    });
    
    document.addEventListener("keydown", (e) => {
        if((e.code === "Space" && e.target === document.body && visible(player)) ||
            (!visible(player) && player.classList.contains("play"))) {   
            togglePlay(player);
            e.preventDefault();
        }
    });
    
    timeline.addEventListener("click", event => {
        const percent = event.offsetX / event.currentTarget.offsetWidth * 100;
        const seconds = (player.duration / 100) * percent;
        player.currentTime = parseFloat(seconds);
        const progress = player.currentTime / (player.duration / 100);
        player.closest('.video_container').querySelector('.progress').style.width = `${progress}%`;
    });  

    muteButton.addEventListener("click", () => {
        muteButton.classList.toggle("active");
        player.muted = muteButton.classList.contains("active");        
    });

    volumeLevel.style.width = `${player.volume * 100}%`;

    volume.addEventListener("click", event => {
        let percent = event.offsetX / event.currentTarget.offsetWidth;
        if(percent > 1) {
            percent = 1;
        }

        if(percent < 0) {
            percent = 0;
            muteButton.classList.add("active");
            player.muted = muteButton.classList.contains("active");  
        } else {
            muteButton.classList.remove("active");
            player.muted = muteButton.classList.contains("active");
        }

        player.volume = percent;
        volumeLevel.style.width = `${player.volume * 100}%`;   
    });

    // document.addEventListener("mousedown", event => {
    //     volume.addEventListener("mousemove", moveRangeVolume); 
    // });

    // document.addEventListener("mouseup", () => {
    //     volume.removeEventListener("mousemove", moveRangeVolume);
    // });

    // function moveRangeVolume(event) {
    //     let percent = event.offsetX / event.currentTarget.offsetWidth;
    //     if(percent > 1) {
    //         percent = 1;
    //     }

    //     if(percent < 0) {
    //         percent = 0;
    //         muteButton.classList.add("active");
    //         player.muted = muteButton.classList.contains("active");  
    //     } else {
    //         muteButton.classList.remove("active");
    //         player.muted = muteButton.classList.contains("active");
    //     }

    //     player.volume = percent;
    //     volumeLevel.style.width = `${player.volume * 100}%`;
    // } 
}



function togglePlay(player) {
    let steam;
    const playButton = document.querySelector('.play_button');
    const controls = player.closest('.video_container').querySelector('.controls');
    player.classList.toggle("play");
    playButton.classList.toggle("active");
    controls.classList.toggle("active");
    if(player.classList.contains("play")) {
        player.play();
        steam = setInterval(() => {
            const progress = player.currentTime / (player.duration / 100);
            player.closest('.video_container').querySelector('.progress').style.width = `${progress}%`;
        }, 100);
    } else {
        player.pause();
        clearInterval(steam)
    }
}


function visible(target) {
  const targetPosition = {
        top: window.pageYOffset + target.getBoundingClientRect().top,
        bottom: window.pageYOffset + target.getBoundingClientRect().bottom
    };
    
    const windowPosition = {
        top: window.pageYOffset,
        bottom: window.pageYOffset + document.documentElement.clientHeight
    };

  return targetPosition.bottom > windowPosition.top && targetPosition.top < windowPosition.bottom; 
};