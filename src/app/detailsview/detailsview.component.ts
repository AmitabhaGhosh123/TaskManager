import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { TaskService } from '../task.service';
declare var $: any;

@Component({
  selector: 'app-detailsview',
  templateUrl: './detailsview.component.html',
  styleUrls: ['./detailsview.component.css']
})
export class DetailsviewComponent implements OnInit {

  totalDatafiltered = {};
  totalDataFilteredCopy = [];
  totalDataFilteredCopy1 = [];
  filteredObject = {
    id: '',
    message: '',
    due_date: '',
    priority: '',
    assigned_to: ''
  }
  updateObject = {
    taskid: '',
    message: '',
    priority: '',
    assigned_to: '',
    due_date: ''
  }
  message: any;
  due_date: any;
  priority: any;
  assigned_to: any;
  disableDelete: boolean = false;
  disableEdit: boolean = true;
  deleteTasks = [];
  direction = "des";
  AlertMessage: string = "";
  successMessage: boolean = false;
  failureMessage: boolean = false;
  datalength: number;
  page: number = 1;
  pageSize: number = 5;
  selectedFieldForShowRecords = 5;
  selectPage = [{ "Text": "5", "Value": "5" },
  { "Text": "10", "Value": "10" },
  { "Text": "20", "Value": "20" },
  { "Text": "30", "Value": "30" },
  { "Text": "All", "Value": "All" }];
  noTaskMessage: boolean = false;
  constructor(public taskservice: TaskService, private spinner: NgxSpinnerService) {

  }

  ngOnInit(): void {

    this.page = 1;
    this.pageSize = 5;
    this.selectedFieldForShowRecords = 5;
    this.selectPage['Text'] = "Select";
    this.fetchAllTasks();
    this.getClickEventCall();
  }

  /**
   * @name getClickEventCall
   * @desc method for click event
   * @returns {Observable}
   */
  getClickEventCall() {
    this.taskservice.invokeClickAction.subscribe(value => {
      if(value.name) {
        if(value.name === 'search')
        {
          this.search(value.event);
        }
      }
      else
      {
        if (value === 'openDetailsView' || value === 'assignTask') {
          this.fetchAllTasks();
        }
        if (value === 'reset') {
          this.reset();
        }
      }
    })
  }

  /**
   * @name reset
   * @desc reset data
   * @returns {void}
   */
  reset() {
    this.totalDataFilteredCopy = this.totalDataFilteredCopy1;
    this.datalength = this.totalDataFilteredCopy.length;
    this.taskservice.totalTasks = this.datalength;
    this.page = 1;
    this.pageSize = 5;
    this.selectPage['Text'] = "Select";
    this.selectedFieldForShowRecords = 5;
  }

  /**
   * @name search
   * @desc search method
   * @param a search string
   * @returns {Observable}
   */

  search(a) {
    if(a)
    {
      if (this.totalDataFilteredCopy.some((b) => String(b['id'] != null && b['id'].toLowerCase().includes(a.toLowerCase())) || (b['message'] != null && b['message'].toLowerCase().includes(a.toLowerCase())))) {
          this.totalDataFilteredCopy = this.totalDataFilteredCopy.filter((b) => {
             return (b['id'] != null && b['id'].toLowerCase().includes(a.toLowerCase())) || (b['message'] != null && b['message'].toLowerCase().includes(a.toLowerCase()));
            })
          this.datalength = this.totalDataFilteredCopy.length;
          this.taskservice.totalTasks = this.datalength;
          this.page = 1;
          this.selectPage['Text'] = "Select";

    }
   }
  }

  /**
   * @name fetchAllTasks
   * @desc call api for fetching all tasks
   * @returns {Observable}
   */

  fetchAllTasks() {
    this.spinner.show('spinner1');
    this.taskservice.getTasks().subscribe(res => {
      this.totalDatafiltered = res;
      this.spinner.hide('spinner1');
      this.totalDataFilteredCopy = this.totalDatafiltered['tasks'];
      if(this.totalDataFilteredCopy.length == 0)
      {
        this.AlertMessage = "No pending tasks available";
        this.noTaskMessage = true;
        setTimeout(() => {
          this.noTaskMessage = false;
        }, 7000);
      }
      this.totalDataFilteredCopy1 = this.totalDataFilteredCopy;
      this.datalength = this.totalDataFilteredCopy.length;
      this.taskservice.totalTasks = this.datalength;
      sessionStorage.setItem("Tasks", JSON.stringify(this.totalDataFilteredCopy));
      this.totalDataFilteredCopy.forEach(value => {
        this.taskservice.getTaskIds.push(value['id']);
      });
      this.page = 1;
      this.selectPage['Text'] = "Select";
    },
      (error) => {
        this.spinner.hide();
      });
  }

  /**
   * @name openPopup
   * @desc open edit modal
   */

  openPopup(key) {
    this.filteredObject = key;
    $('#content').modal('show');
  }

  /**
   * @name onClosePopUp
   * @desc close edit modal
   */

  onClosePopUp() {
    $('#content').modal("hide");
  }

  /**
 * @name checkMandatoryVal
 * @desc check mandatory validations for popup
 * @returns {void}
 */

  checkMandatoryVal() {
    if (this.filteredObject.message == undefined || this.filteredObject.message == null || this.filteredObject.message.trim() == "")
      return true;
    else
      return false;
  }

  /**
 * @name updateTask
 * @param editForm Edit form
 * @desc update task
 * @returns {void}
 */

