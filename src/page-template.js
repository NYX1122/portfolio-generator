const generatePage = (userName, githubName) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="id=edge">
        <title>Portfolio</title>
    </head>

    <body>
        <h1>${userName}</h1>
        <a href="https://github.com/${githubName}"><h2>Github</h2></a>
    </body>
    </html>
    `;
};

module.exports = generatePage;