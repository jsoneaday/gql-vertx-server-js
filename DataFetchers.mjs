import EntityData from './EntityData.mjs';

export class GetUserDataFetcher {
    get(env) {
        const id = env.getArgument("id");
        return EntityData.getUser(id ? id : 0);
    }
}

export class GetTasksDataFetcher {
    get(env) {
        const tasks = EntityData.getTasks();
        console.log("tasks " + tasks);
        return tasks;
    }
}

export class AddTasksDataFetcher {
    get(env) {
        const title = env.getArgument("title") ? env.getArgument("title") : "";
        const desc = env.getArgument("desc");
        const addedTask = EntityData.addTask(title, desc);
        console.log("added task $addedTask");
        return addedTask;
    }
}