import { LightningElement, wire } from 'lwc';
import getExpenses from '@salesforce/apex/ExpenseController.getEmployeeExpenses';

export default class EmployeeExpenseTable extends LightningElement {
    expenses;

    @wire(getExpenses)
    wiredExpenses({ data, error }) {
        if (data) {
            this.expenses = data;
        } else if (error) {
            console.error(error);
        }
    }

    columns = [
        { label: 'Employee', fieldName: 'employeeName' },
        { label: 'Amount', fieldName: 'Amount__c', type: 'currency' },
        { label: 'Status', fieldName: 'Status__c' }
    ];

    get formattedExpenses() {
        return this.expenses?.map((exp) => ({
            ...exp,
            employeeName: exp.Employee__r?.Name // ✅ __r this is relational field to get employee name
        }));
    }
}
