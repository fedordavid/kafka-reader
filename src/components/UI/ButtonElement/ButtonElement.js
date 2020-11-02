import React from 'react';
import { Button } from 'carbon-components-react';

function ButtonElement(props) {
    return (
        <Button 
            type="submit" 
            size="field" 
            kind="primary"
            onClick={props.clicked}
            disabled={props.disabled}
            >Search</Button>
    )
}

export default ButtonElement;