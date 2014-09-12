cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/org.apache.cordova.device/www/device.js",
        "id": "org.apache.cordova.device.device",
        "clobbers": [
            "device"
        ]
    },
    {
        "file": "plugins/com.red_folder.phonegap.plugin.backgroundservice/www/backgroundService.js",
        "id": "com.red_folder.phonegap.plugin.backgroundservice.BackgroundService"
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "org.apache.cordova.device": "0.2.12-dev",
    "com.red_folder.phonegap.plugin.backgroundservice": "2.0.0"
}
// BOTTOM OF METADATA
});