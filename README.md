Instructions on how to run app locally.

1. Download the project , unzip the file and open in visual studio code or any other editor.
2. Run npm install for installing the required dependencies.
3. Compile using command npm start or ng serve.


Flow of application.

On hitting the app URL, user will be redirected to homepage screen.
There we have two options : one link for create new task and other one for assign task.

Creation and view of tasks:

For creating task to user, user has to click the plus icon next to label "Create Task" . On clicking the icon, create new task form will open where user 
has to fill the required fields and click on "Create Task" button.

Note : In the create form , the "Message" field is mandatory. Other fields are optional.

After creation of task , user will get a confirmation message on the right corner indicating the task has been created successfully.
Also , user will be able to see the details of task created in a table.


Update tasks:

In the table below , an edit icon will appear where user need to click in order to update task.
On clicking edit icon , edit form where user can update any field and click on update button. Once user clicks on update button , a confirmation message will appear that the task is updated successfully.

Delete Task:

User has to click the checkbox available on each row of table and click on delete icon on the top left corner of table.
Note: Initially , delete will be disabled. Once any one checkbox is selected , the delete icon will be enabled.

Assign Task to User:

User has to click on Assign Task icon on top of page . On clicking icon , one popup will appear where user will be given the option to select task id and user name in dropdowns. User can select the same and click on assign button. On button click, the selected task id will be assigned to the selected user and the same will be shown on table.

In table, for each page only 5 records will show. In case of more records, user has the option to use table pagination on bottom of the table. Also , next to pagination , user can select how many records he/she wants to see per page.
