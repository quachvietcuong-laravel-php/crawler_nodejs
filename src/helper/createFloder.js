const fs = require('fs');

async function createFloder(path) {
    try {
        if (!fs.existsSync(path)) {
            fs.mkdir(path, { recursive: true }, (error) => {
                if (error) {
                    console.log(error);
                }
            });
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = createFloder;