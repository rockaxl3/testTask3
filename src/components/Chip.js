import React from 'react';

class Chip extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = 
        {
            value: this.props.value,
        }
        this.XClick = () =>
        {
            this.setState({
                value: '',
            });
            // let e = {target: {textContent: ''}, } ;
            // this.blurHandler(e)
        }
        
        // this.blurHandler = (e) =>
        // {
        //     if (this.state.value != e.target.textContent)
        //         this.props.onChange(this.props.index, e.target.textContent, this.state.value.length);
        // }
    }
    render()
    {
        if (this.state.value.length == 0)
            return null;
        else return (
            <div className="chip" contentEditable="false">
                <div className="text" contentEditable="true" onFocus={(e) => {e.preventDefault(); e.stopPropagation()}} onBlur={this.blurHandler}>{this.state.value}</div><div className="x" onClick={this.XClick}></div>
            </div>
        )
    }
}

export default Chip;