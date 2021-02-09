import React, { Component } from 'react'

export default class Footers extends Component {
    render() {
        return (
            <div>
                 <footer className="footerarea">

    <nav>
      <ul className="footerarea--icons">
        <li><a href="http://www.facebook.com/" target="_blank" rel="noopener noreferrer"><img className="iconfacebook"
              src="/images/facebook.png" alt="Facebook" /></a></li>

        <li><a href="http://www.twitter.com/" target="_blank" rel="noopener noreferrer"><img className="icontwitter" src="/images/twitter.png"
              alt="Twitter" /></a></li>

        <li><a href="http://www.youtube.com/" target="_blank" rel="noopener noreferrer"><img className="iconyoutube" src="/images/youtube.png"
              alt="Youtube" /></a></li>

        <li><a href="http://www.instagram.com/" target="_blank" rel="noopener noreferrer"><img className="iconinstagram" src="/images/instagram.png"
         alt="Instagram" /></a></li>
      </ul>
    </nav>

    <div className="footer__area--copyright">
    <p>Copyright &copy; 2020 | i 愛 anime</p>
    </div>
  </footer>

            </div>
        )
    }
}
