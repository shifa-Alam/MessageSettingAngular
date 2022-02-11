import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/contact';
import { ContactUser } from 'src/app/models/contactUser';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact-add',
  templateUrl: './contact-add.component.html',
  styleUrls: ['./contact-add.component.scss']
})
export class ContactAddComponent implements OnInit {
 

  contact:Contact = new Contact();
  // contactUser = new ContactUser();
  constructor(private contactService: ContactService,) { }

  ngOnInit(): void {
    this.contact.name = "Zahid";
    this.contact.phoneNo="990";

    for (let index = 1; index <= 2; index++) {
      const element = new ContactUser();
      element.userId=2;
      element.userType=index
      this.contact.contactUsers.push(element);
    }
 
    this.onSave();
  }

  onSave() {
    console.log(this.contact);
    this.contactService.saveContactAsync(this.contact).subscribe((event) => {
      if (event.type === HttpEventType.Response) {
        // this._snackBarService.success("Saved Successfully!");
        // this.isLoading = false;
        // this.router.navigate(['']);
      }
    },
      error => {
        // this._snackBarService.error("Something Wrong");
        // this.isLoading = false;
      }
    );
  }

}
