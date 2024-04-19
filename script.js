
import { LinkedList } from "./linked-list.js";
import { Node } from "./linked-list.js";

  class Hashmap {

    constructor(capacity, loadfactor){
        this.capacity = capacity || 16;
        this.loadfactor = loadfactor || 0.75;
        this.buckets = Array(this.capacity).fill(null);
    }

    hash(key){
        let hashCode = 0;
           
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
          hashCode = primeNumber * hashCode + key.charCodeAt(i);
          hashCode = hashCode % this.capacity;
        }

        return hashCode;
    } 

    set(key, value){   
        //check bucket size/ load factor? COME BACK TO THIS
        // debugger;
        let hashCode = this.hash(key);
     
        if (hashCode < 0 || hashCode >= this.buckets.length) {
            throw new Error("Trying to access index out of bound");
          }

        //if bucket is not empty 
       if (this.buckets[hashCode] !== null){
     

            let list = this.buckets[hashCode]; //LinkedList{head: Node}

            //key exists in linked list
            if (list.containsKey(key)){
                let index = list.findKey(key); 
                let node = list.at(index);
                node.value = value;

            //key doesnt exist in list
            } else{
                list.append(key, value);
                console.log(myHashmap);
                //what faster? add to start or add to end?
            }
        //EMPTY BUCKET
        } else if (this.buckets[hashCode] === null) {
            //create LL w/ head node & put in bucket
            let firstNode = new Node(key, value, null);
            let LL = new LinkedList(firstNode);
            this.buckets[hashCode] = LL; 
        }
    }

    get(key){
        //returns value that is assigned to the key.
        //if key not found, return null
       
        let hashCode = this.hash(key);

        if (hashCode < 0 || hashCode >= this.buckets.length) {
            throw new Error("Trying to access index out of bound");
          }

   

        if (this.buckets[hashCode] === null){
            //bucket is empty
            console.log('this bucket is empty');
            return null;
        } else if (this.buckets[hashCode] !== null ){
            let list = this.buckets[hashCode];

            //key exists in linked list
            if (list.containsKey(key)){
                let index = list.findKey(key); 
                let node = list.at(index);
                return node.value;
             } else {
                //bucket not empty, but key not matching
                return 'key does not exist';
             }
         }
    }

    has(key){
        //takes key and returns true or false based on whether or not the key is in the hashmap
        let hashCode = this.hash(key);

        if (hashCode < 0 || hashCode >= this.buckets.length) {
            throw new Error("Trying to access index out of bound");
          }
   
        if (this.buckets[hashCode] === null){
            //bucket is empty
            return false;
        } else if (this.buckets[hashCode] !== null ){
            let list = this.buckets[hashCode];
            return list.containsKey(key) ? true : false; 
         }
       
    }

    remove(key){ 
        //if key is in hashmap, remove entry with the key and return true. If key isnt in hashmap, return false

        let hashCode = this.hash(key);

        if (hashCode < 0 || hashCode >= this.buckets.length) {
            throw new Error("Trying to access index out of bound");
          }
        
        if (this.buckets[hashCode] !== null && this.has(key)){

            //get list
            let list = this.buckets[hashCode];

            //find index of node with key, and last node
            let index = list.findKey(key); 
            let lastNode = list.last();
        
            //if only one node, remove whole linked list
            if (index === 0 && list.at(index) === lastNode){
                this.buckets[hashCode] = null;
                console.log(myHashmap);
                return;
            } else {
                //remove node
                list.removeAt(index);
                console.log(myHashmap);
            }
            return true;
        } return false;
     
    }

    length(){
        //returns the number of stored keys in the hash map.
        //assumes one key per node
        let counter = 0;

        for (let i = 0; i < this.buckets.length; i++){
            if (this.buckets[i] !== null){
                 //get list
            let list = this.buckets[i];
            let size = list.size();
            counter += size;
            }
        }
        return counter;
    }

    clear(){
        //removes all entries in the hash map.
        for (let i = 0; i < this.buckets.length; i++){
            if (this.buckets[i] !== null){
               this.buckets[i] = null; 
            }
        }
    }

    keys(){
        //returns an array containing all the keys inside the hash map.
        let allKeys = [];

        //loop through buckets
        for (let i = 0; i < this.buckets.length; i++){

            //if bucket contains linked list
            if (this.buckets[i] !== null){

                //get linked list
               let list = this.buckets[i];
     
                //get all keys, push keys to array allKeys
                allKeys.push(list.printKeys());
            }
        }
        return allKeys.flat(Infinity);
    }

    values(){
        //returns an array containing all the values.
        let allValues = [];

        //loop through buckets
        for (let i = 0; i < this.buckets.length; i++){

            //if bucket contains linked list
            if (this.buckets[i] !== null){

            //get linked list
           let list = this.buckets[i];
 
            //get all values, push values to array allValues
            allValues.push(list.printValues());
        }
    }
    return allValues.flat(Infinity);
    }

    entries(){ //*
        //entries() returns an array that contains each key, value pair. Example: [[firstKey, firstValue], [secondKey, secondValue]]
        let allEntries = [];

        for (let i = 0; i < this.buckets.length; i++){

            if (this.buckets[i] !== null){
                //get linked list
                let list = this.buckets[i];
                //get key and value for each node & put in array, should be linked list method

                //push to array
                allEntries.push(this.buckets[i]);
            }
        return allEntries;
        }
    }
}

  let myHashmap = new Hashmap();
  console.log(myHashmap);
  myHashmap.set('Kim', 'LeBherz');
  myHashmap.set('bro', 'bro');
  myHashmap.set('Josh', 'Lebherz');
  myHashmap.set('Test', 'Test');
  myHashmap.set('Beetle', 'Beetle');
  myHashmap.set('Storm', 'Storm');


// EXTRA CREDIT 
//   class HashSet extends Hashmap {

//     set(key){   

//         this.buckets[this.hash(key)] = key;
//     }
    
//   }

//   let myHashSet = new HashSet();
//   console.log(myHashSet);


//Helper function to allow variables to be accessed in console
window.myHashmap = myHashmap;
const globalize = function(variables) {
    Object.entries(variables).forEach(([name, value]) => window[name] = value);
};
globalize({myHashmap});