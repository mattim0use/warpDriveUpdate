import React, { useEffect, useRef, useState } from "react";
import { ToastBar, Toaster, toast } from "react-hot-toast";

interface SpaceshipInterfaceProps {
  travelStatus: string;
}

const SpaceshipInterface: React.FC<SpaceshipInterfaceProps> = ({ travelStatus }) => {
  const [videoPlaying, setVideoPlaying] = useState(true);
  const videoId = "8Yqx3we3WJ4";
  const playerRef = useRef<YT.Player | null>(null);

  const toggleVideo = () => {
    setVideoPlaying(!videoPlaying);
  };

  const divStyle: React.CSSProperties = {
    pointerEvents: videoPlaying ? "auto" : "none",
    opacity: videoPlaying ? 0.8 : 0.2,
    zIndex: -1,
    left: "70.3%",
    top: "19%",
    width: "18.5%",
    height: "20%",
    position: "absolute",
    transform: "perspective(200px) rotateZ(-47deg) rotateY(-10deg) rotateX(5deg)skewX(-22deg)skewY(21deg)",
  };

  useEffect(() => {
    if (travelStatus === "TargetAcquired") {
      setVideoPlaying(true);
    }
  }, [travelStatus]);
  const iframeSrc = `https://www.youtube.com/embed/${videoId}?autoplay=${
    videoPlaying ? "1" : "0"
  }&mute=0&enablejsapi=1`;
  useEffect(() => {
    const loadYoutubeAPI = () => {
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      script.async = true;
      script.defer = true;
      script.onload = () => {
        (window as any).YT.ready(() => {
          console.log("YouTube API ready");
        });
      };
      document.body.appendChild(script);
    };

    loadYoutubeAPI();
  }, []);

  useEffect(() => {
    const onPlayerReady = (event: YT.PlayerEvent) => {
      event.target.setVolume(20);
    };

    const onPlayerStateChange = (event: YT.OnStateChangeEvent) => {
      if (event.data === YT.PlayerState.PLAYING && !videoPlaying) {
        setVideoPlaying(true);
      } else if (event.data === YT.PlayerState.PAUSED && videoPlaying) {
        setVideoPlaying(false);
      }
    };

    const createPlayer = () => {
      const newPlayer = new YT.Player("ytplayer", {
        videoId,
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange,
        },
      });
      playerRef.current = newPlayer;
    };

    if ((window as any).YT) {
      createPlayer();
    } else {
      (window as any).onYouTubeIframeAPIReady = createPlayer;
    }
  }, []);
  return (
    <>
      <div style={divStyle} className="spaceship-display-screen">
        <iframe
          className={`screen-border spaceship-interface ${videoPlaying ? "video-playing" : ""}`}
          style={{
            width: "100%",
          }}
          id="ytplayer"
          src={iframeSrc}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        ></iframe>
        <div
          className="spaceship-interface"
          style={{
            background: "transparent",
            zIndex: -2,
            left: "0",
            right: "70.3%",
            transform:
              "perspective(1000px) rotateZ(20deg) rotateX(40deg) rotateY(-20deg) translateX(-5%) skewX(-10deg) translateY(25%) scale(1.5)",
          }}
        >
          <Toaster
            containerClassName=""
            containerStyle={{
              top: 20,
              left: 30,
              bottom: 20,
              right: 20,
            }}
            toastOptions={{
              className: "spaceship-display-screen",

              success: {
                duration: 8000,
                style: {
                  background: "#1f2937",
                  color: "#fff",
                  padding: 5,
                },
                iconTheme: {
                  primary: "orange",
                  secondary: "black",
                },
              },
            }}
            position="bottom-center"
          >
            {t => (
              <ToastBar toast={t}>
                {({ icon, message }) => (
                  <>
                    {icon}
                    {message}
                    {t.type !== "loading" && <button onClick={() => toast.dismiss(t.id)}>X</button>}
                  </>
                )}
              </ToastBar>
            )}
          </Toaster>
        </div>
      </div>
      <div
        className="screen-border spaceship-pannel spaceship-display-screen"
        style={{
          position: "absolute",
          height: "8%",
          width: "4%",

          fontSize: ".8rem",
          display: "flex",
          justifyContent: "center",
          border: "1px solid #fff",
          alignItems: "center",
          top: "63%",
          left: "63%",
          marginRight: "5%",
          padding: "1.5rem",
          zIndex: 1,
          transform: "rotateZ(8deg) rotateY(-30deg)skewX(5deg)skewY(-3deg)",
          boxShadow: "0 0 10px 2px #fff",
          animation: "pulse 15s infinite",
        }}
      >
        <button
          onClick={toggleVideo}
          className=""
          style={{
            background: "transparent",
            border: "none",
            opacity: 1,

            fontSize: "0.8rem",
            pointerEvents: "auto",
          }}
        >
          SPACE RADIO<br></br>
          {videoPlaying ? "Pause" : "Play"}
        </button>
      </div>
    </>
  );
};

export default SpaceshipInterface;
