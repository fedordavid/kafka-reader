import React, { useState, useEffect } from 'react';
import Pagination from '../Pagination/Pagination';
import KafkaDataTable from '../KafkaDataTable/KafkaDataTable';
import axiosInstance from './../../axios-instance';
import Spinner from '../UI/Spinner/Spinner';
import * as dayjs from 'dayjs'
var utc = require('dayjs/plugin/utc')
var tz = require('dayjs/plugin/timezone')
var isSameOrBefore = require('dayjs/plugin/isSameOrBefore')
dayjs.extend(utc);
dayjs.extend(tz);
dayjs.extend(isSameOrBefore)

const paginationDefaults = {
    pageSize: 10,
    page: 1,
    totalItems: 0
}

const KafkaMessages = (props) => {

    const [rowData, setData] = useState([]);
    const [pagination, setPagination] = useState(paginationDefaults);
    const [loadingData, setLoadingData] = useState(true);

    useEffect(() => {

        const filter = props.filter
        //alert(props.filter)
        // here we have to react on the changed route path e.g. messages?filter.... to request data
        // if we have filter object
        //${filter}

        const queryParams = []

        for (let i in filter) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(filter[i]));            
        }

        // pagination tbd> parametrization
        // const pagination = '&order=ASC&page=1&perPage=10sort=id'

        let queryString = (queryParams.join('&'));
        //console.log("useEffect in KafkaMessage", props)

        //&order=ASC&page=${pagination.page}&perPage=${pagination.pageSize}&sort=id
            axiosInstance.get('/message?' + queryString)
            .then(response => {        
                setPagination({page: pagination.page, pageSize: pagination.pageSize, totalItems: response.headers["x-total-count"]});
                setData(response.data);
                setLoadingData(false)
            })
            .catch(() => {
                setLoadingData(false)
            })
    }, [pagination.page, pagination.pageSize, props.filter])

    //const start = (pagination.page -1) * pagination.pageSize;
    //const pageData = rowData.slice(start, start + pagination.pageSize);
    const pageData = rowData;

    const onChangeHandler = (e) => {
        setPagination({ pageSize: e.pageSize, page: e.page })
        //console.log("setPaginationOnChange", pagination)
    }

    let dataTable = <Spinner />

    let ISO_RAW = dayjs().format();
    let ISO_RAW2 = dayjs().toISOString();
    
    if (!loadingData) {
        dataTable = 
            <>
            <strong>Dates:</strong> <br />
            {ISO_RAW} / {ISO_RAW2}  <br /><br />

            <strong>Filter (FP):</strong> <br />
                    {JSON.stringify(props.filter)}<br /><br />
             <KafkaDataTable data={pageData} />
             <Pagination
                changePage={onChangeHandler}
                totalItems={pagination.totalItems}
                pageSize={pagination.pageSize}
                page={pagination.page} />
            </>
}

    return (
        <>
        {dataTable}
        </> 
    )

}
export default KafkaMessages;
