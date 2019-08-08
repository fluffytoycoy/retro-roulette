import React, {Component} from 'react';
import { render } from 'react-dom';
import { Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll';
import './Home.scss';
import axios from 'axios';

class Home extends Component{
  constructor(){
    super();
  }

componentWillMount(){
  axios.get('api/test')
  .then(response=>{
    console.log(response)
  }).catch(error=>{
    console.log(error)
  })
}

scrollTo() {
  scroller.scrollTo('scroll-to-element', {
    duration: 800,
    delay: 0,
    smooth: 'easeInOutQuart'
  })
}


  render(){
    return (
      <div id="home">
        <div id="hero">
          <div className="sign-wrapper">
            <img className="lights-on" src="/img/retro_sign.png"/>
            <img className="lights-off" src="/img/retro_sign_off.png"/>
          </div>
          <div className="btn-wrapper">
            <Link to="bet-section" smooth={true} duration={500}>
              <div className="hero-btn">
                Place your bets
              </div>
            </Link >
          </div>
        </div>
        <div id="bets">
          <div className="container">
            <div>
              <div className="ad">
                <p>temp ad</p>
              </div>
            </div>
          </div>
          <div id="bet-section" className="container">
            <div className="bet-row">
                <div className="col">
                <div>
                  <h1>One morning, when Gregor Samsa woke from troubled
                  dreams.</h1>
                  <p>One morning, when Gregor Samsa woke from troubled
                  dreams, he found himself transformed in his bed into
                  a horrible vermin. He lay on his armour-like back,
                  and if he lifted his head a little he could see his
                  brown belly, slightly domed and divided by arches into
                  stiff sections. The bedding was hardly able to cover
                  <strong>strong</strong> it and seemed ready to slide
                  off any moment. His many legs, pitifully thin
                  compared with the size of the rest of him,
                  <a className="external ext" href="#">link</a> waved about
                  helplessly as he looked. "What's happened to me? " he
                  thought. It wasn't a dream. His room, a proper human
                  room although a little too small, lay peacefully
                  between its four familiar walls.</p>
                </div>
              </div>
              <div className="divider">
              </div>
              <div className="col">
                <div>
                  <h1>One morning, when Gregor Samsa woke from troubled
                  dreams.</h1>
                  <p>One morning, when Gregor Samsa woke from troubled
                  dreams, he found himself transformed in his bed into
                  a horrible vermin. He lay on his armour-like back,
                  and if he lifted his head a little he could see his
                  brown belly, slightly domed and divided by arches into
                  stiff sections. The bedding was hardly able to cover
                  <strong>strong</strong> it and seemed ready to slide
                  off any moment. His many legs, pitifully thin
                  compared with the size of the rest of him,
                  <a className="external ext" href="#">link</a> waved about
                  helplessly as he looked. "What's happened to me? " he
                  thought. It wasn't a dream. His room, a proper human
                  room although a little too small, lay peacefully
                  between its four familiar walls.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default Home;
