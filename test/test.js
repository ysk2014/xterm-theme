const fs = require('fs-extra');
const path = require('path');
const termcolors = require('termcolors');
const globby = require('globby');
const ejs = require('ejs');

// var xresources = fs.readFileSync(
//     path.join(__dirname, './code/Xresources-themes/iterm-Japanesque.Xresources'),
//     'utf8'
// );
// var colors = termcolors.xresources.import(xresources);

// var iterm = JSON.parse(termcolors.json.export(colors));
// console.log(iterm, iterm[0]);
// fs.writeFile('~/config.itermcolors', iterm);

function renderFile(data, filePath, ejsOptions) {
    let source = fs.readFileSync(path.resolve(__dirname, './import.ejs'), 'utf-8');
    let content = ejs.render(source, data, ejsOptions);

    return fs.outputFile(filePath, content);
}

// globby(['*.Xresources'], {
//     cwd: path.resolve(__dirname, './template')
// }).then(files => {
//     files.forEach(file => {
//         // console.log(file);
//         let filePath = path.resolve(__dirname, './template', file);
//         let xresources = fs.readFileSync(filePath, 'utf8');
//         let colors = termcolors.xresources.import(xresources);

//         let data = JSON.parse(termcolors.json.export(colors));

//         let filename = path.basename(filePath, '.Xresources').replace(/^iterm-/, '');

//         renderFile({ data }, path.resolve(__dirname, 'src', filename + '.js'));
//     });
// });
globby(['*.js'], {
    cwd: path.resolve(__dirname, '../src/iterm')
}).then(files => {
    let data = files.map(file => {
        let filePath = path.resolve(__dirname, '../src/iterm', file);
        let filename = path.basename(filePath, '.js');
        return filename;
    });
    renderFile({ data }, path.resolve(__dirname, '../src/index.js'));
});
