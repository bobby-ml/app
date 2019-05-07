import React, { Component } from 'react';
import { view } from 'react-easy-state';

import ProjectStore from './../../store/project'

import BreadStore from './../../store/breadcrump'
import { Spin, Col, Statistic, Row, Card } from 'antd';
import Plot from 'react-plotly.js';
import Pipeline from './pipeline'




class Dashboard extends Component {
    state = {
        k8s: null,
        cpu: null,

    }
    async componentDidMount() {
        if (!ProjectStore.selected) {
            await ProjectStore.selectProjectbyId(this.props.match.params.id)
        }
        BreadStore.set([{ label: 'Dashboard' }])
        var res = await ProjectStore.GetK8sInfo()
        /* var m = await ProjectStore.GetCpuMonitoring()
         var val = {
             x: [],
             y: [],
         }
         m.data.timeSeries[0].points.forEach((i) => {
             val.x.push(i.interval.startTime);
             val.y.push(i.value.doubleValue)
         })
         console.log(val) */
        this.setState({ ...this.state, k8s: res.data.body })

    }
    render() {

        if (!ProjectStore.selected || this.state.k8s == null) {
            return <Spin></Spin>
        }
        /*var data = [
            {
                x: this.state.cpu.x,
                y: this.state.cpu.y,
                type: 'scatter'
            }
        ];

        var layout = {
            title: 'CPU usage',

            yaxis: {
                range: [0, 0.001],
                type: 'linear',
                autotick: true,
                ticks: '',
                showticklabels: false
            },
            width:500,
            height:300,
            margin: {
                l: 10,
                r: 10,
                b: 50,
                t: 50,
                pad: 4
              },
        }; */
        // <Plot data={data} layout={layout}></Plot>
        return <div>
            <Row  gutter={16}>

                <Col span={12}>
                    <Card title="Deployment" bordered={true}>
                        <Row gutter={16}>
                            <Col span={8}>
                                <Statistic valueStyle={{ color: '#3f8600' }} title="Pods" value={this.state.k8s.status.availableReplicas} suffix={`/ ${this.state.k8s.status.replicas}`} />
                            </Col>
                            <Col span={8}>
                                <Statistic title="Version" value={"v1.2"} />
                            </Col>
                            <Col span={8}>
                                <Statistic title="Up since" value={"2h30min"} />
                            </Col>

                        </Row>

                    </Card>
                </Col>
                <Col span={12}>
                    <Card title="Monitoring" bordered={true}>
                        <Row gutter={16}>
                            <Col span={8}>
                                <Statistic title="Cpu usage" value={12.2} suffix={`%`} />
                            </Col>
                            <Col span={8}>
                                <Statistic title="Ram usage" value={35.4} suffix={`%`} />
                            </Col>
                            <Col span={8}>
                                <Statistic title="Request" value={"36"} suffix={`req/min`} />
                            </Col>
                        </Row>
                    </Card>
                </Col>

            </Row>
            <Row style={{marginTop:"30px"}}>
                <Col span={24}>
                    <Card title="Build" bordered={true}>
                    <Pipeline/>
                    </Card>
                </Col>
            </Row>
        </div>

    }

}

export default view(Dashboard);