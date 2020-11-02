import React from 'react';
import { TextInput } from 'carbon-components-react';
import classes from './InputTextField.module.css';

function InputTextField(props) {

    const {text, placeholder, labelText, change, isDisabled} = props.values
    //console.log(text)
    return (
        <div className={classes.InputTextField}>
            <TextInput 
                disabled={isDisabled}
                color="primary" 
                placeholder={placeholder} 
                id="TextInput10" 
                labelText={labelText} 
                value={text}
                onChange={change}/>
        </div>
    )
}

export default InputTextField;