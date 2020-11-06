import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  MessageMaxLength = 200;
  apiBaseUrl = "https://devza.com/tests/tasks";
  invokeClickAction: Subject<any> = new Subject();
  getTaskIds=[];

  constructor(private http:HttpClient) { }

   /**
   * @name createTask
   * @desc save newly created task
   * @param data  data to save
   * @returns {Observable}
   */
  createTask(data) {  
    var formData: FormData = new FormData();
    formData.append('message',data[0].message);
    formData.append('due_date',data[0].due_date);
    formData.append('priority',data[0].priority);
    formData.append('assigned_to',data[0].assigned_to);
    return this.http.post(this.apiBaseUrl + "/create" , formData, {
      headers: new HttpHeaders({
        'AuthToken': 'MMPIUq9bM8zRUFDWzc7XMMGt8jix38q9',
        "Accept": "application/json" 
      })
    })
  }

  /**
   * @name getAllTasks
   * @desc api for fetching all created tasks
   * @returns {Observable}
   */

  getTasks() {
    return this.http.get(this.apiBaseUrl + "/list",{
      headers: new HttpHeaders({
        'AuthToken': 'MMPIUq9bM8zRUFDWzc7XMMGt8jix38q9'
      })
    })
  }

  /**
   * @name update task
   * @desc api for updating tasks
   * @returns {Observable}
   */

   updateTask(data) {
    var formData: FormData = new FormData();
    formData.append('taskid',data[0].taskid);
    formData.append('message',data[0].message);
    formData.append('due_date',data[0].due_date);
    formData.append('priority',data[0].priority);
    formData.append('assigned_to',data[0].assigned_to);
     return this.http.post(this.apiBaseUrl + '/update', formData, {
      headers: new HttpHeaders({
        "AuthToken":'MMPIUq9bM8zRUFDWzc7XMMGt8jix38q9',
        "Accept": 'application/json'
      })
     })
   }

   callForClickEvent(param) {    
    this.invokeClickAction.next(param);
  }

   /**
   * @name delete task
   * @desc api for deleting tasks
   * @returns {Observable}
   */

   deleteTask(id) {
    var formData: FormData = new FormData();
    formData.append('taskid',id);
     return this.http.post(this.apiBaseUrl + '/delete', formData,{
       headers: new HttpHeaders({
        "AuthToken":'MMPIUq9bM8zRUFDWzc7XMMGt8jix38q9',
        "Accept":'application/json'
       })
     })
   }

   /**
   * @name delete task
   * @desc api for deleting tasks
   * @returns {Observable}
   */

   listOfUsers() {
     return this.http.get(this.apiBaseUrl + "/users" , {
      headers: new HttpHeaders({
        'AuthToken': 'MMPIUq9bM8zRUFDWzc7XMMGt8jix38q9'
      })
     })
   }
}
