import { Component, OnInit, ElementRef, ViewChild, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { SalesOrder } from '../../models/sales-order';

@Component({
  selector: 'app-printcheck',
  templateUrl: './printcheck.component.html',
  styleUrls: ['./printcheck.component.css']
})
export class PrintcheckComponent implements OnInit {

  today: number = Date.now();
  
  
  constructor(
    private dialogRef: MatDialogRef<PrintcheckComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SalesOrder
    ) {
      
     }
  

  ngOnInit() {
   
  
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
      .display_1{
     display:none;
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
    .printalign{
      width: 100%;
      max-width: 100%;
      margin-bottom: 20px;
    }
    .shop_print{
      position: relative;
      bottom: 20px;
      text-transform: uppercase;
    }
     
      .text-center{
        text-align:center;
      }
      table td{
        width:50px;
        overflow: hidden; 
        word-wrap: break-word;
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
