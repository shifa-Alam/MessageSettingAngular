import { HttpEventType } from '@angular/common/http';
import { AfterContentChecked, ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { Contact } from 'src/app/models/contact';
import { User } from 'src/app/models/user';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-rnd',
  templateUrl: './rnd.component.html',
  styleUrls: ['./rnd.component.scss']
})
export class RndComponent implements OnInit {
  form: any;
  states = [{ id: 1, name: "state1" }, { id: 2, name: "state2" }];
  cities = [
    { stateId: 1, name: "city1a" },
    { stateId: 1, name: "city1b" },
    { stateId: 1, name: "city1c" },
    { stateId: 2, name: "city2a" },
    { stateId: 2, name: "city2b" },
    { stateId: 2, name: "city2c" },
    { stateId: 2, name: "city2d" }
  ];
  filteredCities: any[] = [];

  products = [{ id: 1, name: "product1" }, { id: 2, name: "product2" }];

  items = [
    { productId: 1, name: "item1" },
    { productId: 1, name: "item2" },
    { productId: 1, name: "item3" },
    { productId2: 2, name: "item4" },
    { productId2: 2, name: "item5" },
    { productId2: 2, name: "item6" }
  ];

  filteredItems: any[] = [];

  seedData = {
    contacts: [
      {
        phoneNo: "0099",
        name:"Alam",
        userContacts: [
          {
            userId:2,
            userName: "LIton"
          },
          {
            userId:3,
            userName: "Mizan"
          },
        ]
      },
      {
        phoneNo: "8899",
        name:"Milon",
        userContacts: [
          {
            userId:2,
            userName: "qq"
          },
          {
            userId:3,
            userName: "rr"
          },
        ]
      }
    ]
  };

  get contactsArray() {
    return this.form.get("contacts") as FormArray;
  }
  getYsArray(index: number) {
    return this.contactsArray.at(index).get("Ys") as FormArray;
  }
  getWsArray(index: number) {
    return this.contactsArray.at(index).get("Ws") as FormArray;
  }
  getZsArray(index: any, indexz: number) {
    return this.getYsArray(index).at(indexz).get("Zs") as FormArray;
  }

  setXs(el: any = null) {
    el = el || { X: null }
    return this.fb.group({
      X: [el.X, Validators.required],
      Ys: el.Ys ? this.fb.array(el.Ys.map((x: any) => this.setYs(x))) : this.fb.array([]),
      Ws: el.Ws ? this.fb.array(el.Ws.map((x: any) => this.setWs(x))) : this.fb.array([])
    })
  }
  setYs(el: any = null) {
    el = el || { product: null }
    return this.fb.group({
      product: [el.product, [Validators.required]],
      Zs: el.Zs ? this.fb.array(el.Zs.map((x: any) => this.setZs(x))) : this.fb.array([])
    })
  }
  setWs(el: any = null) {
    el = el || { state: null, city: null }
    return this.fb.group({
      state: [el.state, [Validators.required]],
      city: [el.city, [Validators.required]]
    })
  }
  setZs(el: any = null) {
    el = el || { Z: null }
    return this.fb.group({
      Z: [el.Z, [Validators.required, Validators.pattern("[0-9]{3}")]]
    })
  }

  ngOnInit() {
    this.form = this.fb.group({
      contacts: this.fb.array(this.seedData.contacts.map(x => this.setXs(x)))
    });
  }


  stateSelected(event: any) {
    // const selectEl:any = event.target;
    // console.log(selectEl)
    // const val = selectEl.options[selectEl.selectedIndex].getAttribute('data-state_id');
    console.log(event.target.value);
    this.filteredCities = this.cities.filter(
      i => i.stateId == event.target.value
    );
  }

  productSelected(event: any) {
    // const selectEl:any = event.target;
    // console.log(selectEl)
    // const val = selectEl.options[selectEl.selectedIndex].getAttribute('data-product_id');
    console.log(event.target.value);
    this.filteredItems = this.items.filter(
      i => i.productId == event.target.value
    );
  }

  addX() {
    // this.XsArray.push(this.setXs());
  }

  addY(ix: any) {
    this.getYsArray(ix).push(this.setYs());
  }

  addZ(ix: any, iy: any) {
    this.getZsArray(ix, iy).push(this.setZs());
  }

  addW(ix: any) {
    this.getYsArray(ix).push(this.setWs())
  }

  removeW(ix: any, iw: number) {
    this.getWsArray(ix).removeAt(iw)
  }

  constructor(private fb: FormBuilder) { }
}
