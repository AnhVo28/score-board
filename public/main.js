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
      <Stats players={props.players}/>
      <h1>Scoreboard</h1>
    </div>
  )
}

function Stats(props) {
  var totalPlayers = props.players.length
  var totalPoints = props.players.reduce(((total, player)=> total +player.score),0)
  return(
    <table className='stats'>
      <tbody>
        <tr>
          <td>Player:</td>
          <td>{totalPlayers}</td>
        </tr>
        <tr>
          <td>Total point:</td>
          <td>{totalPoints}</td>
        </tr>
      </tbody>
    </table>
  )
}

function Player(props) {
  return(
    <div className='player'>
      <div className='player-name'>
        {props.name}
      </div>
      <div className='player-score'>
        <Counter score ={props.score} onScoreChange={props.onScoreChange} />
      </div>
    </div>
  )
}


class Counter extends React.Component {

  render() {
    return (
      <div className='counter'>
        <button onClick={()=>this.props.onScoreChange(-1)}  className='counter-action decrement'> - </button>
        <div className='counter-score' >{this.props.score}</div>
        <button onClick={()=>this.props.onScoreChange(1)}  className='counter-action increment'> + </button>
      </div>
    )
  }
}






class App extends React.Component {

  constructor(props) {
     super(props);
     this.state = {
       players: PLAYERS
     }
   }

   onScoreChange(index, delta){
     this.state.players[index].score += delta;
     this.setState(this.state)
   }

  render() {
    return (
      <div className='scoreboard'>
        <Header players={this.state.players} />
          <div className='players'>
            {this.state.players.map((player, key)=>
                <Player
                  onScoreChange={(delta)=>this.onScoreChange(key, delta)}
                  key = {key}
                  name= {player.name}
                  score= {player.score} />
              )}
          </div>
      </div>
    );
  }

}

ReactDOM.render(
  <App players={PLAYERS}/>, document.getElementById('container')
)
