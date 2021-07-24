import React, {useContext, useState, useEffect, useRef} from 'react';
import Realm from 'realm';
import {TaskSchema} from 'schemas/TaskSchema';

interface ITask {
  createTask: (name: string, data: any[], date?: Date) => void;
  deleteTask: (task: any) => void;
  // setTaskStatus: (task: any, status: string) => void;
  tasks: any;
}
const TasksContext = React.createContext({
  createTask: (name: string, data: any[], date?: Date) => {},
  deleteTask: (task: any) => {},
  // setTaskStatus: (task: any, status: string) => {},
  tasks: null,
});

const TasksProvider = ({children}) => {
  const [tasks, setTasks] = useState<any>([]);
  console.log('tasks: ', tasks);

  // Use a Ref to store the realm rather than the state because it is not
  // directly rendered, so updating it should not trigger a re-render as using
  // state would.
  const realmRef: any = useRef(null);

  const onRegister = async () => {
    const config = {
      sync: {
        // user: user,
        // partitionValue: projectPartition,
      },
    };
    // open a realm for this particular project
    Realm.open({
      schema: [TaskSchema.schema, TaskSchema.serviceSchema],
      // sync: {user, partitionValue: new Realm.BSON.ObjectId()},
    })
      .then(projectRealm => {
        console.log('projectRealm: ', projectRealm);
        realmRef.current = projectRealm;
        // projectRealm.deleteAll();
        const syncTasks = projectRealm.objects('Task');
        const tasks = syncTasks.sorted('date', true);
        setTasks([...tasks]);
        tasks.addListener(() => {
          console.log('sortedTasks: ', tasks);
          setTasks([...tasks]);
        });
      })
      .catch(err => {
        console.log('err: ', err);
      });
  };
  useEffect(() => {
    onRegister();
    return () => {
      // cleanup function
      const projectRealm = realmRef.current;
      if (projectRealm) {
        const tasks = projectRealm.objects('Task');
        // Remember to remove the listener when you're done!
        tasks.removeAllListeners();
        projectRealm.close();
        realmRef.current = null;
        setTasks([]);
      }
    };
  }, []);

  const createTask = (name, data, date) => {
    const projectRealm = realmRef.current;
    projectRealm.write(() => {
      // Create a new task in the same partition -- that is, in the same project.
      projectRealm.create(
        'Task',
        new TaskSchema({
          name,
          data,
          date,
        }),
      );
    });
  };

  // const setTaskStatus = (task, status) => {
  //   // One advantage of centralizing the realm functionality in this provider is
  //   // that we can check to make sure a valid status was passed in here.
  //   if (
  //     ![
  //       TaskSchema.STATUS_OPEN,
  //       TaskSchema.STATUS_IN_PROGRESS,
  //       TaskSchema.STATUS_COMPLETE,
  //     ].includes(status)
  //   ) {
  //     throw new Error(`Invalid status: ${status}`);
  //   }
  //   const projectRealm = realmRef.current;

  //   projectRealm.write(() => {
  //     task.status = status;
  //   });
  // };

  // Define the function for deleting a task.
  const deleteTask = id => {
    const projectRealm = realmRef.current;
    projectRealm.write(() => {
      projectRealm.delete({_id: id});
      setTasks([...projectRealm.objects('Task').sorted('name')]);
    });
  };

  // Render the children within the TaskContext's provider. The value contains
  // everything that should be made available to descendants that use the
  // useTasks hook.
  return (
    <TasksContext.Provider
      value={{
        createTask,
        deleteTask,
        // setTaskStatus,
        tasks,
      }}>
      {children}
    </TasksContext.Provider>
  );
};

// The useTasks hook can be used by any descendant of the TasksProvider. It
// provides the tasks of the TasksProvider's project and various functions to
// create, update, and delete the tasks in that project.
const useTasks = (): ITask => {
  const task = useContext<ITask>(TasksContext);
  if (task == null) {
    throw new Error('useTasks() called outside of a TasksProvider?'); // an alert is not placed because this is an error for the developer not the user
  }
  return task;
};

export {TasksProvider, useTasks};
