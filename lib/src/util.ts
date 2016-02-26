
export function toArray(jsonResponse) {
    if(!jsonResponse) return null;
    var keys = Object.keys(jsonResponse);
    var result: any[] = [];
    keys.forEach(key => {
        var idx: number = Number(key);
        if(idx + 1) {
            result.push(jsonResponse[key]);
        }
    });
    return result;
}
