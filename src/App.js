import "./styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";

import { useState, useEffect } from "react";

export default function App(props) {
  const [text, setText] = useState("");
  const [author, setAuthor] = useState("");
  const [visibility, setVisibility] = useState(true);

  const setRandomColor = () => {
    let randomNum = Math.floor(Math.random() * 16777215).toString(16);
    let randomColor = "#" + randomNum;
    if (randomColor !== "#ffffff") {
      const r = document.querySelector(":root");
      r.style.setProperty("--primary-color", randomColor);
    }
  };

  const getQuote = async () => {
    let quotesUrl = "https://type.fit/api/quotes";
    let response = await fetch(quotesUrl);
    let data = await response.json();
    let i = Math.floor(Math.random() * data.length);
    setRandomColor();
    setText(data[i].text);
    setAuthor(data[i].author);
    setVisibility(true);
  };

  useEffect(() => {
    getQuote();
  }, []);

  const clickHandler = () => {
    setVisibility(false);
    setText("");
    setAuthor("");
    getQuote();
  };
  return (
    <div className="container">
      <div id="quote-box">
        {
          <div id="text-box" className={visibility ? "showing" : "not-showing"}>
            <p id="text">
              <span
                style={{
                  paddingRight: "1ch"
                }}
              >
                <FontAwesomeIcon icon={faQuoteLeft} />
              </span>
              {text}
            </p>
            <p id="author">- {author || "Unknown"}</p>
          </div>
        }
        <div id="buttons">
          <a
            href={`https://www.twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=${text} -${
              author || "Unknown"
            } `}
            target="_blank"
            rel="noreferrer"
            id="tweet-quote"
          >
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <button id="new-quote" onClick={clickHandler}>
            New quote
          </button>
        </div>
      </div>
    </div>
  );
}
