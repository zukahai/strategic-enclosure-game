class AlogorithmDFS {
    constructor(data, start) {
        this.data = data;
        this.start = start;
        this.arr = this.data = new Array(data.length).fill(0).map(() => new Array(data.length).fill(99));
        this.dfs(start.row, start.column);
    }

    dfs(row, column) {
        if (this.data[row][column] != 5) {
            let adjacent = this.adjacent(row, column);
            adjacent.forEach((item) => {
                this.arr[item.row][item.column] = this.arr[row][column] + 1;
            });
        }
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
        console.table(this.arr);
        return ans;
    }
}