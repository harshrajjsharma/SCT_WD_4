// Grab DOM elements
const taskInput = document.getElementById('taskInput');
const taskDate = document.getElementById('taskDate');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

// Listen for the Add button click
addBtn.addEventListener('click', addTask);

function addTask() {
    const text = taskInput.value.trim();
    const dateValue = taskDate.value;

    // Prevent adding empty tasks
    if (text === '') {
        alert('Please enter a task!');
        return;
    }

    // Format the date so it looks nice (or show 'No Date Set')
    const formattedDate = dateValue ? new Date(dateValue).toLocaleString() : 'No Date Set';

    // 1. Create the main list item
    const li = document.createElement('li');

    // 2. Create the container for text and date
    const infoDiv = document.createElement('div');
    infoDiv.className = 'task-info';

    const textSpan = document.createElement('span');
    textSpan.className = 'task-text';
    textSpan.innerText = text;

    const dateSpan = document.createElement('span');
    dateSpan.className = 'task-date';
    dateSpan.innerText = formattedDate;

    infoDiv.appendChild(textSpan);
    infoDiv.appendChild(dateSpan);

    // 3. Create the buttons
    const actionsDiv = document.createElement('div');
    actionsDiv.className = 'task-actions';

    const completeBtn = document.createElement('button');
    completeBtn.className = 'btn-complete';
    completeBtn.innerText = 'Complete';

    const editBtn = document.createElement('button');
    editBtn.className = 'btn-edit';
    editBtn.innerText = 'Edit';

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn-delete';
    deleteBtn.innerText = 'Delete';

    actionsDiv.append(completeBtn, editBtn, deleteBtn);

    // 4. Put it all together and add to the screen
    li.append(infoDiv, actionsDiv);
    taskList.appendChild(li);

    // 5. Clear the input fields
    taskInput.value = '';
    taskDate.value = '';

    // --- EVENT LISTENERS FOR THE NEW BUTTONS ---

    // Delete Logic
    deleteBtn.addEventListener('click', () => {
        li.remove();
    });

    // Complete Logic
    completeBtn.addEventListener('click', () => {
        li.classList.toggle('completed'); // Toggles the CSS class on/off
    });

    // Edit Logic
    editBtn.addEventListener('click', () => {
        if (editBtn.innerText === 'Edit') {
            // Turn text into an input field
            const editInput = document.createElement('input');
            editInput.type = 'text';
            editInput.className = 'edit-input';
            editInput.value = textSpan.innerText;
            
            infoDiv.insertBefore(editInput, textSpan);
            infoDiv.removeChild(textSpan);
            
            editBtn.innerText = 'Save';
        } else {
            // Save the new text and turn it back into a span
            const editInput = infoDiv.querySelector('.edit-input');
            textSpan.innerText = editInput.value;
            
            infoDiv.insertBefore(textSpan, editInput);
            infoDiv.removeChild(editInput);
            
            editBtn.innerText = 'Edit';
        }
    });
}