const exec = Meteor.wrapAsync(require('child_process').exec);

var output;
class ValidateVersion {
    processFilesForTarget(files) {
        // if (!Meteor.isProduction) {
        //     return;
        // }
        if (typeof output !== 'string') {
            try {
                output = exec('git log -1 --format="%D @%h"');
            } catch (e) {
                output = '';
            }
            output = output.replace(/HEAD|[\n\r"]|(?:^|\s+)?%D\s/g, '');
            output = output.replace(/^\s\->\s/g, '');
            output = 'SiteVersion = "' + output + '";';
        }
        files.forEach(function (file) {
            file.addJavaScript({data: output, path: file.getPathInPackage() + '.js'});
        });

    }
}

Plugin.registerCompiler({
    extensions: [],
    filenames: ['saving_git_info_in_bundle.js']
}, ()=> new ValidateVersion());