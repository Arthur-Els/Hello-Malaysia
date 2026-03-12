const navbar = document.querySelector(".navbar");
const scrollTopBtn = document.createElement("button");

scrollTopBtn.type = "button";
scrollTopBtn.className = "scroll-top-btn";
scrollTopBtn.setAttribute("aria-label", "Scroll to top");
scrollTopBtn.innerHTML = "&#8593;";
document.body.appendChild(scrollTopBtn);

const syncUIState = () => {
    const isScrolled = window.scrollY > 99;

    if (navbar) {
        if (isScrolled) {
            navbar.classList.add("navbar-scrolled");
        } else {
            navbar.classList.remove("navbar-scrolled");
        }
    }

    if (isScrolled) {
        scrollTopBtn.classList.add("is-visible");
    } else {
        scrollTopBtn.classList.remove("is-visible");
    }
};

syncUIState();
window.addEventListener("scroll", syncUIState);

scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

const initIntroVideoModal = () => {
    const introModal = document.getElementById("introVideoModal");
    const introVideo = document.getElementById("introVideoPlayer");
    const skipButton = document.getElementById("introVideoSkip");
    const playButton = document.getElementById("introVideoPlay");

    if (!introModal || !introVideo || !skipButton || !playButton) {
        return;
    }

    const introStorageKey = "hm_intro_video_seen";

    const closeIntroModal = (markAsSeen = true) => {
        introModal.classList.remove("is-open");
        introModal.setAttribute("aria-hidden", "true");
        document.body.classList.remove("intro-video-open");

        introVideo.pause();
        introVideo.currentTime = 0;
        playButton.classList.remove("is-hidden");

        if (markAsSeen) {
            sessionStorage.setItem(introStorageKey, "1");
        }
    };

    const openIntroModal = () => {
        if (sessionStorage.getItem(introStorageKey) === "1") {
            return;
        }

        introModal.classList.add("is-open");
        introModal.setAttribute("aria-hidden", "false");
        document.body.classList.add("intro-video-open");
        playButton.classList.remove("is-hidden");
    };

    const playIntroVideo = async () => {
        try {
            introVideo.muted = false;
            introVideo.volume = 1;
            await introVideo.play();
            playButton.classList.add("is-hidden");
        } catch (error) {
            console.error("Intro video failed to play:", error);
        }
    };

    skipButton.addEventListener("click", () => closeIntroModal(true));
    playButton.addEventListener("click", playIntroVideo);

    introModal.addEventListener("click", (event) => {
        if (event.target === introModal) {
            closeIntroModal(true);
        }
    });

    introVideo.addEventListener("ended", () => closeIntroModal(true));
    introVideo.addEventListener("error", () => closeIntroModal(true));

    window.addEventListener("load", openIntroModal, { once: true });
};

initIntroVideoModal();
