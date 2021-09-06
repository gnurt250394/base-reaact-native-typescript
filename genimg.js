// /* eslint-disable func-names */
// /* eslint-disable prefer-rest-params */
// /* eslint-disable guard-for-in */
// /* eslint-disable no-extend-native */
// /**
//  * @flow
//  */
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const argv = require('yargs-parser')(process.argv.slice(2));
// $FlowFixMe
String.prototype.format = function () {
  let a = this;
  for (const k in arguments) {
    // $FlowFixMe
    a = a.replace(`{${k}}`.toRegex('g'), arguments[k]);
  }
  return a;
};
// $FlowFixMe
String.prototype.toRegex = function (option = 'i') {
  let regexStr = this.replace(/[\.\*\+\?\^\$\{\}\(\)\|\[\]\\]/g, '\\$&');
  regexStr = regexStr.replace(/\s/g, '\\s?');
  // console.log('regex: {0}'.format(regexStr))
  return new RegExp(regexStr, option);
};
const getFileName = file => {
  const fileNameMatch = file.match(/^(.+)\.[^\.]+$/);
  return fileNameMatch && fileNameMatch[1].replace(/[\s-\+]+/g, '_');
};
const folder = argv.folder || argv.d || argv._[0];
console.log('folder: ', folder);
const match = folder.match(/^(.+\/([^\/]+))\/?$/);
// $FlowFixMe
let output = match && '{0}/{1}.tsx'.format(match[1], match[2]);
output = argv.output || argv.o || output;
// Default file extension is tsx, but file not contain view tag therefore use the ts extension
output = output.replace('tsx', 'ts');
const outputMatch = output.match(/^(?:(.*)\/)?([^\/]+)$/);
// console.log('outputMatch', outputMatch)
const outputName = outputMatch[2];
const outputPath = outputMatch[1] || '.';
console.log(`${chalk.green('Output: ')}`, outputPath);
const requirePath = path.relative(outputPath, folder);
console.log('requirePath: ', requirePath);
// console.log('requirePath', requirePath)
const author = argv.author || argv.a || 'GNURT';
const template = `/* eslint-disable global-require */\n/**
 * @author {2}
 * @flow
 */
 
 const {0} = {
 {1}
 };
 export default {0};\n`;
// console.log(argv)
const moduleName = argv.name || getFileName(outputName);
console.log('moduleName', moduleName);
const strCodes = [];
const strCodes2 = [];
const handleFile = (folder1, folderName) => {
  fs.readdir(folder1, (err, files) => {
    if (err) {
      return console.error(err);
    }
    files.forEach(file => {
      if (file.match(/@\dx\.(png|jpg)/)) {
        return;
      }
      const fileName = getFileName(file);

      if (fileName) {
        // $FlowFixMe
        if (moduleName == 'fonts') {
          file = file.substring(0, file.lastIndexOf('.'));
          strCodes.push("  {0}: '{2}',".format(fileName, requirePath, file));
        } else {
          let listFileName = strCodes2.filter(
            e =>
              (e.fileName == fileName &&
                e.folderName == folderName &&
                e.file != file) ||
              (e.fileName == fileName &&
                e.folderName != folderName &&
                e.file == file),
          );
          let stringFile = '';
          if (listFileName.length) {
            stringFile = "  {0}: require('{1}/{2}'),".format(
              fileName +
                (folderName ? folderName.replaceAll('/', '_') : '') +
                '_' +
                listFileName.length,
              requirePath + (folderName || ''),
              file,
            );
          } else {
            stringFile = "  {0}: require('{1}/{2}'),".format(
              fileName,
              requirePath + (folderName || ''),
              file,
            );
          }
          strCodes2.push({fileName, folderName, file});
          strCodes.push(stringFile);
          // console.log(strCodes);
        }
      }
    });
    // $FlowFixMe
    const code = template.format(moduleName, strCodes.join('\n'), author);
    console.log(code);
    fs.writeFileSync(output, code);
  });
};

function parseFile(filePath) {
  let content;
  let output = new Promise((resolve, reject) => {
    try {
      // Query the entry
      let stats = fs.lstatSync(filePath);

      // Is it a directory?
      if (stats.isDirectory()) {
        // Yes it is
        let folderName = filePath.split(folder).pop();
        handleFile(filePath, folderName);
      } else if (stats.isFile()) {
        handleFile(folder);
        console.log('stats: ', stats);
      }
    } catch (e) {
      console.log('e: ', e);
      // ...
    }
  });
  return output;
}
if (require.main === module) {
  let dir = path.join(__dirname, folder);
  let files = fs.readdirSync(dir); // gives all the files
  let promises = files.map(file => parseFile(path.join(dir, file))); // gives an array of promises for each file
  Promise.all(promises).then(console.log); // Uses Promise.all and resolves all supplied promises with their results.
  // WIN
}
