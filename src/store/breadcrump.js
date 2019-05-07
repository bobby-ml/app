

import { store } from 'react-easy-state'
import ProjectStore from './project'

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

const BreadStore = store({
  paths:[],
  set(paths){
    var res = []
    if(ProjectStore.selected){
        res.push({target:"/projects/" + ProjectStore.selected.id, label:ProjectStore.selected.name.split("/")[1].capitalize()})
    }
    BreadStore.paths = [...res, ...paths] 
  }
})


export default BreadStore