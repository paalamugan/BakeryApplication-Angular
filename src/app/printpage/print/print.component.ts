import { Component, OnInit, ViewChild, ElementRef, inject, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SalesOrder } from '../../models/sales-order';



@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.css']
})
export class PrintComponent implements OnInit {
  today: number = Date.now();
  balance:number;
  constructor(
    private dialogRef: MatDialogRef<PrintComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SalesOrder
    ) {
      
     }
  

  ngOnInit() {
  this.balance=this.data.total-this.data.advance;
  }
  @ViewChild('printsection') printsection: ElementRef;
 
  print(): void {
    let printContents, popupWin;
    
    printContents = document.getElementById('printsection').innerHTML;
    popupWin = window.open('', '_blank');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
       
          <style>
          html, body {
          
            display: block; 
            font-family: "Calibri";
            margin: 0px;
            font-size:auto;
        }
       
        .bakeryhead{
          font-size: 19px;
        }
        .shop{
            padding-right: 50px;
            text-transform: uppercase;
        }
      .underline{
          border-bottom: 1px solid;
      } 
      table td{
        width:50px;
        overflow: hidden; 
        word-wrap: break-word;
      }
      .shop_print{
        position: relative;
        bottom: 20px;
        text-transform: uppercase;
      }
      .display{
        display: none;
    }
        .text-center{
          text-align:center;
        }
        .comments{
          width: 100%;
          word-wrap: break-word;
          border-color: white;
       }

        .table {
          width: 100%;
          max-width: 100%;
          margin-bottom: 20px;
      }
          </style>
        </head>
    <body onload="window.print();window.close()"> ${printContents}</body>
      </html>`
    );
    popupWin.document.close();
} 
 
}