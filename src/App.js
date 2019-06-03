import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { TwitterTweetEmbed } from 'react-twitter-embed';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: "5Year";
    src: url("./fonts/5yearsoldfont.ttf") format('truetype');
  } 

  * {
    margin-block-start: 0;
    margin-block-end: 0;
  }

  html,
  body {
    height: 100%;
  }

  body {
    background-image: url(https://media.gq.com/photos/5b464b5fea635d0c47d6e007/16:9/w_1280%2Cc_limit/What-is-Trump-Looking-At-GQ-2018-071118.jpg);
    background-size: cover;
    
    @media only screen and (max-width: 600px) {
      background-position: -35rem;
    }

    background-color: #fff;
    font-family: system-ui;

    display: flex;
    flex-direction: column;

    align-items: center;
    justify-content: center;

    font-family: '5Year', system-ui;
  }

  #root {
    display: contents;
  }
`;

const BlockQuote = styled.blockquote`
  margin: 0 auto;
  padding: 1em;
  /* border-left: 5px solid #999; */

  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;

  & p  {
    background-color: #555;
    color: #fff;
    font-size: 12pt;
    line-height: 1.4;
  }

  & footer {
    margin-top: 0.5em;
    padding: 0;
    color: #fff;
    font-size: 12pt;
    text-align: center;
    font-style: italic;
  }

  & footer:hover {
    cursor: pointer;
    text-decoration: underline;
  }

  & footer:before {
    content: ' - ';
  }
`;

const Tweet = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding-top: 4rem;

  @media only screen and (max-width: 600px) {
    width: 20rem;
    padding-top: 2rem;
  }
  /* justify-content: center; */
`;

const App = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/random/quote');
      const responseData = await response.json();
      setData(responseData);
    };

    fetchData();
  }, []);

  if (!data) {
    return null;
  }

  const retrieveID = () => {
    const url = new URL(data._embedded.source[0].url);
    return url.pathname.substring(url.pathname.lastIndexOf('/') + 1);
  };

  const id = retrieveID();
  return (
    <>
      <GlobalStyle />
      {/* <BlockQuote>
        <p>
          <q>{data.value}</q>
        </p>
        <footer onClick={() => window.open(data._embedded.source[0].url)}>
          <span style={{ backgroundColor: '#555' }}>
            {' '}
            Trump, Donald (
            {data.appeared_at.substring(0, data.appeared_at.lastIndexOf('T'))})
          </span>
        </footer>
      </BlockQuote> */}

      <Tweet>
        <TwitterTweetEmbed tweetId={String(id)} cards='hidden' />
      </Tweet>
    </>
  );
};

export default App;
