

import React, { Component } from 'react';
import { view } from 'react-easy-state';
import GitHub from './../store/github'
import Project from './../store/project'
import { Steps, Select, Form,Button } from 'antd';

const Step = Steps.Step;
const Option = Select.Option;

class NewProject extends Component {
    state = {
        project: ''
    }
    componentDidMount() {
        GitHub.getRepo()
    }
    OnSubmit = async (e) => {
        e.preventDefault()
        await GitHub.initProject(this.state.project)
        await Project.create({ name: this.state.project })
    }
    onChange = (value) => {
       this.setState({...this.state, project: value})
    }

    

    render() {
        return (
            <div>
                <Steps direction="horizontal" current={0}>
                    <Step title="Select" description="Pick you github repo" />
                    <Step title="In Progress" description="This is a description." />
                    <Step title="Waiting" description="This is a description." />
                </Steps>
                <Form onSubmit={this.OnSubmit} style={{margin:"20px", padding:"20px"}}>
                <Form.Item label="Github repository">
                    <Select
                        showSearch
                        style={{ width: 200 }}
                        placeholder="Select a repo"
                        optionFilterProp="children"
                        onChange={this.onChange}
                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                    {GitHub.repositories.map((r)=>{
                        var n = r.owner.login + "/" + r.name;
                        return  <Option value={n}>{n}</Option>
                    })}
                      
                    </Select>
                    </Form.Item>
                    <Button onClick={this.SaveSa} type="primary"  htmlType="submit" >Next</Button>
                </Form>

            </div>

        );
    }
}

export default view(NewProject);
