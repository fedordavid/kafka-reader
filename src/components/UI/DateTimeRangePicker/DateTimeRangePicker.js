import React from 'react';
import { DatePicker, DatePickerInput } from 'carbon-components-react';
import { TimePicker } from 'carbon-components-react';
import classes from './DateTimeRangePicker.module.css';

function DateRangePicker(props) {

    const {
        from,
        to,
        fromHour,
        fromMinute,
        fromSecond,
        toHour,
        toMinute,
        toSecond,
        isDateTimesValid,
        changeFrom,
        changeTo,
        changeFromHour,
        changeFromMinute,
        changeFromSecond,
        changeToHour,
        changeToMinute,
        changeToSecond,
        isDisabled
    } = props.dateTimeRange;

    return (
        <div>
            <DatePicker
                datePickerType="single"
                onClose={changeFrom}
                placeholder={from}
                value={from}>
                <DatePickerInput
                    disabled={isDisabled}
                    invalid={isDateTimesValid}
                    invalidText="invalid"
                    placeholder="mm/dd/yyyy"
                    labelText="DateTime From"
                    id="date-picker-single1"
                />
            </DatePicker>

            <div className={classes.Item}>
                <TimePicker
                    className={classes.InputTextField}
                    disabled={isDisabled}
                    invalid={isDateTimesValid}
                    type="text"
                    id="TimePickerFromHour"
                    labelText="Hour"
                    placeholder="hour"
                    value={fromHour}
                    invalidText="invalid"
                    onChange={(e) => changeFromHour(e)}
                />

                <TimePicker
                    className={classes.InputTextField}
                    disabled={isDisabled}
                    invalid={isDateTimesValid}
                    type="text"
                    id="TimePickerFromMin"
                    labelText="Min"
                    placeholder="min"
                    value={fromMinute}
                    invalidText="invalid"
                    onChange={(e) => changeFromMinute(e)}
                />

                <TimePicker
                    className={classes.InputTextField}
                    disabled={isDisabled}
                    invalid={isDateTimesValid}
                    type="text"
                    id="TimePickerSecondFrom"
                    labelText="Sec"
                    placeholder="sec"
                    value={fromSecond}
                    invalidText="invalid"
                    onChange={(e) => changeFromSecond(e)}
                />
            </div>

            <DatePicker
                datePickerType="single"
                onClose={changeTo}
                paceholder={to}
                value={to}>
                <DatePickerInput
                    disabled={isDisabled}
                    invalid={isDateTimesValid}
                    invalidText="invalid"
                    placeholder="mm/dd/yyyy"
                    labelText="DateTime To"
                    id="date-picker-single2"
                />
            </DatePicker>

            <div className={classes.Item}>
                <TimePicker
                    className={classes.InputTextField}
                    disabled={isDisabled}
                    invalid={isDateTimesValid}
                    type="text"
                    id="TimePickerHourTo"
                    labelText="Hour"
                    placeholder="hour"
                    value={toHour}
                    invalidText="invalid"
                    onChange={(e) => changeToHour(e)}
                />

                <TimePicker
                    className={classes.InputTextField}
                    disabled={isDisabled}
                    invalid={isDateTimesValid}
                    type="text"
                    id="TimePickerMinuteTo"
                    labelText="Min"
                    placeholder="min"
                    value={toMinute}
                    invalidText="invalid"
                    onChange={(e) => changeToMinute(e)}
                />

                <TimePicker
                    className={classes.InputTextField}
                    disabled={isDisabled}
                    invalid={isDateTimesValid}
                    type="text"
                    id="TimePickerSecondTo"
                    labelText="Sec"
                    placeholder="sec"
                    value={toSecond}
                    invalidText="invalid"
                    onChange={(e) => changeToSecond(e)}
                />
            </div>
        </div>
    )
}

export default DateRangePicker;