import React from 'react';
import { Pagination } from 'carbon-components-react';
import classes from './Pagination.module.css';

const pagination = (props) => {
    return (
        <div className={classes.Pagination}>
            <Pagination
                backwardText='Previous page'
                forwardText='Next page'
                itemsPerPageText='Items per page:'
                page={props.page}
                pageNumberText='Page Number'
                pageSize={props.pageSize}
                onChange={props.changePage}
                pageSizes={[
                    5,
                    10,
                    20,
                    30,
                    40,
                    50
                ]}
                totalItems={props.totalItems}
            />
        </div>
    );
}

export default pagination;
