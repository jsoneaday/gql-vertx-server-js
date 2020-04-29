import User from './User.mjs';
import Task from './Task.mjs';


export default class EntityData {
    static get users() {
        return [
            new User(1, "jon"),
            new User(2, "tim"),
            new User(3, "ronny"),
            new User(4, "linda"),
            new User(5, "pam"),
            new User(6, "sam")
        ];
    }
    static get tasks() {
        return [
            new Task(1, "Pick up groceries", ""),
            new Task(2, "Pick up kids", ""),
            new Task(3, "Meet chris", "")
        ]
    } 

    static getUser(id) {
    return users.find(usr => { 
      println("query id $id and user $usr")
      return usr.id == id
    })
  }

  static getTasks() {
    println("all tasks" + tasks)
    return tasks
  }

  static addTask(title, desc) {
    const newTask = Task(tasks.last().id + 1, title, desc)
    tasks.add(newTask)
    return newTask
  }
}
