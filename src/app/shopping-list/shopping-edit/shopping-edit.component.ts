import {Component, OnInit, ElementRef, ViewChild, EventEmitter, Output, OnDestroy} from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list.service";
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  //for edit on the same form
  @ViewChild('f') slForm : NgForm;

  // @ViewChild('nameInput') nameInputRef: ElementRef;
  // @ViewChild('amountInput') amountInputRef: ElementRef;
  // @Output() ingredientAdded = new EventEmitter<Ingredient>();

  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
   this.subscription = this.slService.startedEditing.subscribe(
     (index: number) => {
       this.editedItemIndex = index;
      this.editMode = true;
      this.editedItem = this.slService.getIngredient(index);
       this.slForm.setValue({
         name: this.editedItem.name,
         amount: this.editedItem.amount
       })
     }
   );
  }

  onAddItem(form: NgForm){
    // const ingName = this.nameInputRef.nativeElement.value;
    // const ingAmount = this.amountInputRef.nativeElement.value;
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if(this.editMode){
      this.slService.updateIngredient(this.editedItemIndex, newIngredient);
    }else{
      this.slService.addIngredient(newIngredient);
    }
    // this.ingredientAdded.emit(newIngredient);
    this.editMode = false;
    form.reset();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  onClear(){
   this.slForm.reset();
   this.editMode = false;
  }

  onDelete(){
    this.slService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }
}
