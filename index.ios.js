var frameModule = require("ui/frame");

exports.initChat = function (config) {
    ZDCChat.initializeWithAccountKey(config.accountKey);
    return this;
}

exports.openChat = function (options) {
    if (options.name && options.name !== "" && options.email && options.email !== "") {
        ZDCChat.startChatInWithConfig(frameModule.topmost().ios.controller, function (config) {
            config.emailTranscriptAction = ZDCEmailTranscriptActionNeverSend;
        });

        ZDCChat.updateVisitor(function (user) {
            user.name = options.name;
            user.email = options.email;
        });
    } else {
        ZDCChat.startChatInWithConfig(frameModule.topmost().ios.controller, function (config) {
            config.preChatDataRequirements.name = ZDCPreChatDataRequired;
            config.preChatDataRequirements.email = ZDCPreChatDataRequired;
            config.emailTranscriptAction = ZDCEmailTranscriptActionNeverSend;
        });
    }
}
