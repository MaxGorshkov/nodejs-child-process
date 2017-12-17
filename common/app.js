
const path = require('path');

const { spawn } = require('child_process');

run = () => {
    const params = [];
    if (process.argv.length < 3) {
        throw new Error(`wrong arguments ${JSON.stringify(process.argv)}`);
    }
    params.push(path.join(path.dirname(require.main.filename), process.argv[2]));

    if (process.argv.length > 3) {
        params.push(...process.argv.slice(3));
    }

    console.log(params);
    const child = spawn('node', params);
    
    process.stdin.pipe(child.stdin)
    
    child.stdout.on('data', (data) => {
        console.log(`${data}`);
    });
    
    child.stderr.on('data', (data) => {
        console.log(`child stderr:\n${data}`);
    });

    child.on('exit', function (code, signal) {
        console.log(`child process exited with code ${code} and signal ${signal}`);

        if (code) {
            run();
        }
    });
};

run();