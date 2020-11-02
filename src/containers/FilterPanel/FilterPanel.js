import React, { useReducer, useState } from 'react';
import classes from './FilterPanel.module.css';
import DateTimeRangeSelector from './DateTimeRangeSelector/DateTimeRangeSelector';
import TopicDropDown from '../../components/UI/DropDown/DropDown';
import InputTextField from '../../components/UI/InputTextField/InputTextField';
import Button from '../../components/UI/ButtonElement/ButtonElement';
import * as dayjs from 'dayjs'
import history from "../../history";
import { withRouter } from 'react-router-dom'

var utc = require('dayjs/plugin/utc')
var tz = require('dayjs/plugin/timezone')
var isSameOrBefore = require('dayjs/plugin/isSameOrBefore')
dayjs.extend(utc);
dayjs.extend(tz);
dayjs.extend(isSameOrBefore)

const FORMAT_UTC = 'YYYY-MM-DDTHH:mm.sss[Z]';

const topicDropDownItems = ['dpcm-consents', 'dpcm-purposes']

const dateRangeDropDownItems = ['Start Date', 'End Date', 'Modify Date', 'Create Date']

function getFilterPanelValues() {

    //selectedItem: {id: "option-0", text: "dpcm-consents"}
    const topic = useTopicDropDown.selectedItem.id;
    const dateRangeFrom = useDateRangeDropDown.selectedItem.id;
    const dateTimeFrom = useDateTimeRange.from;
    const dateTimeTo = useDateTimeRange.to;
    const searchString = useSearchBar.text;

    let result = {
        topic: topic
    }

    return result;
}

function useDateTimeRange(initial, isDisabled) {
    const [state, dispatch] = useReducer(reduce, initial)
    function reduce(state, action) {
        switch (action?.type) {
            case "from":
                return { ...state, ...{ from: action.value } };
            case "to":
                return { ...state, ...{ to: action.value } };
            case "fromHour":
                return { ...state, ...{ fromHour: action.fromHour } };
            case "fromMinute":
                return { ...state, ...{ fromMinute: action.fromMinute } };
            case "fromSecond":
                return { ...state, ...{ fromSecond: action.fromSecond } };
            case "toHour":
                return { ...state, ...{ toHour: action.toHour } };
            case "toMinute":
                return { ...state, ...{ toMinute: action.toMinute } };
            case "toSecond":
                return { ...state, ...{ toSecond: action.toSecond } };
            case "changeDateRangeDropDown":
                return { ...state, ...{ selectedItem: action.selectedItem } };
            default:
                return state;
        }
    }

    return {
        fromHour: state?.fromHour || 0,
        fromMinute: state?.fromMinute || 0,
        fromSecond: state?.fromSecond || 0,
        toHour: state?.toHour || 23,
        toMinute: state?.toMinute || 59,
        toSecond: state?.toSecond || 59,
        from: state?.from || dayjs().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
        to: state?.to || dayjs().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
        isDisabled: isDisabled,
        isDateTimesValid: !dayjs(state?.from || dayjs()).hour(state?.fromHour || 23).minute(state?.fromMinute || 59).second(state?.fromSecond || 59).isSameOrBefore(dayjs(state?.to || dayjs()).hour(state?.toHour || 23).minute(state?.toMinute || 59).second(state?.toSecond || 59)),
        changeFrom: (value) => dispatch({ type: "from", value }),
        changeTo: (value) => dispatch({ type: "to", value }),
        changeFromHour: (value) => dispatch({ type: "fromHour", fromHour: value.target.value }),
        changeFromMinute: (value) => dispatch({ type: "fromMinute", fromMinute: value.target.value }),
        changeFromSecond: (value) => dispatch({ type: "fromSecond", fromSecond: value.target.value }),
        changeToHour: (value) => dispatch({ type: "toHour", toHour: value.target.value }),
        changeToMinute: (value) => dispatch({ type: "toMinute", toMinute: value.target.value }),
        changeToSecond: (value) => dispatch({ type: "toSecond", toSecond: value.target.value }),
    }
}

function useDateRangeDropDown(initial, isDisabled, initialSelectedItem) {
    const [state, dispatch] = useReducer(reduce, initial)
    function reduce(state, action) {
        switch (action?.type) {
            case "change":
                return { ...state, ...{ selectedItem: action.selectedItem } };
            default:
                return state;
        }
    }
    return {
        id: state?.id || "topic_drop_down_id_1",
        items: state?.items || dateRangeDropDownItems,
        label: state?.label || "Date Range",
        selectedItem: state?.selectedItem || undefined,
        initialSelectedItem: initialSelectedItem,
        titleText: state?.titleText || "Date Range",
        isDisabled: isDisabled,
        isDateRangeDisabled: initialSelectedItem ? false 
                             : state?.selectedItem ? false
                             : true,
        change: (value) => dispatch({ type: "change", selectedItem: value.selectedItem }),
    }
}

