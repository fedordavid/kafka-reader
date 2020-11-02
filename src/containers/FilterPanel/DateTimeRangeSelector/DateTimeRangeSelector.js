import React from 'react';
import classes from './DateTimeRangeSelector.module.css';
import DateRangeDropDown from '../../../components/UI/DropDown/DropDown';
import DateTimeRangePicker from '../../../components/UI/DateTimeRangePicker/DateTimeRangePicker';

function DateTimeRangeSelector (props) {

    return (
        <div className={classes.DateTimeRangeSelector}>
            <DateRangeDropDown 
                dropDownValues = {props.dateRangeDropDown}/>
            <DateTimeRangePicker 
                dateTimeRange={props.dateTimeRange}/>
        </div>
    )
}

export default DateTimeRangeSelector;