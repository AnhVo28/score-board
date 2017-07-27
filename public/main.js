var PLAYERS =[
  {
    name: 'Jim Hoskins',
    score: 32,
  },
  {
    name: 'Andrew Master',
    score: 10
  },
  {
    name: 'Alena Holligan',
    score: 20,
  }
]


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
            {this.props.players.map((player, key)=> <Player key ={key} name={player.name} score={player.score} />)}
          </div>
      </div>
    );
  }

}

ReactDOM.render(
  <App players={PLAYERS}/>, document.getElementById('container')
)
