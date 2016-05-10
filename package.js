Package.describe({
    name: 'cristo:git-info',
    version: '0.0.1',
    // Brief, one-line summary of the package.
    summary: 'Adds git info to bundle',
    // URL to the Git repository containing the source code for this package.
    git: 'https://github.com/cristo-rabani/git-info',
    // By default, Meteor will default to using README.md for documentation.
    // To avoid submitting documentation, set this field to null.
    documentation: 'README.md'
});

Package.registerBuildPlugin({
    name: 'SiteVersion',
    use: ['ecmascript@0.4.3', 'meteor'],
    sources: ['saving_git_info_in_bundle.js']
});

Package.onUse(function (api) {
    api.versionsFrom('1.3.2.4');
    api.use('isobuild:compiler-plugin@1.0.0');
    api.addFiles("saving_git_info_in_bundle.js", ['client', 'server']);
    api.export(['SiteVersion']);
});
