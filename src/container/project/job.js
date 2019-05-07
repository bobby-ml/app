import React, { Component } from 'react';
import { view, store } from 'react-easy-state';
import ProjectStore from './../../store/project'
import BreadStore from './../../store/breadcrump'
import UserStore from './../../store/user'
import app from './../../store/firebase'

import { PageHeader } from 'antd';

const jobStore = store({
    Loaded: false,
    Logs: [],
    async LoadLogs(JobId) {
        var res = []
        const db = app.firestore();
        var data = await db.collection('logs').where("owner_uid", "==", UserStore.uid).where("job_id", "==", JobId).orderBy('creation_time').get()
        data.docs.forEach((doc) => {
            res.push({ ...doc.data(), id: doc.id })
        })
        jobStore.Logs = res
        jobStore.Loaded = true
    }
})


class Job extends Component {
    async componentDidMount() {
        if (!ProjectStore.selected) {
            await ProjectStore.selectProjectbyId(this.props.match.params.id)
        }
        jobStore.LoadLogs(this.props.match.params.jobId)
        BreadStore.set([{ target: "/projects/" + ProjectStore.selected.id, label: 'Dashboard' }, { label: "Pipelines", target: "/projects/" + ProjectStore.selected.id + "/pipeline/" }, { label: "Job-" + this.props.match.params.id }])
    }
    render() {
        if (!jobStore.Loaded) {
            return <h1>Loading logs</h1>
        }
        return <div>
            <PageHeader
                backIcon={false}
                title="Job detail"
                subTitle="There is still work to do there"
            />
            <div class="logs">
                {jobStore.Logs.map((l) => {
                    return <p style={{ whiteSpace: 'pre-line' }}>{l.data} </p>
                })}
            </div>

        </div>
    }

}



export default view(Job);