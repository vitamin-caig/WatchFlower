import QtQuick 2.15
import QtQuick.Controls 2.15

import ThemeEngine 1.0

Drawer {
    width: parent.width*0.8
    height: parent.height

    ////////////////////////////////////////////////////////////////////////////

    background: Rectangle {
        color: Theme.colorBackground

        Rectangle {
            x: parent.width - 1
            width: 1
            height: parent.height
            color: Theme.colorSeparator
        }
    }

    ////////////////////////////////////////////////////////////////////////////

    contentItem: Item {

        Column {
            id: rectangleHeader
            anchors.top: parent.top
            anchors.left: parent.left
            anchors.right: parent.right
            z: 5

            Connections {
                target: appWindow
                function onScreenPaddingStatusbarChanged() { rectangleHeader.updateIOSHeader() }
            }
            Connections {
                target: ThemeEngine
                function onCurrentThemeChanged() { rectangleHeader.updateIOSHeader() }
            }

            function updateIOSHeader() {
                if (Qt.platform.os === "ios") {
                    if (screenPaddingStatusbar !== 0 && Theme.currentTheme === ThemeEngine.THEME_NIGHT)
                        rectangleStatusbar.height = screenPaddingStatusbar
                    else
                        rectangleStatusbar.height = 0
                }
            }

            ////////

            Rectangle {
                id: rectangleStatusbar
                height: screenPaddingStatusbar
                anchors.left: parent.left
                anchors.right: parent.right
                color: Theme.colorBackground // "red" // to hide flickable content
            }
            Rectangle {
                id: rectangleNotch
                height: screenPaddingNotch
                anchors.left: parent.left
                anchors.right: parent.right
                color: Theme.colorBackground // "yellow" // to hide flickable content
            }
            Rectangle {
                id: rectangleLogo
                height: 80
                anchors.left: parent.left
                anchors.right: parent.right
                color: Theme.colorBackground

                Image {
                    id: imageHeader
                    width: 40
                    height: 40
                    anchors.left: parent.left
                    anchors.leftMargin: 12
                    anchors.verticalCenter: parent.verticalCenter
                    source: "qrc:/assets/logos/logo.svg"
                }
                Text {
                    id: textHeader
                    anchors.left: imageHeader.right
                    anchors.leftMargin: 10
                    anchors.verticalCenter: parent.verticalCenter
                    anchors.verticalCenterOffset: 2

                    text: "WatchFlower"
                    color: Theme.colorText
                    font.bold: true
                    font.pixelSize: 22
                }
            }
        }
        MouseArea { anchors.fill: rectangleHeader; acceptedButtons: Qt.AllButtons; }

        ////////////////////////////////////////////////////////////////////////////

        Flickable {
            anchors.top: rectangleHeader.bottom
            anchors.left: parent.left
            anchors.right: parent.right
            anchors.bottom: parent.bottom

            contentWidth: -1
            contentHeight: column.height

            Column {
                id: column
                anchors.left: parent.left
                anchors.right: parent.right

                ////////

                Rectangle {
                    id: rectangleHome
                    height: 48
                    anchors.left: parent.left
                    anchors.right: parent.right
                    color: (appContent.state === "DeviceList") ? Theme.colorForeground : Theme.colorBackground

                    MouseArea {
                        anchors.fill: parent
                        onClicked: {
                            appContent.state = "DeviceList"
                            appDrawer.close()
                        }
                    }

                    IconSvg {
                        width: 24
                        height: 24
                        anchors.left: parent.left
                        anchors.leftMargin: screenPaddingLeft + 16
                        anchors.verticalCenter: parent.verticalCenter

                        source: "qrc:/assets/logos/watchflower_tray_dark.svg"
                        color: Theme.colorText
                    }
                    Label {
                        anchors.left: parent.left
                        anchors.leftMargin: screenPaddingLeft + 56
                        anchors.verticalCenter: parent.verticalCenter

                        text: qsTr("Sensors")
                        font.pixelSize: 13
                        font.bold: true
                        color: Theme.colorText
                    }
                }

                ////////

                Rectangle {
                    id: rectangleSettings
                    height: 48
                    anchors.left: parent.left
                    anchors.right: parent.right
                    color: (appContent.state === "Settings") ? Theme.colorForeground : Theme.colorBackground

                    MouseArea {
                        anchors.fill: parent
                        onClicked: {
                            appContent.state = "Settings"
                            appDrawer.close()
                        }
                    }

                    IconSvg {
                        width: 24
                        height: 24
                        anchors.left: parent.left
                        anchors.leftMargin: screenPaddingLeft + 16
                        anchors.verticalCenter: parent.verticalCenter

                        source: "qrc:/assets/icons_material/outline-settings-24px.svg"
                        color: Theme.colorText
                    }
                    Label {
                        anchors.left: parent.left
                        anchors.leftMargin: screenPaddingLeft + 56
                        anchors.verticalCenter: parent.verticalCenter

                        text: qsTr("Settings")
                        font.pixelSize: 13
                        font.bold: true
                        color: Theme.colorText
                    }
                }

                Rectangle {
                    id: rectangleAbout
                    height: 48
                    anchors.right: parent.right
                    anchors.left: parent.left
                    color: (appContent.state === "About") ? Theme.colorForeground : Theme.colorBackground

                    MouseArea {
                        anchors.fill: parent
                        onClicked: {
                            appContent.state = "About"
                            appDrawer.close()
                        }
                    }

                    IconSvg {
                        width: 24
                        height: 24
                        anchors.left: parent.left
                        anchors.leftMargin: screenPaddingLeft + 16
                        anchors.verticalCenter: parent.verticalCenter

                        source: "qrc:/assets/icons_material/outline-info-24px.svg"
                        color: Theme.colorText
                    }
                    Label {
                        anchors.left: parent.left
                        anchors.leftMargin: screenPaddingLeft + 56
                        anchors.verticalCenter: parent.verticalCenter

                        text: qsTr("About")
                        font.pixelSize: 13
                        font.bold: true
                        color: Theme.colorText
                    }
                }

                ////////

                Item { // spacer
                    height: 8
                    anchors.right: parent.right
                    anchors.left: parent.left
                }
                Rectangle {
                    height: 1
                    anchors.right: parent.right
                    anchors.left: parent.left
                    color: Theme.colorSeparator
                }
                Item {
                    height: 8
                    anchors.right: parent.right
                    anchors.left: parent.left
                }

                ////////

                Item {
                    id: rectangleOrderBy
                    height: 48
                    anchors.right: parent.right
                    anchors.left: parent.left

                    MouseArea {
                        anchors.fill: parent

                        property var sortmode: {
                            if (settingsManager.orderBy === "waterlevel") {
                                return 3
                            } else if (settingsManager.orderBy === "plant") {
                                return 2
                            } else if (settingsManager.orderBy === "model") {
                                return 1
                            } else { // if (settingsManager.orderBy === "location") {
                                return 0
                            }
                        }

                        onClicked: {
                            sortmode++
                            if (sortmode > 3) sortmode = 0

                            if (sortmode === 0) {
                                settingsManager.orderBy = "location"
                                deviceManager.orderby_location()
                            } else if (sortmode === 1) {
                                settingsManager.orderBy = "model"
                                deviceManager.orderby_model()
                            } else if (sortmode === 2) {
                                settingsManager.orderBy = "plant"
                                deviceManager.orderby_plant()
                            } else if (sortmode === 3) {
                                settingsManager.orderBy = "waterlevel"
                                deviceManager.orderby_waterlevel()
                            }
                        }
                    }

                    IconSvg {
                        width: 24
                        height: 24
                        anchors.left: parent.left
                        anchors.leftMargin: screenPaddingLeft + 16
                        anchors.verticalCenter: parent.verticalCenter

                        source: "qrc:/assets/icons_material/baseline-sort-24px.svg"
                        color: Theme.colorText
                    }
                    Label {
                        id: textOrderBy
                        anchors.left: parent.left
                        anchors.leftMargin: screenPaddingLeft + 56
                        anchors.verticalCenter: parent.verticalCenter

                        function setText() {
                            var txt = qsTr("Order by:") + " "
                            if (settingsManager.orderBy === "waterlevel") {
                                txt += qsTr("water level")
                            } else if (settingsManager.orderBy === "plant") {
                                txt += qsTr("plant name")
                            } else if (settingsManager.orderBy === "model") {
                                txt += qsTr("sensor model")
                            } else if (settingsManager.orderBy === "location") {
                                txt += qsTr("location")
                            }
                            textOrderBy.text = txt
                        }

                        Component.onCompleted: textOrderBy.setText()
                        Connections {
                            target: settingsManager
                            function onOrderByChanged() { textOrderBy.setText() }
                            function onAppLanguageChanged() { textOrderBy.setText() }
                        }

                        font.pixelSize: 13
                        font.bold: true
                        color: Theme.colorText
                    }
                }

                ////////

                Item { // spacer
                    height: 8
                    anchors.right: parent.right
                    anchors.left: parent.left
                }
                Rectangle {
                    height: 1
                    anchors.right: parent.right
                    anchors.left: parent.left
                    color: Theme.colorSeparator
                }
                Item {
                    height: 8
                    anchors.right: parent.right
                    anchors.left: parent.left
                }

                ////////

                Item {
                    id: rectangleRefresh
                    height: 48
                    anchors.left: parent.left
                    anchors.right: parent.right

                    enabled: (deviceManager.bluetooth && !deviceManager.scanning)

                    MouseArea {
                        anchors.fill: parent
                        onClicked: {
                            if (!deviceManager.scanning) {
                                if (deviceManager.updating) {
                                    deviceManager.refreshDevices_stop()
                                } else {
                                    deviceManager.refreshDevices_start()
                                }
                                appDrawer.close()
                            }
                        }
                    }

                    IconSvg {
                        id: buttonRefresh
                        width: 24
                        height: 24
                        anchors.left: parent.left
                        anchors.leftMargin: screenPaddingLeft + 16
                        anchors.verticalCenter: parent.verticalCenter

                        source: "qrc:/assets/icons_material/baseline-autorenew-24px.svg"
                        color: rectangleRefresh.enabled ? Theme.colorText : Theme.colorSubText

                        NumberAnimation on rotation {
                            id: refreshAnimation
                            duration: 2000
                            from: 0
                            to: 360
                            loops: Animation.Infinite
                            running: deviceManager.updating
                            alwaysRunToEnd: true
                            easing.type: Easing.Linear
                        }
                    }
                    Label {
                        anchors.left: parent.left
                        anchors.leftMargin: screenPaddingLeft + 56
                        anchors.verticalCenter: parent.verticalCenter

                        text: qsTr("Refresh sensors data")
                        font.pixelSize: 13
                        font.bold: true
                        color: rectangleRefresh.enabled ? Theme.colorText : Theme.colorSubText
                    }
                }

                ////////

                Item {
                    id: rectangleSync
                    height: 48
                    anchors.left: parent.left
                    anchors.right: parent.right

                    enabled: deviceManager.bluetooth && !deviceManager.scanning

                    MouseArea {
                        anchors.fill: parent
                        onClicked: {
                            if (!deviceManager.scanning) {
                                if (deviceManager.syncing) {
                                    deviceManager.syncDevices_stop()
                                } else {
                                    deviceManager.syncDevices_start()
                                }
                                appDrawer.close()
                            }
                        }
                    }

                    IconSvg {
                        id: buttonSync
                        width: 24
                        height: 24
                        anchors.left: parent.left
                        anchors.leftMargin: screenPaddingLeft + 16
                        anchors.verticalCenter: parent.verticalCenter

                        source: "qrc:/assets/icons_custom/duotone-date_all-24px.svg"
                        color: rectangleSync.enabled ? Theme.colorText : Theme.colorSubText

                        SequentialAnimation on opacity {
                            id: syncAnimation
                            loops: Animation.Infinite
                            running: deviceManager.syncing
                            onStopped: buttonRescan.opacity = 1

                            PropertyAnimation { to: 0.33; duration: 750; }
                            PropertyAnimation { to: 1; duration: 750; }
                        }
                    }
                    Label {
                        anchors.left: parent.left
                        anchors.leftMargin: screenPaddingLeft + 56
                        anchors.verticalCenter: parent.verticalCenter

                        text: qsTr("Sync sensors history")
                        font.pixelSize: 13
                        font.bold: true
                        color: rectangleSync.enabled ? Theme.colorText : Theme.colorSubText
                    }
                }

                ////////

                Item {
                    id: rectangleRescan
                    height: 48
                    anchors.left: parent.left
                    anchors.right: parent.right

                    enabled: deviceManager.bluetooth && !deviceManager.updating && !deviceManager.syncing

                    MouseArea {
                        anchors.fill: parent
                        onClicked: {
                            if (!deviceManager.updating) {
                                if (deviceManager.scanning) {
                                    deviceManager.scanDevices_stop()
                                } else {
                                    deviceManager.scanDevices_start()
                                }
                                appDrawer.close()
                            }
                        }
                    }

                    IconSvg {
                        id: buttonRescan
                        width: 24
                        height: 24
                        anchors.left: parent.left
                        anchors.leftMargin: screenPaddingLeft + 16
                        anchors.verticalCenter: parent.verticalCenter

                        source: "qrc:/assets/icons_material/baseline-search-24px.svg"
                        color: rectangleRescan.enabled ? Theme.colorText : Theme.colorSubText

                        SequentialAnimation on opacity {
                            id: rescanAnimation
                            loops: Animation.Infinite
                            running: deviceManager.scanning
                            onStopped: buttonRescan.opacity = 1

                            PropertyAnimation { to: 0.33; duration: 750; }
                            PropertyAnimation { to: 1; duration: 750; }
                        }
                    }
                    Label {
                        anchors.left: parent.left
                        anchors.leftMargin: screenPaddingLeft + 56
                        anchors.verticalCenter: parent.verticalCenter

                        text: qsTr("Search for new sensors")
                        font.pixelSize: 13
                        font.bold: true
                        color: rectangleRescan.enabled ? Theme.colorText : Theme.colorSubText
                    }
                }

                ////////
            }
        }

        ////////////////////////////////////////////////////////////////////////

        Column {
            anchors.left: parent.left
            anchors.right: parent.right
            anchors.bottom: parent.bottom

            Rectangle {
                id: rectangleDeviceBrowser
                height: 48
                anchors.right: parent.right
                anchors.left: parent.left
                color: (appContent.state === "DeviceBrowser") ? Theme.colorForeground : Theme.colorBackground

                MouseArea {
                    anchors.fill: parent
                    onClicked: {
                        screenDeviceBrowser.open()
                        appDrawer.close()
                    }
                }

                IconSvg {
                    width: 24
                    height: 24
                    anchors.left: parent.left
                    anchors.leftMargin: screenPaddingLeft + 16
                    anchors.verticalCenter: parent.verticalCenter

                    source: "qrc:/assets/icons_material/baseline-radar-24px.svg"
                    color: Theme.colorText
                }
                Label {
                    anchors.left: parent.left
                    anchors.leftMargin: screenPaddingLeft + 56
                    anchors.verticalCenter: parent.verticalCenter

                    text: qsTr("Device browser")
                    font.pixelSize: 13
                    font.bold: true
                    color: Theme.colorText
                }
            }
        }
    }
}
