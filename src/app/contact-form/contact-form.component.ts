import { Component, OnInit } from '@angular/core';
import $ from 'jquery';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $(() => {
      "use strict";
      // Contact Form
      $('form.contactForm').submit(function (event) {
        event.preventDefault();

        var form = $(this);
        var ferror = false;
        var formData = form.serializeArray();
        var jsonData: any = {};

        formData.forEach(function (entry) {
          if (entry.name !== undefined) {
            jsonData[entry.name] = entry.value;
          }
        });

        var emailExp = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i;

       

       
        form.find('.validation').each(function () {
          const i = $(this);
          const rule = i.attr('data-rule');
        
          if (rule !== undefined) {
            let ierror = false;
            const pos = rule.indexOf(':', 0);
            let exp = ""; // Initialize exp as an empty string
        
            if (pos >= 0) {
              exp = rule?.substr(pos + 1) ?? "0";
            }
        
            const fieldName = i.attr('name');
            const fieldValue = jsonData && fieldName ? jsonData[fieldName] : undefined;
        
            if (typeof fieldValue === 'string' && fieldValue.length < (parseInt(exp) || 0)) {
              ferror = ierror = true;
            }
        
            const customMsg = i.attr('data-msg');
            i.next('.validation').fadeIn(); // o slideDown()
          }
        });
      




        if (ferror) return;

        var action = form.attr('action');
        if (!action) {
          action = 'contactform/contactform.php';
        }

        $.ajax({
          type: "POST",
          url: action,
          data: jsonData,
          success: function (msg) {
            // Handle success message
            // Reset form fields if needed
          },
          error: function (err) {
            // Handle error message
          }
        });
      });
    });
  }
}
