import React, { Component } from 'react';
import { view } from 'react-easy-state';
import ProjectStore from './../../store/project';
import { ClipLoader } from 'react-spinners';

import BreadStore from './../../store/breadcrump'
import { Collapse, Form,Input, Button } from 'antd';

const Panel = Collapse.Panel;
class Settings extends Component {
    async componentDidMount() {
        if (!ProjectStore.selected) {
            await ProjectStore.selectProjectbyId(this.props.match.params.id)
        }
        BreadStore.set([{ label: "Settings" }])
    }

    async saveIngress(e) {
        e.preventDefault()
        await ProjectStore.setHostname(e.target.hostname.value)
    }
    render() {
        if (!ProjectStore.selected) return <ClipLoader />
        return (
            <Collapse defaultActiveKey={['1']}>
                <Panel header="Deployment parameters" key="1">
                    <div style={{paddingLeft:"15%", paddingRight:"15%"}} >
                    <p>
                        If you want to deploy on a public website your repository please fil the form 
                    </p>
                    <Form layout="vertical" onSubmit={this.saveIngress}>
                        <Form.Item label="URLs">
                        <Input defaultValue={ProjectStore.selected.hostname} type="text" />
                        </Form.Item>
                        <Button className={"push"} type="primary" htmlType="submit">Save</Button>
                    </Form>
                    </div>
                   

                </Panel>
                <Panel header="Build configuration" key="2">

                </Panel>
                <Panel header="Another operation" key="3">

                </Panel>
            </Collapse>)


    }

}

export default view(Settings);