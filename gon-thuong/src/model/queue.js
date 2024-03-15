class Queue {
    constructor() {
        this.items = [];
    }

    // Phương thức để thêm phần tử vào cuối hàng đợi
    enqueue(element) {
        this.items.push(element);
    }

    // Phương thức để loại bỏ phần tử khỏi đầu hàng đợi
    dequeue() {
        if (this.isEmpty()) {
            return "Queue is empty";
        }
        return this.items.shift();
    }

    // Phương thức để kiểm tra xem hàng đợi có trống không
    isEmpty() {
        return this.items.length === 0;
    }

    // Phương thức để lấy phần tử ở đầu hàng đợi mà không loại bỏ nó
    peek() {
        if (this.isEmpty()) {
            return "Queue is empty";
        }
        return this.items[0];
    }

    // Phương thức để lấy độ dài của hàng đợi
    size() {
        return this.items.length;
    }

    // Phương thức để hiển thị hàng đợi
    display() {
        console.log(this.items);
    }
}