import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Link, withRouter } from "react-router-dom";
import UserStore from './store/user'
import ProjectStore from './store/project'
import { view } from 'react-easy-state'
import pipeline from './container/project/pipeline';
import projectSettings from './container/project/settings';
import settings from './container/settings';
import job from './container/project/job';
import projects from './container/project'
import dashboard from './container/project/dashboard';
import cluster from './container/infra/cluster';
import breadStore from './store/breadcrump';
import newproject from './container/newproject';

import "antd/dist/antd.css";
import "./App.css"
import { Layout, Menu, Button, Icon, Spin, Breadcrumb, Avatar } from 'antd';

const { SubMenu } = Menu;
const {
  Header, Footer, Sider, Content,
} = Layout;



function Index() {
  return <h2>Home</h2>;
}


function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>

        UserStore.isLogin ? (
          <Component {...props} />
        ) : (
            <Redirect
              to={{
                pathname: "/",
              }}
            />
          )
      }
    />
  );
}



class MenuContainer extends Component {
  LoginClick = (event) => {
    UserStore.login()
  }
  render() {
    const location  = this.props.location.pathname
    var n = location.split('/')[1]
    return <Menu
      mode="horizontal"
      theme="dark"
      defaultSelectedKeys={[n]}
      style={{ lineHeight: '64px', marginLeft: '10%' }}
    >
      <Menu.Item key="projects"><Link to={"/projects"}>Projects</Link></Menu.Item>
      <Menu.Item key="infra"><Link to={"/infra"}>Infrastructure</Link></Menu.Item>
      <Menu.Item key="settings">Settings</Menu.Item>
      <Menu.Item style={{ float: "right" }} key="4"> {!UserStore.isLogin ?
        <Button
          type="primary"
          onClick={this.LoginClick}
        >Login with github </Button> :

        <Link to={'/settings'}> <Button
          type="primary"
          label={UserStore.email}
        > Logout </Button> </Link>}</Menu.Item>
    </Menu>
  }
}

var Toto = withRouter(MenuContainer)

class App extends Component {
  

  async componentDidMount() {
    await UserStore.init()

  }

  render() {
    if (UserStore.isLoading) {
      return <Spin></Spin>
    }



    return (
      <Router>
        <Layout className="layout">
          <Header>
            <div className="logo">
              <img style={{ width: "inherit" }} src="/images/logo.svg" />
            </div>
            <div style={{ marginLeft: "5%" }}>
            <Toto/>
            </div>
          </Header>
          <Layout>
            {ProjectStore.selected ?
              <Sider width={65} style={{ background: '#fff' }}>
                <Avatar style={{ verticalAlign: 'middle', margin: "10px 0px 10px 14px" }} size="large">
                  T
                    </Avatar>
                <Menu
                  mode="inline"
                  defaultSelectedKeys={["1"]}
                  style={{ height: '100%', borderRight: 0 }}
                >
                  <Menu.Item key="1">
                    <Link to={`/projects/${ProjectStore.selected.id}`}><Icon style={{ fontSize: "20px" }} type="home" /></Link>
                  </Menu.Item>
                  <Menu.Item key="2">
                    <Link to={`/projects/${ProjectStore.selected.id}/pipeline/`}><Icon style={{ fontSize: "20px" }} type="build" /></Link>
                  </Menu.Item>
                  <Menu.Item key="3">
                    <Link to={`/projects/${ProjectStore.selected.id}/settings`}><Icon style={{ fontSize: "20px" }} type="setting" /></Link>
                  </Menu.Item>

                </Menu>
              </Sider> : null
            }
            <Layout style={{ padding: '0 24px 24px' }}>
              < Breadcrumb style={{ margin: '16px 0' }}>
                {breadStore.paths.map((path) => {
                  return <Breadcrumb.Item>{path.target? <Link to={path.target}>{path.label}</Link> : <span>{path.label}</span>} </Breadcrumb.Item>
                })}

              </Breadcrumb>
              <Content style={{
                background: '#fff', padding: 24, margin: 0, minHeight: 280,
              }}
              >
                <Route path="/" exact component={Index} />
                <PrivateRoute path="/projects" exact component={projects} />
                <PrivateRoute path="/projects/:id" exact component={dashboard} />
                <PrivateRoute path="/projects/:id/pipeline" exact component={pipeline} />
                <PrivateRoute path="/projects/:id/settings" exact component={projectSettings} />
                <PrivateRoute path="/projects/:id/pipeline/:jobId" exact component={job} />
                <PrivateRoute path="/newproject" exact component={newproject} />
                <PrivateRoute path="/settings" exact component={settings} />
                <PrivateRoute path="/infra" exact component={cluster} />
              </Content>
            </Layout>


          </Layout>
          <Footer style={{ textAlign: 'center' }}>
            ©2019  Bobby Team
           </Footer>

        </Layout>

      </Router >)

  }
}

export default view(App);