function useSearchBar(initial, isDisabled, text) {
    const [state, dispatch] = useReducer(reduce, initial)
    function reduce(state, action) {
        switch (action?.type) {
            case "change":
                return { ...state, ...{ text: action.text } };
            default:
                return state;
        }
    }

    return {
        text: state?.text || text,
        placeholder: state?.placeholder || "Search",
        isDisabled: isDisabled,
        labelText: state?.labelText || "Search",
        change: (value) => dispatch({ type: "change", text: value.target.value }),
    }
}

function useTopicDropDown(initial, initialSelectedItem) {
    const [state, dispatch] = useReducer(reduce, initial)
    function reduce(state, action) {
        switch (action?.type) {
            case "change":
                return { ...state, ...{ selectedItem: action.selectedItem } };
            default:
                return state;
        }
    }

    return {
        id: state?.text || "topic-1",
        items: state?.items || topicDropDownItems,
        label: state?.label || "Topic",
        titleText: state?.titleText || "Topic",
        selectedItem: state?.selectedItem || undefined,
        initialSelectedItem: initialSelectedItem,
        isDisable: initialSelectedItem ? false 
                          : state?.selectedItem ? false
                          : true,
        change: (value) => dispatch({ type: "change", selectedItem: value.selectedItem })
    }
}

function FilterPanel(props) {

    const searchButtonClickedHandler = () => {

        const filter = {
                filter: {
                    topic: topicDropDown.selectedItem,
                    date_type: dateRangeDropDown.selectedItem,
                    date_time_from:  dateTimeRange.from, // "2017-01-26T00:00:00.000Z",
                    date_time_to: dateTimeRange.to, //"2020-10-26T23:59:59.000Z",
                    json: searchBar.text //"060000V825"
                }
            }

        const queryParams = []

        for (let i in filter) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(JSON.stringify(filter[i]),null, 0));            
        }

        // pagination tbd> parametrization
        const pagination = '&order=ASC&page=1&perPage=10&sort=id'

        const queryString = queryParams.join('&');

        props.history.replace({
            pathname: '/messages/search/filter',
            search: '?' + queryString + pagination
        })
     }

    function setFilterPanelValues() {

        let topicSelectedItem = undefined;
        let dateRangeSelectedItem = undefined;
        let searchText = undefined;

        let filter = JSON.parse(props.filter.filter)
        console.log(filter)
        if (props.filter !== undefined) {
            topicSelectedItem = props.filter.topic
        }

        if (props.filter.dateRange !== undefined) {
            dateRangeSelectedItem = props.filter.dateRange
        }

        if (props.filter.json !== undefined) {
            searchText = props.filter.json
        }

        let result = {
            topic: topicSelectedItem,
            dateRange: dateRangeSelectedItem,
            searchText: searchText
        }
        return result
    }

    const filterValues = setFilterPanelValues();
    const topicDropDown = useTopicDropDown({}, filterValues.topic);
    const dateRangeDropDown = useDateRangeDropDown({}, topicDropDown.isDisable, filterValues.dateRange);
    const dateTimeRange = useDateTimeRange({}, dateRangeDropDown.isDateRangeDisabled);

    const searchBar = useSearchBar({}, dateTimeRange.isDisabled || dateTimeRange.isDateTimesValid, filterValues.searchText);

    let formatUTC = 'YYYY-MM-DDTHH:mm.sss[Z]';



    return (
        <div className={classes.FilterPanel}>
            <div>
                <TopicDropDown
                    dropDownValues={topicDropDown} />
                <div>
                    <strong>Filter (FP):</strong> <br />
                    {JSON.stringify(props.filter)}

                </div>
            </div>
            <DateTimeRangeSelector
                dateTimeRange={dateTimeRange}
                dateRangeDropDown={dateRangeDropDown} />
            <div>
                <InputTextField
                    values={searchBar} />

                <div className={classes.SearchButton}>
                    <div>

                        <Button
                            disabled={dateTimeRange.isDisabled || dateTimeRange.isDateTimesValid}
                            clicked={searchButtonClickedHandler}>
                            Search
                        </Button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default withRouter(FilterPanel);