
import { store } from 'react-easy-state'
import UserStore from './user'
import app from './firebase'
import { load } from 'js-yaml';
const db = app.firestore();

const settings = store({
    settings:null,
    async SaveGcpAccount(sa) {
        var p = {
            SA: sa,
            owner_uid: UserStore.uid
        }
        const projectRef = await db.collection('settings').add({
            ...p
        });
    },
    async InitCluster(sa) {
        var init = app.functions().httpsCallable('initV1');
        init({}).then(function (result) {
            debugger;
        });
    },
    async Load(){
        var snap = await db.collection('settings').where("owner_uid", "==", UserStore.uid).limit(1).get()
        snap.forEach((i) => {
           settings.settings  = {...i.data(), id: i.id}
        })
    }
})


export default settings