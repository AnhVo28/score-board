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



class AddPlayerForm extends React.Component {

  onSubmit(e){
    e.preventDefault()
    this.props.onAdd(this.input.value)
    this.input.value=''
  }

  render() {
    return (
    <div className='add-player-form'>
      <form onSubmit={this.onSubmit.bind(this)}>
        <input type='text' placeholder='Enter the player name' ref={(input) => this.input = input}  ></input>
        <input type='submit' value ='Add Player'></input>
      </form>
    </div>
  )
  }
}



function Header(props) {
  return(
    <div className='header'>
      <Stats players={props.players}/>
      <h1>Scoreboard</h1>
      <Stopwatch />
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
        <a className= 'remove-player' onClick={props.onRemove}>x</a>
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



class Stopwatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      running: false,
      elapsedTime: 0,
      previousTime: 0,
    }
  }
  componentDidMount() {
    this.timerID = setInterval(this.onTick.bind(this), 100);
  }


  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  onTick() {
    if (this.state.running) {
      var now = Date.now();
      this.setState({
        previousTime: now,
        elapsedTime: this.state.elapsedTime + (now - this.state.previousTime),
      });
    }
    console.log('onTick');
  }

  onStart() {
    this.setState({
      running: true,
      previousTime: Date.now(),
    });
  }

  onStop() {
    this.setState({ running: false });
  }

  onReset(){
    this.setState({
      elapsedTime: 0,
      previousTime: Date.now(),
    });
  }


  render () {
    var startStop = this.state.running ? <button>stop</button> : <button>start</button>
  var seconds = Math.floor(this.state.elapsedTime/1000)
    return(
      <div className='stopwatch'>
        <h2>Stop watch</h2>
        <div className='stopwatch-time'>{seconds}</div>
        {
          this.state.running ?
            <button onClick={this.onStop.bind(this)}>stop</button>
            :
            <button onClick={this.onStart.bind(this)}>start</button>
          }
        <button onClick={this.onReset.bind(this)}>Reset</button>
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

   onAdd(value){
     this.state.players.push({
       name: value,
       score: 0
     })
     this.setState(this.state)

   }

   onRemove(index){
     this.state.players.splice(index,1)
     this.setState(this.state)
   }

  render() {
    return (
      <div className='scoreboard'>
        <Header players={this.state.players} />
          <div className='players'>
            {this.state.players.map((player, key)=>
                <Player
                  onRemove={()=>this.onRemove(key)}
                  onScoreChange={(delta)=>this.onScoreChange(key, delta)}
                  key = {key}
                  name= {player.name}
                  score= {player.score} />
              )}
          </div>
          <AddPlayerForm onAdd={this.onAdd.bind(this)}/>
      </div>
    );
  }

}

ReactDOM.render(
  <App players={PLAYERS}/>, document.getElementById('container')
)
