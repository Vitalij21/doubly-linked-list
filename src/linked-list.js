const Node = require('./node');


let headNode;
let tailNode;
let length;

class LinkedList {

    constructor() {
        this.headNode = null;
        this.tailNode = null;
        this.length = 0;
    }

    append(data) {
        const newNode = new Node(data);
        if (!this.headNode) {
            this.headNode = newNode;
            this.tailNode = newNode;

        }
        this.tailNode.next = newNode;
        newNode.prev = this.tailNode;
        this.tailNode = newNode;
        this.length++;
        return this;
    }


    head() {
        if (this.length === 0) {
            return null;
        } else {
            return this.headNode.data;
        }
    }

    tail() {
        if (this.length === 0) {
            return null;
        } else {
            return this.tailNode.data;
        }
    }

    at(index) {
        if (index >= 0) {
            let curr = this.headNode;
            let i = 0;
            while ((curr !== null) && (i < index)) {
                curr = curr.next;
                i++;
            }
            return curr !== null ? curr.data : undefined;
        } else {
            return undefined;
        }
    }


    insertAt(index, data) {
        let node = new Node(data);
        if (this.headNode === null) {
            this.headNode = node;
            this.tailNode = node;
            this.length++;
            return this;
        }
        if (index === 0) {
            node.prev = null;
            node.next = this.headNode;
            this.headNode.prev = node;
            this.headNode = node;
            this.length++;
            return this;
        }
        let iter = 1;
        let currNode = this.headNode;
        while (currNode.next != null && iter < index) {
            currNode = currNode.next;
            iter++;
        }
        node.next = currNode.next;

        if (currNode.next != null) {
            currNode.next.prev = node;
        }
        node.prev = currNode;
        currNode.next = node;

        if (this.tail.next != null) {
            this.tail = this.tail.next;
        }
        this.length++;
        return this;
    }

    isEmpty() {
        return this.length === 0;
    }

    clear() {
        for (let i = 0; i < this.length - 1; i++) {
            this.test(i).prev = null;
            this.test(i).next = null;
            this.test(i).data = null;
        }
        this.length = 0;
        return this;
    }

    test(index) {
        if (index >= 0) {
            let current = this.headNode;
            let i = 0;
            while ((current !== null) && (i < index)) {
                current = current.next;
                i++;
            }
            return current !== null ? current : undefined;
        } else {
            return undefined;
        }
    }

    deleteAt(index) {
        if ((this.headNode === null) || (index < 0)) {
            return null;
        }
        if (index === 0) {

            const data = this.headNode.data;
            this.headNode = this.headNode.next;
            if (this.headNode === null) {
                this.tailNode = null;
            } else {
                this.headNode.prev = null;
            }
            this.length--;
            return this;
        }

        let current = this.headNode;
        let i = 0;

        while ((current !== null) && (i < index)) {
            current = current.next;
            i++;
        }

        if (current !== null) {
            current.prev.next = current.next;
            if (this.tailNode === current) {
                this.tailNode = current.prev;
            } else {
                current.next.prev = current.prev;
            }
            this.length--;
            return this;
        }
    }

    reverse() {

        let reversedList = new LinkedList();
        for (let i = this.length - 1; i >= 0; i--) {
            reversedList.append(this.test(i));
        }
        return Object.assign(this, reversedList);
    }

    indexOf(data) {

        if (data !== null) {
            let curr = this.headNode;
            let i = 0;
            while ((curr.data !== data) && (i < this.length)) {
                curr = curr.next;
                i++;
            }

            if (i !== this.length) {
                return i;
            } else return -1;
        } else {
            return undefined;
        }

    }
}

module.exports = LinkedList;
