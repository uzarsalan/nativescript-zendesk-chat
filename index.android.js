var application = require("application");

exports.initChat = function(config){

    if (config.name && config.name !== "" && config.phone && config.phone !== "") {
        let visitorInfo = new com.zopim.android.sdk.model.VisitorInfo.Builder()
            .name(config.name)
            .phoneNumber(config.phone)
            .build();
        com.zopim.android.sdk.api.ZopimChat.setVisitorInfo(visitorInfo);
        
        com.zopim.android.sdk.api.ZopimChat.init(config.accountKey)
            .emailTranscript(com.zopim.android.sdk.prechat.EmailTranscript.DISABLED)
            .build();
    } else {
        let defaultPreChat = new com.zopim.android.sdk.prechat.PreChatForm.Builder()
            .name(com.zopim.android.sdk.prechat.PreChatForm.Field.REQUIRED)
            .email(com.zopim.android.sdk.prechat.PreChatForm.Field.REQUIRED)
            .build();

        // initialize the chat with global configuration
        com.zopim.android.sdk.api.ZopimChat.init(config.accountKey)
            .emailTranscript(com.zopim.android.sdk.prechat.EmailTranscript.DISABLED)
            .preChatForm(defaultPreChat)
            .build();
    }

    return this;
}

exports.openChat = function (options) {
    application.android.startActivity.startActivity(new android.content.Intent(application.android.context.getApplicationContext(), com.zopim.android.sdk.prechat.ZopimChatActivity.class));
}
