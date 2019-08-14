import React from 'react';
//import {Link} from 'react-router-dom';
import './Footer.scss';

function Footer(){
    return (
      <div id="footer">
        <h1>Spread the Word</h1>
        <div>
          <ul class="share-buttons">
            <li><a href="https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2FRetroRoulette.net&quote=Don't%20know%20what%20to%20retro%20game%20to%20play%3F%20Choose%20your%20favorite%20systems%20and%2For%20genres%20and%20spin%20for%20a%20random%20game." title="Share on Facebook" target="_blank"><i class="fab fa-facebook-square"></i></a></li>
            <li><a href="https://twitter.com/intent/tweet?source=http%3A%2F%2FRetroRoulette.net&text=Don't%20know%20what%20to%20retro%20game%20to%20play%3F%20Choose%20your%20favorite%20systems%20and%2For%20genres%20and%20spin%20for%20a%20random%20game.:%20http%3A%2F%2FRetroRoulette.net" target="_blank" title="Tweet"><i class="fab fa-twitter-square"></i></a></li>
            <li><a href="http://www.reddit.com/submit?url=http%3A%2F%2FRetroRoulette.net&title=Don't%20know%20what%20to%20retro%20game%20to%20play%3F%20Choose%20your%20favorite%20systems%20and%2For%20genres%20and%20spin%20for%20a%20random%20game." target="_blank" title="Submit to Reddit"><i class="fab fa-reddit-square"></i></a></li>
          </ul>
        </div>
        <div className="copy">
          <p>©{new Date().getFullYear()} Retro Roulette & CoyCoding | All Rights Reserved</p>
        </div>
     </div>
    );
}

export default Footer;
