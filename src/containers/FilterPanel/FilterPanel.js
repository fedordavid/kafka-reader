import React, { useReducer } from 'react';
import classes from './FilterPanel.module.css';
import DateTimeRangeSelector from './DateTimeRangeSelector/DateTimeRangeSelector';
import TopicDropDown from '../../components/UI/DropDown/DropDown';
import InputTextField from '../../components/UI/InputTextField/InputTextField';
import Button from '../../components/UI/ButtonElement/ButtonElement';
import * as dayjs from 'dayjs'
import { withRouter } from 'react-router-dom'

var utc = require('dayjs/plugin/utc')
var tz = require('dayjs/plugin/timezone')
var isSameOrBefore = require('dayjs/plugin/isSameOrBefore')
dayjs.extend(utc);
dayjs.extend(tz);
dayjs.extend(isSameOrBefore)

const topicDropDownItems = ['dpcm-consents', 'dpcm-purposes']
const dateRangeDropDownItems = ['Start Date', 'End Date', 'Modify Date', 'Create Date']

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
        from: dayjs(state?.from || dayjs())
            .hour(state?.fromHour || 0)
            .minute(state?.fromMinute || 0)
            .second(state?.fromSecond || 0)
            .format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
        to: dayjs(state?.to || dayjs())
            .hour(state?.toHour || 23)
            .minute(state?.toMinute || 59)
            .second(state?.toSecond || 59)
            .format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
        isDisabled: isDisabled,
        isDateTimesValid: !dayjs((state?.from) || dayjs())
            .hour(state?.fromHour || 23)
            .minute(state?.fromMinute || 59)
            .second(state?.fromSecond || 59)
            .isSameOrBefore((dayjs(state?.to) || dayjs())
                .hour(state?.toHour || 23)
                .minute(state?.toMinute || 59)
                .second(state?.toSecond || 59)),
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
                topic: topicDropDown.selectedItem ? topicDropDown.selectedItem : topicDropDown.initialSelectedItem,
                date_type: dateRangeDropDown.selectedItem ? dateRangeDropDown.selectedItem : dateRangeDropDown.initialSelectedItem,
                date_time_from: dateTimeRange.from,                 
                date_time_to: dateTimeRange.to, 
                json: searchBar.text
            }
        }
        console.log("searchButtonClickFilter",filter)

        const queryParams = []

        for (let i in filter) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(JSON.stringify(filter[i]), null, 0));
        }

        const queryString = queryParams.join('&');

        props.history.replace({
            pathname: '/messages/search/filter',
            search: '?' + queryString + `&order=ASC&page=1&perPage=10&sort=id`
        })
    }

    function setFilterPanelValues() {

        let topic = undefined;
        let date_type = undefined;
        let searchText = undefined;
        let date_time_from = undefined;
        let date_time_to = undefined;
        let date_time_from_hour = undefined;
        let date_time_from_minute = undefined; 
        let date_time_from_second = undefined; 
        let date_time_to_hour = undefined;
        let date_time_to_minute = undefined; 
        let date_time_to_second = undefined; 

        let filter = undefined

        try {
            filter = JSON.parse(props.filter.filter)
        } catch {

        }

        if (filter !== undefined) {

            // topicDropDown
            if (filter?.topic && filter?.topic !== undefined) {
                topic = filter.topic
            }

            // dateDropDown
            if (filter?.date_type && filter?.date_type !== undefined) {
                date_type = filter.date_type
            }

            // searchText
            if (filter?.json && filter?.json !== undefined) {
                searchText = filter.json
            }

            // date_time_from
            if (filter?.date_time_from && filter?.date_time_from !== undefined) {
                date_time_from = dayjs.utc(filter.date_time_from)
                date_time_from_hour = dayjs(date_time_from).hour()
                date_time_from_minute = dayjs(date_time_from).minute()
                date_time_from_second = dayjs(date_time_from).second()
            }

            // date_time_to
            if (filter?.date_time_to && filter?.date_time_to !== undefined) {
                date_time_to = dayjs.utc(filter.date_time_to)
                date_time_to_hour = dayjs(date_time_to).hour()
                date_time_to_minute = dayjs(date_time_to).minute()
                date_time_to_second = dayjs(date_time_to).second()
            }
        }

        let result = {
            topic: topic,
            date_type: date_type,
            searchText: searchText,
            date_time_from: date_time_from,
            date_time_to: date_time_to,
            date_time_to_hour: date_time_to_hour,
            date_time_to_minute: date_time_to_minute,
            date_time_to_second: date_time_to_second,
            date_time_from_hour: date_time_from_hour,
            date_time_from_minute: date_time_from_minute,
            date_time_from_second: date_time_from_second
        }
        return result
    }

    const filterValues = setFilterPanelValues();
    const topicDropDown = useTopicDropDown({}, filterValues.topic);
    const dateRangeDropDown = useDateRangeDropDown({}, topicDropDown.isDisable, filterValues.date_type);
    const dateTimeRange = useDateTimeRange(
        {
            from: filterValues.date_time_from,
            to: filterValues.date_time_to,
            toHour: filterValues.date_time_to_hour,
            toMinute: filterValues.date_time_to_minute,
            toSecond: filterValues.date_time_to_second,
            fromHour: filterValues.date_time_from_hour,
            fromMinute: filterValues.date_time_from_minute,
            fromSecond: filterValues.date_time_from_second
        }, 
        dateRangeDropDown.isDateRangeDisabled, 
        );
    const searchBar = useSearchBar({}, dateTimeRange.isDisabled || dateTimeRange.isDateTimesValid, filterValues.searchText);
    
    return (
        <div className={classes.FilterPanel}>
            <div>
                 <TopicDropDown
                    dropDownValues={topicDropDown} />
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