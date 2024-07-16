import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import { CustomerService } from '../customer.service';
import { Customer } from '../customer';
import { Transaction } from '../transaction';
import { TransactionService } from '../transaction.service';
import { FilterCustomers } from '../filter-customers';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  customers!: Customer[];
  transactions!: Transaction[];
  filterCustomers!:FilterCustomers[];
  searchTerm:string = '' ;
  searchByAmount:string = '' ;
  filterDate!:any[];

  chart: Chart | undefined;
  @ViewChild('transactionsChart') transactionsChart!: ElementRef;



  constructor(private _CustomerService:CustomerService , private _TransactionService:TransactionService){}

    ngOnInit(): void {
    this._CustomerService.getCustomer().subscribe(res=> {
      this.customers = res ;
      console.log(this.customers);
    })
    this.getTrans();
  }

  getTrans()
  {
    this._TransactionService.getTransaction().subscribe(res =>{
      this.transactions = res;
      this.calculateTotalAmount();
  } )
}

calculateTotalAmount(): void {
  this.filterCustomers = this.customers.map((data) => {

    const filterArr = this.transactions.filter((p) => {
      return Number(p.customer_id) === Number(data.id);
    });
    const total = filterArr.reduce((sum, p) => sum + Number(p.amount), 0);
    return {
      id: data.id,
      name: data.name,
      totalAmount: total,
      customer_id: '',
      amount: 0
    } as FilterCustomers;
  });
  console.log(this.filterCustomers);
}

getAmount(num:string)
{
  this.filterDate = this.transactions.filter((p)=>p.customer_id == num)

  if (this.chart) {
    this.chart.destroy();
  }
  setTimeout(() => {
    this.charts();
    }, 0);

}


charts()
{
  const ctx = (this.transactionsChart.nativeElement as HTMLCanvasElement).getContext('2d');
    if (!ctx) return;

  this.chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: this.filterDate.map(t => t.date),
      datasets: [{
        label: 'Amount',
        data: this.filterDate.map(t => t.amount),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 3
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
      }
    });
    }

}
