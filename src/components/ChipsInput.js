import React from 'react';

import Chip from './Chip';

class ChipsInput extends React.Component
{
    constructor(props)
    {
        super(props);

        this.parse = (string) => 
        {
            if (string.length == 0)
                return null;
            
            let arr = [], chipText = '';
            for (let i = 0; i < string.length; i++)
            {
                chipText = string.slice(i, string.indexOf(',', i));

                while ((chipText.match(/"/g)?.length || 0) % 2 == 1)
                {
                    chipText = string.slice(i, string.indexOf(',', i + chipText.length + 1));
                }

                if (chipText.length != 0)
                    arr.push(<Chip value={chipText.trim()} index={i} key={i} onChange={this.chipChangeCallback}></Chip>);

                i += chipText.length;
            }
            return arr;
        }  
        // this.chipChangeCallback = (chipKey, chipText, chipOldTextLength) =>
        // {
        //     let newValue = this.state.value.slice(0, chipKey) + chipText + this.state.value.slice(chipKey + chipOldTextLength);

        //     this.setState({
        //         value: newValue,
        //         chipsArray: this.parse(newValue),
        //     });
        // }
        this.inputHandler = (e) =>
        {
            if (e.target.textContent.length == 0)
            {
                if (this.state.placeholderVisible == false)
                    this.setState({
                        placeholderVisible: true,
                    });
            }
            else if (e.target.textContent.length != 0)
            {
                if (this.state.placeholderVisible == true)
                    this.setState({
                        placeholderVisible: false,
                    });
            }

            if (e.target.textContent.endsWith(','))
            {
                if ((e.target.textContent.match(/"/g)?.length || 0) % 2 == 0)
                {
                    this.setState({
                        value: this.state.value + (this.state.value.length == 0 || this.state.value.endsWith(',') ? '' : ',') + e.target.textContent,
                        chipsArray: this.parse(this.state.value + (this.state.value.length == 0 || this.state.value.endsWith(',') ? '' : ',') + e.target.textContent),
                        warningVisible: false,
                    });
                    e.target.textContent = '';
                }
            }
            this.inputRef.current.focus();
        };
        this.blurHandler = (e) =>
        {
            if (e.target.textContent.length == 0)
            {
                if (this.state.warningVisible == true)
                    this.setState({
                        warningVisible: false,
                    });
            }
            else if ((e.target.textContent.match(/"/g)?.length || 0) % 2 == 1)
            {
                if (this.state.warningVisible == false)
                    this.setState({
                        warningVisible: true,
                    });
            } 
            else if ((e.target.textContent.match(/"/g)?.length || 0) % 2 == 0)
            {
                this.setState({
                    value: this.state.value + (this.state.value.length == 0 || this.state.value.endsWith(',') ? '' : ',') + e.target.textContent + (e.target.textContent.endsWith(',') ? '' : ','),
                    chipsArray: this.parse(this.state.value + (this.state.value.length == 0 || this.state.value.endsWith(',') ? '' : ',') + e.target.textContent + (e.target.textContent.endsWith(',') ? '' : ',')),
                    warningVisible: false,
                });
                e.target.textContent = '';
            }
        };
        this.state = 
        {
            value: this.props.value + (this.props.value.length == 0 || this.props.value.endsWith(',') ? '' : ','),
            placeholderVisible: true,
            warningVisible: false,
            chipsArray: this.parse(this.props.value + (this.props.value.length == 0 || this.props.value.endsWith(',') ? '' : ',')),
        }
        this.inputRef = React.createRef();
    }
    render()
    {
        console.log('render: ')
        console.log(this.state.value);
        console.log(this.state.chipsArray);

        return (
            <div className="chips-input" spellCheck="false" tabIndex="1" onFocus={() => this.inputRef.current.focus()} onBlur={() => this.inputRef.current.blur()}>
                {this.state.chipsArray}
                <div ref={this.inputRef} className="input" contentEditable="true" onInput={this.inputHandler} onBlur={this.blurHandler}>{''}</div>
                <div className={'warning ' + (this.state.warningVisible ? 'warning--visible' : 'warning--hidden')} contentEditable="false">Закройте кавычки с двух сторон</div>
                <div className={'placeholder ' + ((this.state.value.length == 0 && this.state.placeholderVisible) ? 'placeholder--visible' : 'placeholder--hidden')} contentEditable="false">Введите ключевые слова</div>
            </div>
        )
    }
}

export default ChipsInput;