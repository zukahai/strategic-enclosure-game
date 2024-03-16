class Util {
    static getParameter(paramName) {
        // Lấy URL hiện tại của trình duyệt
        var urlParams = new URLSearchParams(window.location.search);
        var paramValue = urlParams.get(paramName);
        return paramValue;
    }

    static getLevel(maxLevel) {
        let level = Util.getParameter('l');
        level = (level == undefined) ? 0 : level;
        level = (level <= 0) ? 0 : level;
        level = (level >= maxLevel) ? (maxLevel - 1) : level;
        console.log(level);
        return Math.floor(level);
    }
}