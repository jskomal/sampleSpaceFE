import { useState, useEffect, useRef, useCallback } from "react";
import "./Play.css";
import logo from "../../assets/images/sample-space-logo.svg";
import { fetchKit } from "../../APICalls";
import PianoRoll from "../PianoRoll/PianoRoll.js";
import DrumPad from "../DrumPad/DrumPad";
import InfoBox from "../InfoBox/InfoBox";
import { Link } from "react-router-dom";
import { Loader } from "../Loader/Loader";
import { Error } from "../Error/Error";

const Play = () => {
  const [kit, setKit] = useState(null);
  const [currentSample, setCurrentSample] = useState(null);
  const [selectedKit, setSelectedKit] = useState("Andromeda%20Strain");
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(true);

  const kickRef = useRef(null);
  const snareRef = useRef(null);
  const hhClosedRef = useRef(null);
  const hhOpenRef = useRef(null);
  const oneShotOneRef = useRef(null);
  const oneShotTwoRef = useRef(null);
  const melodyRef = useRef(null);
  const grooveRef = useRef(null);

  const handleKeyboard = useCallback(
    (e) => {
      switch (e.code) {
        case "KeyA":
          kickRef.current.click();
          break;
        case "KeyS":
          snareRef.current.click();
          break;
        case "KeyD":
          hhClosedRef.current.click();
          break;
        case "KeyF":
          hhOpenRef.current.click();
          break;
        case "KeyQ":
          melodyRef.current.click();
          break;
        case "KeyW":
          oneShotOneRef.current.click();
          break;
        case "KeyE":
          oneShotTwoRef.current.click();
          break;
        case "KeyR":
          grooveRef.current.click();
      }
    },
    [
      kickRef,
      snareRef,
      hhClosedRef,
      hhOpenRef,
      melodyRef,
      oneShotOneRef,
      oneShotTwoRef,
      grooveRef,
    ]
  );

  const clearSamples = () => {
    setKit(null);
  };

  useEffect(() => {
    setLoading(true);
    clearSamples();
    fetchKit(selectedKit)
      .then((data) => {
        setKit(data);
        setTimeout(() => {
          setLoading(false);
        }, 1500);
      })
      .catch((e) => {
        setLoading(false);
        setErrorMessage("Sorry, We were unable to get that. Please try again!");
      });
  }, [selectedKit]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyboard);
    return () => {
      document.removeEventListener("keydown", handleKeyboard);
    };
  }, [handleKeyboard]);

  return (
    <div className="main-view">
      <header className="play-header fade-in">
        <Link to="/">
          <img src={logo} alt="Sample Space logo" />
        </Link>
        <div className="selector-container">
          <label htmlFor="kit-select" className="kit-label">
            Choose a Kit to Play!
          </label>
          <select
            className="kit-select"
            name="kit-select"
            onChange={(e) => setSelectedKit(e.target.value)}
          >
            <option value="Andromeda%20Strain">Andromeda Strain</option>
            <option value="Magnetosphere">Magnetosphere</option>
            <option value="Apollo%2011">Apollo 11</option>
          </select>
        </div>
      </header>
      {loading && !errorMessage ? (
        <Loader />
      ) : errorMessage ? (
        <Error error={errorMessage} />
      ) : (
        kit && (
          <main className="main-container">
            <div className="drum-infobox-container">
              <DrumPad
                kit={kit.kit}
                setCurrentSample={setCurrentSample}
                allRefs={[
                  kickRef,
                  snareRef,
                  hhClosedRef,
                  hhOpenRef,
                  melodyRef,
                  oneShotOneRef,
                  oneShotTwoRef,
                  grooveRef,
                ]}
                keystrokes={["Q", "W", "E", "R", "A", "S", "D", "F"]}
              />
              <InfoBox currentSample={currentSample} tempo={kit.kit.bpm} />
            </div>

            <PianoRoll kit={kit.kit} />
          </main>
        )
      )}
    </div>
  );
};

export default Play;
