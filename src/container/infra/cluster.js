
import React, { Component } from 'react';
import { view } from 'react-easy-state';
import { Box, Button } from 'grommet';
import SettingsStore from './../../store/settings'
class Cluster extends Component {
    
    componentDidMount(){
        SettingsStore.Load()
    }
    InitCluster = () => {
        SettingsStore.InitCluster()
    }
    render() {
        if(!SettingsStore.settings){
            return <h1>LOADING</h1>
        }
        if(SettingsStore.settings.cluster){
            return <h1>{SettingsStore.settings.cluster.clusterName}</h1>
        }
        return (
            <Box
                pad="large"
            >
               <h1>Cluster</h1>
                
            <Button onClick={this.InitCluster} label="Create a new cluster"/>
            </Box>

        );
    }
}

export default view(Cluster);



