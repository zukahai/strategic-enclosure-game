class AlogorithmBFS {
    constructor(data, start) {
        this.data = data;
        this.start = start;
        this.arr = new Array(data.length).fill(0).map(() => new Array(data.length).fill(99));
        this.process = new Array(data.length).fill(0).map(() => new Array(data.length).fill([]));
        this.queue = new Queue();
        this.queue.enqueue({row: start.row, column: start.column});
        this.arr[start.row][start.column] = 0;
        this.process[start.row][start.column] = [{row: start.row, column: start.column}];
        this.breadthFirstSearch();
    }

    breadthFirstSearch() {
        while(!this.queue.isEmpty()) {
            let temp = this.queue.peek();
            this.queue.dequeue();
            const adjacent = this.adjacent(temp.row, temp.column);
            adjacent.forEach((e) => {
                if (this.arr[e.row][e.column] == 99) {
                    if (this.data[e.row][e.column] == 0) {
                        this.arr[e.row][e.column] = this.arr[temp.row][temp.column] + 1;
                        this.process[e.row][e.column] = [...this.process[temp.row][temp.column], {row: e.row, column: e.column}]
                        this.queue.enqueue({row: e.row, column: e.column});
                    }
                    if (this.data[e.row][e.column] == 5) {
                        this.arr[e.row][e.column] = this.arr[temp.row][temp.column] + 1;
                        this.process[e.row][e.column] = [...this.process[temp.row][temp.column], {row: e.row, column: e.column}]
                    }
                }
            })
        }
        // console.table(this.arr);
        // console.log(this.getNextStepUfo());
    }

    getNextStepUfo() {
        let min = {row: 0, column: 0}
        for (let i = 0; i < this.arr.length; i++) {
            if (this.arr[i][0] < this.arr[min.row][min.column]) {
                min = {row: i, column: 0};
            }
            if (this.arr[i][this.arr.length - 1] < this.arr[min.row][min.column]) {
                min = {row: i, column: this.arr.length - 1};
            }
            if (this.arr[0][i] < this.arr[min.row][min.column]) {
                min = {row: 0, column: i};
            }
            if (this.arr[this.arr.length - 1][i] < this.arr[min.row][min.column]) {
                min = {row: this.arr.length - 1, column: i};
            }
        }
        // console.log(this.arr[min.row][min.column]);
        let arrMin = [];
        for (let i = 0; i < this.arr.length; i++) {
            if (this.arr[i][0] == this.arr[min.row][min.column]) {
                arrMin.push( {row: i, column: 0});
            }
            if (this.arr[i][this.arr.length - 1] == this.arr[min.row][min.column]) {
                arrMin.push({row: i, column: this.arr.length - 1});
            }
            if (this.arr[0][i] == this.arr[min.row][min.column]) {
                arrMin.push({row: 0, column: i});
            }
            if (this.arr[this.arr.length - 1][i] == this.arr[min.row][min.column]) {
                arrMin.push({row: this.arr.length - 1, column: i});
            }
        }

        if (this.arr[min.row][min.column] == 99)
            return {row: -1, column: -1};
        
        // console.table(this.arr);
        let randomMove = arrMin[Math.floor(10000* Math.random()) % arrMin.length];
        // console.table(this.process[randomMove.row][randomMove.column]);
        return this.process[randomMove.row][randomMove.column][1];
    }

    adjacent(row, column) {
        let ans = [];
        ans.push({ row: row, column: column - 1 });
        ans.push({ row: row, column: column + 1 })
        ans.push({ row: row - 1, column: column })
        if (row % 2 == 1)
            ans.push({ row: row - 1, column: column - 1 })
        else
            ans.push({ row: row - 1, column: column + 1 })
        ans.push({ row: row + 1, column: column })
        if (row % 2 == 1)
            ans.push({ row: row + 1, column: column - 1 })
        else
            ans.push({ row: row + 1, column: column + 1 })
        return ans;
    }
}