import React from 'react';
import { Dropdown } from 'carbon-components-react';
import classes from './DropDown.module.css';

function DropDown(props) {
    const {id, items, label, titleText, change, selectedItem, isDisabled, initialSelectedItem} = props.dropDownValues
    return (
        <div className={classes.DropDown}>
            <Dropdown 
                disabled={isDisabled}
                ariaLabel="Dropdown"
                titleText={titleText}
                id={id}
                items={items}
                label={label}
                initialSelectedItem={initialSelectedItem}
                //itemToString={(item) => (item ? item.text : '')}
                onChange={change}
                selectedItem={selectedItem}
                />
        </div>
    )
}

export default DropDown;