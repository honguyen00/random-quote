import './App.css';
import React from "react";

const randomColors = [
  '#db5767',
  '#cdcb27',
  '#85c3a7',
  '#7c21c6',
  '#8d239c',
  '#77a492',
  '#ceb89f',
  '#546500',
  '#1b41ef',
  '#756438',
  '#32cc5e',
  '#758a19',
  '#de8263'
  ]
  
  const getRandomQuote = async () => {
    const data = await fetch('https://api.quotable.io/quotes/random');
    const quote = await data.json();
    return quote[0];
  }
  
  const getRandomColor = (randomColors) => {
    return randomColors[Math.floor(Math.random() * randomColors.length)]
  }

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        quote: {},
        randomColor: ''
    };
    this.handleNewQuote = this.handleNewQuote.bind(this);
}
  async componentDidMount() {
    this.handleNewQuote();
  }
  async handleNewQuote() {
      this.setState({quote: await getRandomQuote(), randomColor: getRandomColor(randomColors)});
      document.getElementById("text").classList.add('fadeIn');
      setTimeout(() => {
        document.getElementById("text").classList.remove('fadeIn');
      }, 2000)
  }
render() {
    return (
        <div className='App' style={{backgroundColor: `${this.state.randomColor}`}}>
        <div id='quote-box'>
            <i className="fa fa-quote-left" style={{color: `${this.state.randomColor}`}}></i>
            <div id='text' style={{color: `${this.state.randomColor}`, marginLeft: '0.5rem'}} >{this.state.quote.content}</div>
            <div id='author' style={{color: `${this.state.randomColor}`}}>{`- ${this.state.quote.author}`}</div>
            <div className="d-flex justify-content-between">
                <a style={{backgroundColor: `${this.state.randomColor}`, color: 'white', textAlign: 'center'}} className="btn" href='twitter.com/intent/tweet' target='_blank' id='tweet-quote'><i className="fa-brands fa-twitter"></i></a>
                <button style={{backgroundColor: `${this.state.randomColor}`, color: 'white'}} className="btn" id="new-quote" onClick={this.handleNewQuote}>New Quote</button>
            </div>
        </div>
        <p style={{fontSize: '0.7rem', marginTop: '0.5rem', color: 'white'}}>By <a href="https://github.com/honguyen00" target="_blank" rel="noreferrer">Felix</a></p>
        </div>
    );       
}
}

export default App;
