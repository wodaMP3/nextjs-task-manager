

export const fetchTasks = async () => {
    const response = await fetch('/api/tasks', {method: 'GET'});
    return response.json();
};

export const addTask = async (task: {title: string; description: string }) => {
    const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task),
    });
    return response.json();
};

export const deleteTask = async (id: number) => {
    const respone = await fetch('/api/tasks', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id }),
    });
    return respone;
};