  updateTask() {
    this.updateObject['taskid'] = this.filteredObject['id'];
    this.updateObject['message'] = this.filteredObject['message'];
    this.updateObject['due_date'] = this.filteredObject['due_date'];
    this.updateObject['priority'] = this.filteredObject['priority'];
    this.updateObject['assigned_to'] = this.filteredObject['assigned_to'];
    this.spinner.show('spinner1');
    var data = [];
    data.push(this.updateObject);
    this.taskservice.updateTask(data).subscribe(res => {
      if (res['status'] == "success") {
        this.AlertMessage = "Task updated successfully."
        this.successMessage = true;
        window.scroll(0, -300);
        setTimeout(() => {
          this.successMessage = false;
        }, 7000);
        $('#content').modal("hide");
        this.spinner.hide('spinner1');
        this.fetchAllTasks();
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
  * @name onClickRowCheckbox
  * @param event and rowdata
  * @desc select row
  * @returns {void}
  */

  onClickRowCheckbox(event, rowdata) {
    if (event.target.checked) {
      this.disableEdit = false;
      this.deleteTasks.push(rowdata['id']);
    }
    else {
      this.disableEdit = true;
    }
  }

  /**
  * @name deleteTask
  * @desc delete task
  * @returns {void}
  */

  onDeleteData() {
    this.spinner.show('spinner1');
    this.taskservice.deleteTask(this.deleteTasks).subscribe(res => {
      if (res['status'] == "success") {
        this.AlertMessage = "Task deleted successfully."
        this.successMessage = true;
        window.scroll(0, -300);
        setTimeout(() => {
          this.successMessage = false;
        }, 7000);
        this.spinner.hide('spinner1');
        this.fetchAllTasks();
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
      })
  }

  /**
 * @name onSort
 * @param field to be sorted
 * @desc sort fields in table
 * @returns {void}
 */
  onSort(column) {
    this.disableEdit = true;
    if (column != "TaskId" && column != "Priority" && column != "AssignedTo") {
      switch (this.direction) {
        case 'des':
          this.totalDataFilteredCopy = this.totalDataFilteredCopy.sort(function (a, b) {
            if (column == "Message") {
              var previous = a.message.toLowerCase(), next = b.message.toLowerCase();
            }
            if (column == "DueDate") {
              var previous = a.due_date.toLowerCase(), next = b.due_date.toLowerCase();
            }
            if (column == "AssignedName") {
              var previous = a.assigned_name.toLowerCase(), next = b.assigned_name.toLowerCase();
            }
            if (previous < next)
              return -1;
            if (previous > next)
              return 1;
            return 0;
          });
          this.direction = 'asc';
          break;

        case 'asc':
          this.direction = 'des';
          this.totalDataFilteredCopy = this.totalDataFilteredCopy.sort(function (a, b) {
            if (column == "Message") {
              var previous = a.message.toLowerCase(), next = b.message.toLowerCase();
            }
            if (column == "DueDate") {
              var previous = a.due_date.toLowerCase(), next = b.due_date.toLowerCase();
            }
            if (column == "AssignedName") {
              var previous = a.assigned_name.toLowerCase(), next = b.assigned_name.toLowerCase();
            }
            if (next < previous)
              return -1;
            if (next > previous)
              return 1;
            return 0;
          });
          break;
      }
    }
    else {
      switch (this.direction) {
        case 'des':
          let sortingArrayNumber = [];
          this.totalDataFilteredCopy.forEach(x => {
            var data;
            if (column == "TaskId") {
              data = x.id;
            }
            if (column == "Priority") {
              data = x.priority;
            }
            if (column == "AssignedTo") {
              data = x.assigned_to;
            }
            if (!isNaN(Number(data))) {
              sortingArrayNumber.push(x);
            }
          });

          sortingArrayNumber = sortingArrayNumber.sort(function (a, b) {
            if (a[column] == null || a[column] == "") {
              return -1;
            }
            else if (b[column] == null || b[column] == "") {
              return 1;
            }
            else {
              return a[column] - b[column];
            }
          });

          this.totalDataFilteredCopy = sortingArrayNumber;
          this.direction = 'asc';
          break;

        case 'asc':
          this.direction = 'des';
          let sortingArrayNumber1 = [];
          this.totalDataFilteredCopy.forEach(x => {
            var data;
            if (column == "TaskId") {
              data = x.id;
            }
            if (column == "Priority") {
              data = x.priority;
            }
            if (column == "AssignedTo") {
              data = x.assigned_to;
            }
            if (!isNaN(Number(data))) {
              sortingArrayNumber1.push(x);
            }
          });

          sortingArrayNumber1 = sortingArrayNumber1.sort(function (a, b) {
            if (b[column] == null || b[column] == "") {
              return -1;
            }
            else if (a[column] == null || a[column] == "") {
              return 1;
            }
            else {
              return b[column] - a[column];
            }
          });

          this.totalDataFilteredCopy = sortingArrayNumber1;
          break;
      }
    }
  }

  /**
   * @name toasterClose
   * @desc close toaster message
   */

  toasterClose() {
    this.successMessage = false;
    this.failureMessage = false;
    this.noTaskMessage = false;
  }

  /**
 * @name selectRecordToShow
 * @desc selectRecordToShow
 * @param event selected number of row
 * @returns {void}
 */
  selectRecordToShow(event) {
    this.selectedFieldForShowRecords = event.Value;
    if (event.Value != "All") {
      this.pageSize = Number(event.Value);
      this.page = 1
    }

    else {
      this.pageSize = this.totalDataFilteredCopy.length;
      this.page = 1
    }
  }
}
