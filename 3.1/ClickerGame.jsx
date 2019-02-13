//Напишите небольшую игру-кликер.

//Работать должно так. Вначале по центру экрана маленький круг (цвет на ваше усмотрение). При каждом клике на него, он увеличивается в размере. Так пока не достигнет максимального. Потом сначала.

//Используйте только только inline-стили в этом задании.


//Дополнительно в этом задании:*

// - Анимация при увеличении



const MaxRadius = 400;
const MinRadius = 10;
const StepOfChange = 1.5;

let CIRCLE_STYLES = {
  borderRadius: '50%',
  background: 'green',
  position: 'absolute',
  transition: 'all 0.2s linear',
  top: 150,
  left: 750

};

const ClickerGame = React.createClass({
  getInitialState(){
    return{
      radius: MinRadius
    }
  },


  handleClick(){
    let radius = this.state.radius * StepOfChange > MaxRadius ? MinRadius : this.state.radius * StepOfChange;
    this.setState({radius});
  },

render(){
  const {radius} = this.state;
   let circleStyles = {...CIRCLE_STYLES};
       circleStyles.height = 2 * radius;
       circleStyles.width = 2 * radius;

  return(
    <div style={circleStyles} onClick={this.handleClick}>

    </div>
   );
  }
});

ReactDOM.render(
    <ClickerGame />,
    document.getElementById('ClickerGame')
);
