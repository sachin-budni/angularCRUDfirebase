import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../share/employee.service';
import { Employee } from '../share/employee';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employeeList : Employee[];
  constructor(private employeeService : EmployeeService) { }

  ngOnInit() {
    var x = this.employeeService.getData();
    x.snapshotChanges().subscribe((item)=>{
      this.employeeList = [];
      item.forEach((element)=>{
        var y = element.payload.toJSON();
        y["$key"] = element.key;
        this.employeeList.push(y as Employee);
      })
    });
  }

  onEdit(emp : Employee)
  {
    this.employeeService.selectEmployee = Object.assign({},emp);
  }
  onDelete(emp : Employee)
  {
    this.employeeService.deleteEmployee(emp.$key);
  }
}
