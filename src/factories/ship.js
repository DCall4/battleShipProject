const shipFactory = (length) => {

    let hits =[];

    const isSunk = () => {
        if(hits.length === length) {
            return true;
        }
        return false;
    }
    const hit = () => {
        hits.push(1);
        return hits
    }

    return {
        length: length,
        hits: hits,
        isSunk,
        hit,
    }
}

export default shipFactory