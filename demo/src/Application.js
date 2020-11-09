import React, {Component} from "react";
import HighScore from './HighScore';
import "./css/style.css";

class Application extends Component {

    constructor(props){
        super(props);

        this.state = {
            count: 0 ,
            overTen: false
        }
    }

    handleClick = () => {
       this.setState({count: this.state.count + 1});
    }
    handleClickSub = () => {
        if(this.state.count >0){
            this.setState({count: this.state.count - 1});
        }
    }

    componentDidUpdate(props, state){
        if(this.state.count > 10 && this.state.count != state.count){
            console.log("Updated from ", state, " to ", this.state);
            this.setState({overTen: true});
        }
        else if(this.state.count != state.count){
            this.setState({overTen: false});
        }
    }

    resetCount = (e) => {
        console.log("Event is",e)
        this.setState({
            count:0,
            overTen:false
        });
    }

    render(){
        let {count} = this.state;

        return (
            <div>
             <h1>You clicked the button {count} times</h1>
             <span>
                 <button onClick={(e) => this.handleClick()} >Click Me</button>
                 <button onClick={(e) => this.handleClickSub()}>Sub</button>
                <HighScore 
                    overTen={this.state.overTen}
                    onReset={this.resetCount}
                />
             </span>
            </div>
        );
    }
}

export default Application;