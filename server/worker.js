const longComputation = () => {
    let sum = 0;
    for (let l = 0; l < 10; l++) {
        for (let i = 0; i < 1e9; i++) {
            sum += i;
        };
    }
    return sum;
};

const worker = {
    doWork: () => {
        longComputation();
    }
};

process.on('message', (msg) => {
    if (msg === 'longComputation') {
        const sum = longComputation();
        process.send(sum);
    }
    process.send('unknown operation');
});

// module.exports = worker;