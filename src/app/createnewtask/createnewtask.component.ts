import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { TaskService } from '../task.service';
declare var $: any;

@Component({
  selector: 'app-createnewtask',
  templateUrl: './createnewtask.component.html',
  styleUrls: ['./createnewtask.component.css']
})
export class CreatenewtaskComponent implements OnInit {

  createNewTask = [];
  disableAssignTask: boolean = false;
  selectedTaskId: any;
  assignTaskObject = {
    'taskid': '',
    'message': '',
    'due_date': '',
    'priority': '',
    'assigned_to': '',
    'username': ''
  }
  users = [
    {
      'id': '1',
      'name': 'Arpit'
    },
    {
      'id': '2',
      'name': 'Dusyant'
    },
    {
      'id': '3',
      'name': 'Prabhat'
    },
    {
      'id': '4',
      'name': 'Shobha'
    },
    {
      'id': '5',
      'name': 'Ahmed'
    },
    {
      'id': '6',
      'name': 'Vambani'
    },
  ];
  tasks = [];
  selectedUser: any;
  selectedUserId: any;
  AlertMessage: string = "";
  successMessage: boolean = false;
  failureMessage: boolean = false;

  constructor(public taskservice: TaskService, private spinner: NgxSpinnerService, private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  get Message() {
    return this.createnewTaskForm.get('message');
  }

  createnewTaskForm = new FormGroup({
    message: new FormControl("", Validators.required),
    due_date: new FormControl(""),
    priority: new FormControl(""),
    assigned_to: new FormControl("")
  })

  /**
  * @name createTask
  * @desc will set createnewTask Form value
  * @returns {void}
  */

  createTask() {
    this.createNewTask.push(this.createnewTaskForm.value);
    this.spinner.show('spinner1');
    this.taskservice.createTask(this.createNewTask).subscribe(resp => {
      if (resp['status'] == "success") {
        this.AlertMessage = "Task created successfully."
        this.successMessage = true;
        window.scroll(0, -300);
        setTimeout(() => {
          this.successMessage = false;
        }, 7000);
        $('#createnewTaskModal').modal('hide');
        this.spinner.hide('spinner1');
        this.callClickEvent('openDetailsView','');
      }
    },
      (error) => {
        this.AlertMessage = "Some error occurred."
        this.failureMessage = true;
        window.scroll(0, -300);
        setTimeout(() => {
          this.failureMessage = false;
        }, 7000);
        this.spinner.hide('spinner1');
      });
  }

  /**
 * @name checkMandatoryVal
 * @desc check mandatory validations for popup
 * @returns {void}
 */

  checkMandatoryVal() {
    if (this.createnewTaskForm.value.message == undefined || this.createnewTaskForm.value.message == null || this.createnewTaskForm.value.message.trim() == "")
      return true;
    else
      return false;
  }

  /**
 * @name callClickEvent
 * @desc click event for create task
 * @returns {void}
 */

  callClickEvent(type,value) {
    if(type == 'search')
    {
      let searchEvent = {};
      searchEvent['name'] = 'search';
      searchEvent['event'] = value;
      this.taskservice.callForClickEvent(searchEvent);
    }
    else
    {
      this.taskservice.callForClickEvent(type);
    }
  }

  callEvent(value) {
    if(value === 'reset')
    {
      (<HTMLInputElement>document.getElementById('search')).value = '';
    }
  }

  /**
 * @name openPopup
 * @desc open createnewTask modal
 * @returns {void}
 */

  openPopup() {
    $('#createnewTaskModal').modal('show');
  }

  /**
* @name openAssignTaskPopUp
* @desc open assignTask modal
* @returns {void}
*/

  openAssignTaskPopUp() {
    $('#assignTaskModal').modal('show');
  }

  /**
  * @name assignTaskToUser
  * @desc assign task to user
  * @returns {void}
  */

  assignTaskToUser() {
    this.tasks = JSON.parse(sessionStorage.getItem('Tasks'));
    this.assignTaskObject['taskid'] = this.selectedTaskId;
    this.tasks.forEach(value => {
      if (value['id'] == this.selectedTaskId) {
        this.assignTaskObject['message'] = value['message'];
        this.assignTaskObject['priority'] = value['priority'];
        this.assignTaskObject['due_date'] = value['due_date'];
      }
    })
    this.assignTaskObject['assigned_to'] = this.selectedUserId;
    this.assignTaskObject['username'] = this.selectedUser;
    var data = [];
    data.push(this.assignTaskObject);
    this.spinner.show('spinner1');
    this.taskservice.updateTask(data).subscribe(res => {
      this.AlertMessage = "Task assigned to user successfully."
      this.successMessage = true;
      window.scroll(0, -300);
      setTimeout(() => {
        this.successMessage = false;
      }, 7000);
      $('#createnewTaskModal').modal("hide");
      this.callClickEvent('assignTask','');
    },
      (error) => {
        this.AlertMessage = "Some error occurred."
        this.failureMessage = true;
        window.scroll(0, -300);
        setTimeout(() => {
          this.failureMessage = false;
        }, 7000);
        this.spinner.hide('spinner1');
      })
  }

  /**
  * @name selectTaskId
  * @desc select TaskId
  * @param taskid value
  * @returns {void}
  */

  selectTaskId(value) {
    this.selectedTaskId = value;
  }

  /**
  * @name selectUser
  * @desc select username
  * @param user name and user id
  * @returns {void}
  */

  selectUser(value, value1) {
    this.selectedUser = value;
    this.selectedUserId = value1;
  }

  /**
  * @name toasterClose
  * @desc close toaster message
  * @returns {void}
  */

  toasterClose() {
    this.successMessage = false;
    this.failureMessage = false;
  }

}
