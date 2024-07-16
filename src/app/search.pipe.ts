import { Pipe, PipeTransform } from '@angular/core';
import { FilterCustomers } from './filter-customers';
@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(filterCustomers:FilterCustomers[] , term:string): FilterCustomers[] {
    return filterCustomers?.filter((p)=>p.name.toLowerCase().includes(term.toLowerCase())) ;
  }
}
