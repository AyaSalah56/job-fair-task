import { Pipe, PipeTransform } from '@angular/core';
import { FilterCustomers } from './filter-customers';
@Pipe({
  name: 'searchByAmount'
})
export class SearchByAmountPipe implements PipeTransform {

  transform(filterCustomers:FilterCustomers[] , amount:string): FilterCustomers[] {
    return filterCustomers?.filter((p)=>p.totalAmount.toString().includes(amount)) ;
  }

}
