import React from 'react';
import classes from './Spinner.module.css';
import { Loading } from 'carbon-components-react';

const spinner = () => {
    return (
        <Loading className={classes.Spinner} description="Loading..." withOverlay={false} />
    )
}

export default spinner;