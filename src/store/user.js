

import { store } from 'react-easy-state'

import app from './firebase'
import githubStore from './github'
import ProjectStore from './project'
import axios from 'axios'
const db = app.firestore();

async function Wait(token, operation){
    return new Promise((resolve,reject )=>{
        var interval = ""
        interval = setInterval(async ()=>{
            var status = await axios.get(` https://cloudresourcemanager.googleapis.com/v1/${operation}`,
            {
                headers: { Authorization: "Bearer " + token }
            })
            if(status){
                clearInterval(interval);
                resolve()
            }
        })

    })
}


const user = store({
    email: '',
    isLogin: false,
    isLoading: true,
    uid: '',
    logout() {
        user.email = '';
        user.isLogin = false;
        app.auth().signOut();
        githubStore.clear();
        localStorage.clear()
    },
    login() {
        user.isLoading = true
        var provider = new app.auth.GithubAuthProvider();
        provider.addScope('repo');
        app.auth().signInWithPopup(provider).then(function (result) {
            user.email = result.user.email
            user.isLogin = true
            user.uid = result.user.uid
            githubStore.setToken(result.credential.accessToken);
            localStorage.setItem('gtoken', result.credential.accessToken);
            user.isLoading = false
            // basic auth

        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            if (errorCode === 'auth/account-exists-with-different-credential') {
                alert('You have signed up with a different provider for that email.');
                // Handle linking here if your app allows it.
            } else {
                console.error(error);
            }
        });

    },
  
    init() {
        user.isLoading = true
        app.auth().onAuthStateChanged(function (userResult) {
            if (userResult) {
                user.uid = userResult.uid
                user.email = userResult.email
                user.isLogin = true
                user.isLoading = false
                githubStore.setToken(localStorage.getItem('gtoken'));
                ProjectStore.GetProjects()
            } else {
                user.isLogin = false
                user.isLoading = false
            }
        });

    }
})


export default user