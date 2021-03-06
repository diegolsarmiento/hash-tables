// HASH TABLES:
// Constang time insertion AND time lookup O(1)
// Practical Uses:
// * Email Provider storing addresses
// * Users of an Application
// Cons:
// Don't store references of other data structures
// Linked Lists are better for this purpose


// Define HashTable node (element inside the bucket)
class HashNode {
  constructor (key, value, next){
  this.key = key;
  this.value = value;
  this.next = next || null;
  }
}

// Define HashTable Constructor
class HashTable {
  constructor(size){
    this.buckets = Array(size);
    this.numBuckets = this.buckets.length;
  }
  
  // charCodeAt converts to "hash number"
  // Hash our key into the appropiate number
  hash(key){
    let total = 0;
    for (let i=0; i < key.length; i++){
      total += key.charCodeAt(i);
    }
    // We need to adapt it to our number of 
    // Buckets
    let bucket = total % this.numBuckets;
    // this is where we store it (the bucket)
    return bucket;
  }
  
  // Insert Method: take key value pair,
  // turn it into Hash node, 
  // then place it into the correct bucket 
  insert(key, value){
    let index =  this.hash(key);
    // console.log('INDEX', index)
    // If there is no node in that index, add a new one
    if (!this.buckets[index]) this.buckets[index] = new HashNode(key, value);
    // If this is the first one
    else if (this.buckets[index].key === key){
      this.buckets[index].value = value;
    }
    // If there is a node, chain it with the other node values
    else {
      let currentNode = this.buckets[index];
      while (currentNode.next){
        // Check if I'm in the last node of the chain
        if (currentNode.next.key === key) {
          currentNode.next.value = value;
          return;
        }
        currentNode = currentNode.next;
      }
      currentNode.next = new HashNode(key, value);
    }
  }
  
  
  // Method receives a key, then defines an index of the hash table
  // If the value doesn't exists in the bucket, returns null
  // Otherwise read each node until you find the key, then return the value
  // If there is no key return null
  get(key) {
    let index = this.hash(key);
    if (!this.buckets[index]) return null;
    else {
      let currentNode = this.buckets[index];
      while(currentNode){
        if (currentNode.key === key) return currentNode.value;
        currentNode = currentNode.next;
      }
      return null;
    }
  }

  retreiveAll(){
    let allNodes = [];
    for (let i = 0; i < this.numBuckets; i++){
      let currentNode = this.buckets[i];
      while(currentNode){
        allNodes.push(currentNode);
        currentNode = currentNode.next;
      }
    }
    return allNodes;
  }
}

let myHT = new HashTable(30);

myHT.insert('Dean', 'dean@gmail.com');
myHT.insert('Megan', 'megan@gmail.com');
myHT.insert('Dean', 'dean@yahoo.com');
myHT.insert('Dean', 'deanmachine@gmail.com');
myHT.insert('Megan', 'megan2@gmail.com');


console.log(myHT.retreiveAll()); // returns [{"key":"Megan","value":"megan2@gmail.com","next":null},{"key":"Dean","value":"deanmachine@gmail.com","next":null}] 
// console.log(myHT.get('Megan')); // returns megan2@gmail.com
// console.log(myHT.hash('Becca')); // returns 12

