import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { API_PATH } from "../config/global";
import _ from 'lodash';
import {
    Pagination,
    PaginationItem,
    PaginationLink
} from 'reactstrap';
import { NavLink } from 'react-router-dom';

export class Paginator extends Component {
    render(){
        const view = this.props.items['hydra:view'];
        if (!view) return (<div/>);

        _.each(view,function(value,key,view){
            value = value.replace(API_PATH,'#');
            value = value.replace('?page=','/');
            view[key] = value
        });

        const {'hydra:first': first, 'hydra:previous': previous,'hydra:next': next, 'hydra:last': last} = view;

        return (
            <Pagination size="small">
                <PaginationItem disabled={!previous}>
                    <PaginationLink first="true" href={first}>Pertama</PaginationLink>
                </PaginationItem>
                <PaginationItem disabled={!previous}>
                    <PaginationLink previous href={  previous }/>
                </PaginationItem>
                <PaginationItem disabled={!next}>
                    <PaginationLink next href={ next }/>
                </PaginationItem>
                <PaginationItem disabled={!next}>
                    <PaginationLink last="true" href={ last }>
                        Terakhir
                    </PaginationLink>
                </PaginationItem>
            </Pagination>
        );
    }
}

Paginator.propTypes = {
    items: PropTypes.object.isRequired
};

export default Paginator;