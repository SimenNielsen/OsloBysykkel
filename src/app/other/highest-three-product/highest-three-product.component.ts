import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-highest-three-product',
  templateUrl: './highest-three-product.component.html',
  styleUrls: ['./highest-three-product.component.scss']
})
export class HighestThreeProductComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log(this.highestThreeProductFromArray([-5, -5, 2, 1, 1, 4]));
    // Output: 100
  }

  highestThreeProductFromArray(numArray: number[]): number{
    if (numArray.length < 3) return null; // return if the array length is less than 3

    //We can acheive O(n) through keeping track of these 5 values

    let highest = Math.max(numArray[0], numArray[1]); // highest number of the 2 first numbers, to avoid full list loop we will change this as we loop through the array
    let lowest  = Math.min(numArray[0], numArray[1]); // lowest number of array, to avoid full list loop we will change this as we loop through the array
    let highestProductOf2 = numArray[0] * numArray[1]; // product of the 2 first numbers, this will update as we loop through the array
    let lowestProductOf2  = numArray[0] * numArray[1]; // lowest product of the 2 first numbers, this will update as we loop through the array
    let highestProductOf3 = numArray[0] * numArray[1] * numArray[2]; // product of the 3 first numbers, this will update as we loop through the array
    //loop through every number of element
    numArray.forEach((currentNum:number) => {
      /*  
      replace highestProductOf3 if current number 
      along with the largest product of 2 numbers is greater. 
      Since we have negative numbers we also need to check the lowestProductOf2
      */
      highestProductOf3 = Math.max(highestProductOf3, currentNum*highestProductOf2, currentNum*lowestProductOf2); 
      /*  
      replace highestProductOf2 if current number 
      along with the largest number is greater. 
      Since we have negative numbers we also need to check the lowest number
      */
      highestProductOf2 = Math.max(highestProductOf2, currentNum*highest, currentNum*lowest);
      /*  
      replace lowestProductOf2 if current number 
      along with the largest number is smaller. 
      Since we have negative numbers we also need to check the highest number
      */
      lowestProductOf2 = Math.min(lowestProductOf2, currentNum*highest, currentNum*lowest);

      highest = Math.max(highest, currentNum);// replace highest number if current number is higher
      lowest = Math.min(lowest, currentNum); // replace lowest number if current number is lower
    });
    return highestProductOf3;
  }
}
