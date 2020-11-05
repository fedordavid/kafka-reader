import React, { useState, useEffect } from 'react';
import Pagination from '../Pagination/Pagination';
import KafkaDataTable from '../KafkaDataTable/KafkaDataTable';
import axiosInstance from './../../axios-instance';
import Spinner from '../UI/Spinner/Spinner';
import { withRouter } from 'react-router-dom';

const KafkaMessages = (props) => {

    const [rowData, setData] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [loadingData, setLoadingData] = useState(false);

       useEffect(() => {        
        if (props.filter !== undefined) {
            
            let queryString = new URLSearchParams(props.location.search) 

            setLoadingData(true)
                axiosInstance.get('/message?' + queryString) 
                    .then(response => {      
                        setData(response.data);   
                        setTotalItems(parseInt(response.headers["x-total-count"]))    
                    })
                    .finally(() => {
                        setLoadingData(false)
                    })
            console.log("after clic search, loading data")
        }
    }, [props.location.search])

    const onChangeHandler = (e) => {
        let queryParams = new URLSearchParams(props.location.search);
        
        queryParams.set("page", e.page);
        queryParams.set("perPage", e.pageSize);

        props.history.push({
                pathname: '/messages/search/filter',
                search: '?' + queryParams.toString()
            })
    }

    let dataTable = <Spinner />

    if (!loadingData) {
        dataTable = 
            <>
             <KafkaDataTable data={rowData} />
             <Pagination
                changePage={onChangeHandler}
                totalItems={totalItems}
                pageSize={parseInt(new URLSearchParams(props.location.search).get("perPage"))}
                page={parseInt(new URLSearchParams(props.location.search).get("page"))} />
            </>
}

    return (
        <>
        {dataTable}
        </> 
    )

}
export default withRouter(KafkaMessages);
