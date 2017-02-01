const Node = require('./node');

class LinkedList {
  constructor() {
    this.length = 0;
    this._head = null;
    this._tail = null;
  }

  _findByIndex(index) {
    let node = null;
    let max = this.length -1;
    if (index >= 0 && index <= max) {
      if (index == 0) {
        node = this._head;
      }
      else if (index == max) {
        node = this._tail;
      }
      else if (index <= max / 2) {
        node = this._head;
        for (let i = 1; i <= index; i += 1) {
          node = node.next;
        }
      }
      else {
        node = this._tail;
        for (let i = max; i > index; i -= 1) {
          node = node.prev;
        }
      }
    }
    return node;
  }

  append(data) {
    let node = new Node(data);
    if (!this.length) {
      this._head = node;
      this._tail = node;
    }
    else {
      let lastNode = this._tail;
      this._tail = node;
      lastNode.next = node;
      node.prev = lastNode;
    }
    this.length += 1;

    return this;
  }


  head() {
    return (this._head) ? this._head.data : null;
  }

  tail() {
    return (this._tail) ? this._tail.data : null;
  }

  at(index) {
    let node = this._findByIndex(index);
    return (node) ? node.data : null;
  }

  insertAt(index, data) {
    let newNode = new Node(data);
    if (index == 0 && this.length > 0) {
      newNode.next = this._head;
      this._head = newNode;
      this._head.next.prev = this._head;
    }
    else if (index > 0 && index < this.length) {
      let oldNode = this._findByIndex(index);
      newNode.prev = oldNode.prev;
      newNode.next = oldNode;
      newNode.prev.next = newNode;
      newNode.next.prev = newNode;
    }
    else { //otherwise add to end of list
      this.append(data);
    }
    this.length += 1;

    return this;
  }

  isEmpty() {
    return !this.length;
  }

  clear() {
    this.length = 0;
    this._head = null;
    this._tail = null;
    delete this.next;

    return this;
  }

  deleteAt(index) {
    if (index >= 0 && index <= this.length - 1) { //only if index in range
      if (index == 0) {
        if (this.length == 1) {
          this.clear();
        }
        else {
          this._head = this._head.next;
          delete this._head.prev;
        }
      }
      else if (index > 0 && index < this.length - 1) {
        let oldNode = this._findByIndex(index);
        oldNode.prev.next = oldNode.next;
        oldNode.next.prev = oldNode.prev;
      }
      else if (index == this.length - 1) {
        this._tail = this._tail.prev;
        delete this._tail.next;
      }
      this.length -= 1;
    }

    return this;
  }

  reverse() {
    let node = this._tail;
    let max = this.length -1;
    for (let i = max; i >= 0; i -= 1) {
      let temp = node.next;
      node.next = node.prev;
      node.prev = temp;
      node = node.next;
    }
    let head = this._head;
    this._head = this._tail;
    this._tail = head;

    return this;
  }

  indexOf(data) {
    let node = this._head;
    for (let i = 0; i < this.length; i += 1) {
      if (node.data === data){
        return i;
      }
      node = node.next;
    }
    return -1;
  }
}

module.exports = LinkedList;
