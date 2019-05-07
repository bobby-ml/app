import React, { Component } from 'react';
import { view } from 'react-easy-state';
import { Box, Tab, Tabs, Form, FormField, Button, TextArea } from 'grommet';
import SettingsStore from './../store/settings';
import { Link } from "react-router-dom";

class Project extends Component {
    state = {
        sa: ""
    }
    SaveSa = () => {
        SettingsStore.SaveGcpAccount(this.state.sa)
        this.setState({ sa: "" })
    }
    InitCluster = () => {
        SettingsStore.InitCluster()
    }

    render() {

        return (
            <Box
                pad="large"
            >
                 <Link to={`/settings/cluster`}> Cluster </Link> 
                <Tabs>
                    <Tab title="Cluster">
                        <Box pad="medium">
                            <Button onClick={this.InitCluster} primary label="Init cluster" />
                        </Box>
                    </Tab>
                    <Tab title="Google cloud Service Account">
                        <Box width="large" pad="medium">
                            <Form>
                                <FormField name="sa" label="Service account">
                                    <TextArea
                                        placeholder="Json service account"
                                        value={this.state.sa}
                                        onChange={event => this.setState({ ...this.state, sa: event.target.value })}
                                    />
                                </FormField>
                                <Button onClick={this.SaveSa} type="submit" primary label="Submit" />
                            </Form>
                        </Box>
                    </Tab>

                </Tabs>
            </Box>

        );
    }
}

export default view(Project);
