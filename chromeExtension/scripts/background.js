function checkPermissionsForNotifications(callback, ...props) {
    chrome.permissions.contains({
        permissions: ["notifications"]
    }, function(result) {
        if (callback != undefined && result)
            callback(...props);
        isHasPermissioForNotification = result;
    });
}

function addListener() {
    //Fires when an active tab in a window changes, 
    //URL may not be set at the time the event is fired but we can listen to onUpdated events to check when URL is set
    chrome.tabs.onActivated.addListener(info => {
        chrome.tabs.get(info.tabId, function(tab) {
            activity.addTab(tab); //register the tab
        });
    });

    //Fires when a document including it's resources is completely loaded
    // chrome.webNavigation.onCompleted.addListener(function(details) {
    //     chrome.tabs.get(details.tabId, function(tab) {
    //         activity.updateFavicon(tab);
    //     });
    // });

    //fires when chrome extension is installed or updated
    chrome.runtime.onInstalled.addListener(details => {
        if (details.reason == 'install') {
            storage.saveValue(SETTINGS_SHOW_HINT, SETTINGS_SHOW_HINT_DEFAULT);
            setDefaultSettings();
        }
        if (details.reason == 'update') {
            storage.saveValue(SETTINGS_SHOW_HINT, SETTINGS_SHOW_HINT_DEFAULT);
            checkSettingsImEmpty();
            setDefaultValueForNewSettings();
            isNeedDeleteTimeIntervalFromTabs = true;
        }
    });

    chrome.storage.onChanged.addListener(function(changes, namespace) {
        for (var key in changes) {
            if (key === STORAGE_BLACK_LIST) {
                loadBlackList();
            }
            if (key === STORAGE_RESTRICTION_LIST) {
                loadRestrictionList();
            }
            if (key === STORAGE_NOTIFICATION_LIST) {
                loadNotificationList();
            }
            if (key === STORAGE_NOTIFICATION_MESSAGE) {
                loadNotificationMessage();
            }
            if (key === SETTINGS_INTERVAL_INACTIVITY) {
                storage.getValue(SETTINGS_INTERVAL_INACTIVITY, function(item) { setting_interval_inactivity = item; });
            }
            if (key === SETTINGS_VIEW_TIME_IN_BADGE) {
                storage.getValue(SETTINGS_VIEW_TIME_IN_BADGE, function(item) { setting_view_in_badge = item; });
            }
            if (key === SETTINGS_BLOCK_DEFERRAL) {
                storage.getValue(SETTINGS_BLOCK_DEFERRAL, function(item) { setting_block_deferral = item; });
            }
            if (key === SETTINGS_DARK_MODE) {
                storage.getValue(SETTINGS_DARK_MODE, function(item) { setting_dark_mode = item; });
            }
        }
    });
