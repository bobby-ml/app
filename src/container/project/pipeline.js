import React, { Component } from 'react';
import { view } from 'react-easy-state';
import ProjectStore from './../../store/project'
import BreadStore from './../../store/breadcrump'
import { Link } from "react-router-dom";

import { Table, Tag } from 'antd';
import { cpus } from 'os';
const { Column, ColumnGroup } = Table;
class Pipeline extends Component {
    state = {
        jobs: [],
        jobDetail: null,
    }
    async componentDidMount() {
        if (!ProjectStore.selected) {
            await ProjectStore.selectProjectbyId(this.props.match.params.id)
        }

        ProjectStore.GetJobs().then((res) => {
            this.setState({ ...this.state, jobs: res })
        })
        BreadStore.set([ {label:"Pipelines"}])
    }
    render() {
        
        return (
            <Table dataSource={this.state.jobs} rowKey="id">
                <Column
                    title="Status"
                    dataIndex="status"
                    render={(status,record) => {
                        var color = null;
                        switch (status) {
                            case 'success':
                                color = 'green'
                                break;
                            case 'fail':
                                color = 'red'
                                break;
                            case 'running' :
                                color = 'blue'
                                break;
                        }
                        return<Link to={record.id}><Tag style={{cursor: "pointer"}} color={color}>{status.toUpperCase()}</Tag></Link>
                    }}     
                />
                 <Column
                    title="Branch"
                    dataIndex="branch"
                />
                  <Column
                    title="Commit"
                    dataIndex="commit"
                    render={commit => {
                        return <span>{commit.id.substring(0,8)}...</span>
                    }}
                />
                <Column
                    title="Message"
                    dataIndex="commit.message"
                    render={message => {
                        return <span>{message}</span>
                    }}
                />
                <Column
                    title="Date"
                    dataIndex="creation_time"
                    render={time => {
                        return <span>{new Date(time.seconds * 1000).toDateString()}</span>
                    }}
                />


            </Table>
        );
    }
}

export default view(Pipeline);
