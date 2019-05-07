
import { Select, Box, Button, Layer } from 'grommet';
import React, { Component } from 'react';
import { view } from 'react-easy-state';
import NewProject from './../container/newproject'
import ProjectStore from './../store/project'

import { Redirect } from 'react-router'

class MenuProjectList extends Component {
    state = {
        show: false,
        projects: [],
        redirect: "",
        allReady: false,
    }
    setShow = (v) => {
        this.setState({ ...this.state, show: v })
    }
    onChange = (v) => {
        if (v.option == 'Create a new one') {
            this.setState({ ...this.state, show: true })
        } else {
            ProjectStore.selectProject(v.option)
            this.setState({ ...this.state, redirect: "/projects/" + ProjectStore.selected.id + '/' })
        }
    }

    componentDidUpdate() {
        if (this.state.redirect != '') {
            this.setState({ ...this.state, redirect: '' })
        }
    }
    
    render() {
        if (this.state.redirect != '') {
            return <Redirect to={this.state.redirect} />

        }
        return (

            <div>
                <Box>
                    {this.state.show && (
                        <Layer
                            onEsc={() => this.setShow(false)}
                            onClickOutside={() => this.setShow(false)}
                        >
                            <NewProject></NewProject>
                        </Layer>
                    )}
                </Box>
                <Select
                    options={[...ProjectStore.list.map((i) => i.name), 'Create a new one']}
                    onChange={this.onChange}
                    value={ProjectStore.selected ? ProjectStore.selected.name : ''}
                    placeholder='Choose a project ....'
                />
            </div>)
    }
}

export default view(MenuProjectList)