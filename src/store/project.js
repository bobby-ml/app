
import { store } from 'react-easy-state'
import app from './firebase'
import UserStore from './user'
const db = app.firestore();

const projects = store({
    list: [],
    selected: null,
    loaded: false,
    
    async create(project) {
        var p = {
            ...project,
            owner_uid: UserStore.uid
        }
        const projectRef = await db.collection('projects').add({
            ...project,
            owner_uid: UserStore.uid
        });
        p.id = projectRef.id
        projects.list.push(p)
    },
    selectProject(projectName) {
        projects.selected = projects.list.find((i) => projectName == i.name)
    },
    async selectProjectbyId(id) {
        console.log("LOAD 2")
        if (!projects.loaded) {
            await projects.GetProjects()
            projects.selected = projects.list.find((i) => id == i.id)
        }
        projects.selected = projects.list.find((i) => id == i.id)
    },
    async GetProjects() {
        projects.list = [];
        var data = await db.collection('projects').where("owner_uid", "==", UserStore.uid).get()
        data.docs.forEach((doc) => {
            var d = doc.data()
            projects.list.push({ ...d, id: doc.id })
        })
        projects.loaded = true
    },
    async GetJobs() {
        var result = [];
        var data = await db.collection('jobs').where("owner_uid", "==", UserStore.uid).where("project", "==", projects.selected.name).limit(100).orderBy('creation_time', 'desc').get()
        data.docs.forEach((doc) => {
            result.push({ ...doc.data(), id: doc.id })
        })
        return result
    },
    async setHostname(hostname) {
        await db.collection("projects").doc(projects.selected.id).update({
            hostname: hostname
        });
        projects.selected.hostname = hostname;
        var ingress = app.functions().httpsCallable('ingressV1');
        ingress({});
    },
    async GetK8sInfo(){
        var init = app.functions().httpsCallable('podInfoV1');
        var res = await init({project:projects.selected.id})
        console.log(res)
        return res
    },
    async GetCpuMonitoring(){
        var init = app.functions().httpsCallable('monitoringV1');
        var res = await init({project:projects.selected.id})
        console.log(res)
        return res
    }


    
})


export default projects