import {TaskStateType} from '../App';
import {
    AddTaskAC,
    ChangeTaskStatusAC,
    ChangeTaskTitleAC,
    RemoveTaskAC, RemoveTodolistAC,
    tasksReducer
} from './tasksReducer';
import {AddTodolistAC} from './todolistsReducer';

let startState: TaskStateType
beforeEach(()=> {
    startState = {
        "todolistId1": [
            { id: "1", title: "CSS", isDone: false },
            { id: "2", title: "JS", isDone: true },
            { id: "3", title: "React", isDone: false }
        ],
        "todolistId2": [
            { id: "1", title: "bread", isDone: false },
            { id: "2", title: "milk", isDone: true },
            { id: "3", title: "tea", isDone: false }
        ]
    };
})


test('correct task should be deleted from correct array', () => {

    const action = RemoveTaskAC("todolistId2","2");

    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        "todolistId1": [
            { id: "1", title: "CSS", isDone: false },
            { id: "2", title: "JS", isDone: true },
            { id: "3", title: "React", isDone: false }
        ],
        "todolistId2": [
            { id: "1", title: "bread", isDone: false },
            { id: "3", title: "tea", isDone: false }
        ]
    });

});

test('correct task should be added to correct array', () => {

    const action = AddTaskAC("todolistId2", "juce");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe("juce");
    expect(endState["todolistId2"][0].isDone).toBe(false);

});

test('status of specified task should be changed', () => {

    const action = ChangeTaskStatusAC("todolistId2","2", false);

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][2].isDone).toBe(false);
});

test('title of specified task should be changed', () => {

    const action = ChangeTaskTitleAC("todolistId1","2", 'TS/JS');

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"][1].title).toBe('TS/JS');
});

test('new array should be added when new todolist is added', () => {


    const action = AddTodolistAC("new todolist");

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }
    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});

test('property with todolistId should be deleted', () => {

    const action = RemoveTodolistAC('todolistId2')

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
})
