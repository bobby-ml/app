

import React, { Component } from 'react';
import { view } from 'react-easy-state';
import GitHub from './../store/github';
import Project from './../store/project';

import { Link } from "react-router-dom";
import { Spin, List, Card,Breadcrumb, Button } from 'antd';
class Projects extends Component {
    state = {
        project: ''
    }

    render() {
        if (!Project.loaded) {
            return <Spin size="large"></Spin>
        }
        
        return (
            <div>
                 <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Project</Breadcrumb.Item>
            </Breadcrumb>
            <List
                rowKey={(i)=>i.id}
                grid={{
                    gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3,
                }}
                dataSource={Project.list}
                renderItem={item => (
                    <List.Item>
                        <Link to={`/projects/${item.id}` }>
                        <Card title={item.name} hoverable={true}>
                            <p>Hostname:  {item.hostname}</p>
                        </Card>
                        </Link>
                    </List.Item>
                )}
            />
            <Button><Link to={"/newproject"} >Add a new one</Link></Button>
            </div>
        );
    }
}

export default view(Projects);
