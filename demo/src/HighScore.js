import  React, {Component} from 'react';

class HighScore extends Component {
    render(){
        if(this.props.overTen){
            return(
                <h2>Bigger than 10
                    <button onClick={this.props.onReset}>Reset</button>
                </h2>
            )
        }else{
            return null;
        }
    }
}

export default HighScore;