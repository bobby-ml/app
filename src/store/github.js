
import { store } from 'react-easy-state'
import GitHub from 'github-api'
const github = store({
    token: '',
    repositories: [],
    me: null,
    setToken(token) {
        github.token = token
        var gh = new GitHub({
            token: github.token
        });
        github.me = gh.getUser(); // no user specified defaults to the user for whom credentials were provided

    },
    getRepo() {
        github.me.listRepos(function (err, repo) {
            github.repositories = repo
        });
    },
    clear() {
        github.token = ''
    },
    async initProject(name) {
        console.log(name)
        var gh = new GitHub({
            token: github.token
        });
        var [username, name] = name.split('/')
        var r = gh.getRepo(username, name);
        await r.createHook({
            config: {
                url: "https://toto.com/trigger",
                content_type: "json",
                insecure_ssl: 1
            }
        })
    }
})


export default github