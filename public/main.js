function Header(props) {
  return(
    <div className='header'>
      <h1>Scoreboard</h1>
    </div>
  )
}

function Player(props) {
  return(
    <div className='player'>
      <div className='player-name'>
        {props.name}
      </div>
      <div className='player-score'>
        <Counter score ={props.score}/>
      </div>
    </div>
  )
}

function Counter(props) {
  return(
    <div className='counter'>
      <button className='counter-action decrement'> - </button>
      <div className='counter-score' >{props.score}</div>
      <button className='counter-action increment'> + </button>
    </div>
  )
}

class App extends React.Component {
  render() {
    return (
      <div className='scoreboard'>
        <Header/>
          <div className='players'>
            <Player name ='John Son' score ={32}/>
            <Player name ='Jim Hoskin' score ={10}/>
          </div>
      </div>
    );
  }

}

ReactDOM.render(
  <App/>, document.getElementById('container')
)
