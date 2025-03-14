// UtilsDeviceSensors.js
// Version 4

.pragma library

.import DeviceUtils as DeviceUtils
.import ComponentLibrary as ThemeEngine

/* ************************************************************************** */

function isDeviceSupported(deviceName) {
    if (deviceName === "Flower care" || deviceName === "Flower power" ||
        deviceName === "Flower mate" || deviceName === "TY" ||
        deviceName === "Grow care garden" ||
        deviceName === "ropot" || deviceName === "Parrot pot" ||
        deviceName === "HiGrow" ||
        deviceName === "ThermoBeacon" ||
        deviceName === "MJ_HT_V1" ||
        deviceName === "LYWSD02" || deviceName === "MHO-C303" ||
        deviceName === "LYWSD03MMC" || deviceName === "MHO-C401" || deviceName === "XMWSDJO4MMC" ||
        deviceName === "ClearGrass Temp & RH" || deviceName === "Qingping Temp & RH M" ||
        deviceName === "Qingping Temp RH Lite" ||
        deviceName === "Qingping Alarm Clock" || deviceName === "Qingping Temp RH Barometer" ||
        deviceName === "Qingping Air Monitor Lite" ||
        deviceName === "WP6003" || deviceName === "JQJCY01YM" || deviceName === "AirQualityMonitor" ||
        deviceName === "GeigerCounter")
        return true

    if (deviceName.startsWith("Flower power") || deviceName.startsWith("Parrot pot") ||
        deviceName.startsWith("6003#"))
        return true

    return false
}

/* ************************************************************************** */

function getDeviceImage(deviceName) {
    if (deviceName === "Flower care") return "qrc:/devices/flowercare.svg"
    if (deviceName === "TY") return "qrc:/devices/flowercare.svg"
    if (deviceName === "Grow care garden") return "qrc:/devices/flowercaremax.svg"
    if (deviceName === "Flower power") return "qrc:/devices/flowerpower.svg"
    if (deviceName === "Parrot pot") return "qrc:/devices/parrotpot.svg"
    if (deviceName === "ropot") return "qrc:/devices/ropot.svg"
    if (deviceName === "HiGrow") return "qrc:/devices/higrow.svg"

    if (deviceName === "MHO-C303") return "qrc:/devices/hygrotemp_alarm.svg"
    if (deviceName === "Qingping Alarm Clock") return "qrc:/devices/hygrotemp_cgd1.svg"
    if (deviceName === "Qingping Temp RH Lite") return "qrc:/devices/hygrotemp_cgdk2.svg"
    if (deviceName === "ClearGrass Temp & RH") return "qrc:/devices/hygrotemp_cgg1.svg"
    if (deviceName === "Qingping Temp & RH") return "qrc:/devices/hygrotemp_cgg1.svg"
    if (deviceName === "Qingping Temp RH Barometer") return "qrc:/devices/hygrotemp_cgp1w.svg"
    if (deviceName === "LYWSD02") return "qrc:/devices/hygrotemp_clock.svg"
    if (deviceName === "LYWSD03MMC") return "qrc:/devices/hygrotemp_lywsd03mmc.svg"
    if (deviceName === "MJ_HT_V1") return "qrc:/devices/hygrotemp_lywsdcgq.svg"
    if (deviceName === "MHO-C401") return "qrc:/devices/hygrotemp_mhoc401.svg"
    if (deviceName === "XMWSDJO4MMC") return "qrc:/devices/hygrotemp_xmwsdjo4mmc.svg"
    if (deviceName === "ThermoBeacon") return "qrc:/devices/thermobeacon_round.svg"

    if (deviceName === "WP6003") return "qrc:/devices/wp6003.svg"
    if (deviceName === "JQJCY01YM") return "qrc:/devices/jqjcy01ym.svg"
    if (deviceName === "Qingping Air Monitor Lite") return "qrc:/devices/cgdn1.svg"

    return ""
}

function getDeviceIcon(device, devicePlanted) {
    var src = ""
    var deviceName = device.deviceName

    if (device.isPlantSensor) {
        if (devicePlanted) {
            if (deviceName === "ropot" || deviceName === "Parrot pot")
                src = "qrc:/assets/gfx/icons/pot_flower-24px.svg"
            else
                src = "qrc:/IconLibrary/material-symbols/sensors/local_florist.svg"
        } else {
            if (deviceName === "ropot" || deviceName === "Parrot pot")
                src = "qrc:/assets/gfx/icons/pot_empty-24px.svg"
            else
                src = "qrc:/IconLibrary/material-symbols/hardware/settings_remote.svg"
        }
    } else if (device.isThermometer) {
        if (deviceName === "ThermoBeacon" ||
            deviceName === "MJ_HT_V1" ||
            deviceName === "ClearGrass Temp & RH" || deviceName === "Qingping Temp & RH M" ||
            deviceName === "Qingping Temp RH Lite") {
            src = "qrc:/IconLibrary/material-symbols/circle.svg"
        } else if (deviceName === "LYWSD02" ||
                   deviceName === "MHO-C303") {
            src = "qrc:/IconLibrary/material-symbols/crop_16_9.svg"
        } else if (deviceName === "LYWSD03MMC" ||
                   deviceName === "MHO-C401" ||
                   deviceName === "XMWSDJO4MMC") {
            src = "qrc:/IconLibrary/material-symbols/crop_square.svg"
        } else if (deviceName === "Qingping Alarm Clock" ||
                   deviceName === "Qingping Temp RH Barometer") {
            src = "qrc:/IconLibrary/material-icons/duotone/timer.svg"
        } else {
            src = "qrc:/IconLibrary/material-symbols/hardware/settings_remote.svg"
        }
    } else if (device.isEnvironmentalSensor) {
        if (deviceName === "GeigerCounter") {
            src = "qrc:/assets/gfx/icons/nuclear_icon.svg"
        } else {
            src = "qrc:/IconLibrary/material-symbols/hardware/settings_remote.svg"
        }
    } else if (device.isLight) {
        src = "qrc:/assets/icons_material/lightbulb_FILL0_wght400_GRAD0_opsz48.svg"
    } else if (device.isBeacon) {
        src = "qrc:/IconLibrary/material-symbols/sensors.svg"
    } else if (device.isRemote) {
        src = "qrc:/IconLibrary/material-symbols/remote_tv.svg"
    } else if (device.isPGP) {
        src = "qrc:/IconLibrary/material-symbols/pgp.svg"
    } else {
        src = "qrc:/IconLibrary/material-symbols/hardware/settings_remote.svg"
    }

    return src
}

/* ************************************************************************** */

function getDeviceStatusText(deviceStatus) {
    var txt = ""

    if (deviceStatus === DeviceUtils.DeviceUtils.DEVICE_OFFLINE) {
        txt = qsTr("Offline")
    } else if (deviceStatus === DeviceUtils.DeviceUtils.DEVICE_QUEUED) {
        txt = qsTr("Queued")
    } else if (deviceStatus === DeviceUtils.DeviceUtils.DEVICE_DISCONNECTING) {
        txt = qsTr("Disconnecting...")
    } else if (deviceStatus === DeviceUtils.DeviceUtils.DEVICE_CONNECTING) {
        txt = qsTr("Connecting...")
    } else if (deviceStatus === DeviceUtils.DeviceUtils.DEVICE_CONNECTED) {
        txt = qsTr("Connected")
    } else if (deviceStatus === DeviceUtils.DeviceUtils.DEVICE_WORKING) {
        txt = qsTr("Working...")
    } else if (deviceStatus === DeviceUtils.DeviceUtils.DEVICE_UPDATING) {
        txt = qsTr("Updating...")
    } else if (deviceStatus === DeviceUtils.DeviceUtils.DEVICE_UPDATING_HISTORY) {
        txt = qsTr("Syncing...")
    } else if (deviceStatus === DeviceUtils.DeviceUtils.DEVICE_UPDATING_REALTIME) {
        txt = qsTr("Realtime data")
    }

    return txt + " "
}

function getDeviceStatusColor(deviceStatus) {
    var clr = ""

    if (deviceStatus === DeviceUtils.DeviceUtils.DEVICE_OFFLINE) {
        clr = ThemeEngine.Theme.colorRed
    } else if (deviceStatus === DeviceUtils.DeviceUtils.DEVICE_QUEUED ||
               deviceStatus === DeviceUtils.DeviceUtils.DEVICE_DISCONNECTING ||
               deviceStatus === DeviceUtils.DeviceUtils.DEVICE_CONNECTING) {
        clr = ThemeEngine.Theme.colorYellow
    } else if (deviceStatus === DeviceUtils.DeviceUtils.DEVICE_CONNECTED) {
        clr = ThemeEngine.Theme.colorGreen
    } else if (deviceStatus === DeviceUtils.DeviceUtils.DEVICE_WORKING) {
        clr = ThemeEngine.Theme.colorYellow
    } else if (deviceStatus === DeviceUtils.DeviceUtils.DEVICE_UPDATING ||
               deviceStatus === DeviceUtils.DeviceUtils.DEVICE_UPDATING_HISTORY ||
               deviceStatus === DeviceUtils.DeviceUtils.DEVICE_UPDATING_REALTIME) {
        clr = ThemeEngine.Theme.colorYellow
    }

    return clr
}

function getDeviceStatusIcon(deviceStatus) {
    var src = "qrc:/IconLibrary/material-symbols/outlined/bluetooth.svg"

    if (deviceStatus === DeviceUtils.DeviceUtils.DEVICE_OFFLINE) {
        src = "qrc:/IconLibrary/material/bluetooth_disabled.svg"
    } else if (deviceStatus === DeviceUtils.DeviceUtils.DEVICE_QUEUED ||
               deviceStatus === DeviceUtils.DeviceUtils.DEVICE_DISCONNECTING ||
               deviceStatus === DeviceUtils.DeviceUtils.DEVICE_CONNECTING) {
        src = "qrc:/IconLibrary/material-icons/duotone/settings_bluetooth.svg"
    } else if (deviceStatus === DeviceUtils.DeviceUtils.DEVICE_CONNECTED) {
        src = "qrc:/IconLibrary/material-icons/duotone/bluetooth_connected.svg"
    } else if (deviceStatus === DeviceUtils.DeviceUtils.DEVICE_WORKING ||
               deviceStatus === DeviceUtils.DeviceUtils.DEVICE_UPDATING ||
               deviceStatus === DeviceUtils.DeviceUtils.DEVICE_UPDATING_HISTORY ||
               deviceStatus === DeviceUtils.DeviceUtils.DEVICE_UPDATING_REALTIME) {
        src = "qrc:/IconLibrary/material-icons/duotone/bluetooth_searching.svg"
    }

    return src
}

/* ************************************************************************** */

function getDeviceBatteryIcon(batteryLevel) {
    var src = ""

    if (batteryLevel > 95) {
        src = "qrc:/IconLibrary/material-icons/duotone/battery_full.svg";
    } else if (batteryLevel > 85) {
        src = "qrc:/IconLibrary/material-icons/duotone/battery_90.svg";
    } else if (batteryLevel > 75) {
        src = "qrc:/IconLibrary/material-icons/duotone/battery_80.svg";
    } else if (batteryLevel > 65) {
        src = "qrc:/IconLibrary/material-icons/duotone/battery_70.svg";
    } else if (batteryLevel > 55) {
        src = "qrc:/IconLibrary/material-icons/duotone/battery_60.svg";
    } else if (batteryLevel > 45) {
        src = "qrc:/IconLibrary/material-icons/duotone/battery_50.svg";
    } else if (batteryLevel > 35) {
        src = "qrc:/IconLibrary/material-icons/duotone/battery_40.svg";
    } else if (batteryLevel > 25) {
        src = "qrc:/IconLibrary/material-icons/duotone/battery_30.svg";
    } else if (batteryLevel > 15) {
        src = "qrc:/IconLibrary/material-icons/duotone/battery_20.svg";
    } else if (batteryLevel > 1) {
        src = "qrc:/IconLibrary/material-icons/duotone/battery_10.svg";
    } else if (batteryLevel >= 0) {
        src = "qrc:/IconLibrary/material-icons/duotone/battery_unknown.svg";
    }

    return src
}

function getDeviceBatteryColor(batteryLevel) {
    var clr = ""

    if (batteryLevel <= 0) {
        clr = ThemeEngine.Theme.colorRed
    } else if (batteryLevel <= 10) {
        clr = ThemeEngine.Theme.colorYellow
    } else {
        clr = ThemeEngine.Theme.colorIcon
    }

    return clr
}

/* ************************************************************************** */

function getDeviceCapabilityName(capabilityId) {
    var name = ""

    if (capabilityId === DeviceUtils.DeviceUtils.DEVICE_REALTIME) {
        name = qsTr("Realtime")
    } else if (capabilityId === DeviceUtils.DeviceUtils.DEVICE_HISTORY) {
        name = qsTr("History")
    } else if (capabilityId === DeviceUtils.DeviceUtils.DEVICE_BATTERY) {
        name = qsTr("Battery")
    } else if (capabilityId === DeviceUtils.DeviceUtils.DEVICE_CLOCK) {
        name = qsTr("Clock")
    } else if (capabilityId === DeviceUtils.DeviceUtils.DEVICE_LED_STATUS) {
        name = qsTr("LED status")
    } else if (capabilityId === DeviceUtils.DeviceUtils.DEVICE_LED_RGB) {
        name = qsTr("LED RGB")
    } else if (capabilityId === DeviceUtils.DeviceUtils.DEVICE_BUTTONS) {
        name = qsTr("Buttons")
    } else if (capabilityId === DeviceUtils.DeviceUtils.DEVICE_LAST_MOVE) {
        name = qsTr("Last move")
    } else if (capabilityId === DeviceUtils.DeviceUtils.DEVICE_WATER_TANK) {
        name = qsTr("Watering")
    } else if (capabilityId === DeviceUtils.DeviceUtils.DEVICE_CALIBRATION) {
        name = qsTr("Calibration")
    } else if (capabilityId === DeviceUtils.DeviceUtils.DEVICE_REBOOT) {
        name = qsTr("Reboot")
    }
    return name
}

function getDeviceCapabilityIcon(capabilityId) {
    var src = ""

    if (capabilityId === DeviceUtils.DeviceUtils.DEVICE_REALTIME) {
        src = "qrc:/IconLibrary/material-icons/duotone/update.svg"
    } else if (capabilityId === DeviceUtils.DeviceUtils.DEVICE_HISTORY) {
        src = "qrc:/assets/gfx/icons/duotone-date_all-24px.svg"
    } else if (capabilityId === DeviceUtils.DeviceUtils.DEVICE_BATTERY) {
        src = "qrc:/IconLibrary/material-symbols/battery_full.svg"
    } else if (capabilityId === DeviceUtils.DeviceUtils.DEVICE_CLOCK) {
        src = "qrc:/IconLibrary/material-icons/duotone/timer.svg"
    } else if (capabilityId === DeviceUtils.DeviceUtils.DEVICE_LED_STATUS) {
        src = "qrc:/IconLibrary/material-symbols/backlight_low.svg"
    } else if (capabilityId === DeviceUtils.DeviceUtils.DEVICE_LED_RGB) {
        src = "qrc:/IconLibrary/material-icons/duotone/emoji_objects.svg"
    } else if (capabilityId === DeviceUtils.DeviceUtils.DEVICE_BUTTONS) {
        src = "qrc:/IconLibrary/material-icons/duotone/touch_app.svg"
    } else if (capabilityId === DeviceUtils.DeviceUtils.DEVICE_LAST_MOVE) {
        src = "qrc:/IconLibrary/material-icons/duotone/pin_drop.svg"
    } else if (capabilityId === DeviceUtils.DeviceUtils.DEVICE_WATER_TANK) {
        src = "qrc:/IconLibrary/material-icons/duotone/local_drink.svg"
    } else if (capabilityId === DeviceUtils.DeviceUtils.DEVICE_CALIBRATION) {
        src = "qrc:/IconLibrary/material-icons/duotone/model_training.svg"
    } else if (capabilityId === DeviceUtils.DeviceUtils.DEVICE_REBOOT) {
        src = "qrc:/IconLibrary/material-icons/duotone/restart_alt.svg"
    }

    return src
}

/* ************************************************************************** */

function getDeviceSensorName(sensorId) {
    var name = ""

    if (sensorId === DeviceUtils.DeviceUtils.SENSOR_SOIL_MOISTURE) {
        name = qsTr("Soil moisture")
    } else if (sensorId === DeviceUtils.DeviceUtils.SENSOR_SOIL_CONDUCTIVITY) {
        name = qsTr("Soil conductivity")
    } else if (sensorId === DeviceUtils.DeviceUtils.SENSOR_SOIL_TEMPERATURE) {
        name = qsTr("Soil temperature")
    } else if (sensorId === DeviceUtils.DeviceUtils.SENSOR_SOIL_PH) {
        name = qsTr("Soil PH")
    } else if (sensorId === DeviceUtils.DeviceUtils.SENSOR_TEMPERATURE) {
        name = qsTr("Temperature")
    } else if (sensorId === DeviceUtils.DeviceUtils.SENSOR_HUMIDITY) {
        name = qsTr("Humididty")
    } else if (sensorId === DeviceUtils.DeviceUtils.SENSOR_PRESSURE) {
        name = qsTr("Pressure")
    } else if (sensorId === DeviceUtils.DeviceUtils.SENSOR_LUMINOSITY) {
        name = qsTr("Luminosity")
    } else if (sensorId === DeviceUtils.DeviceUtils.SENSOR_UV) {
        name = qsTr("UV luminosity")
    } else if (sensorId === DeviceUtils.DeviceUtils.SENSOR_SOUND) {
        name = qsTr("Sound")
    } else if (sensorId === DeviceUtils.DeviceUtils.SENSOR_WATER_LEVEL) {
        name = qsTr("Water level")
    } else if (sensorId === DeviceUtils.DeviceUtils.SENSOR_WIND_DIRECTION) {
        name = qsTr("Wind direction")
    } else if (sensorId === DeviceUtils.DeviceUtils.SENSOR_WIND_SPEED) {
        name = qsTr("Wind speed")
    } else if (sensorId === DeviceUtils.DeviceUtils.SENSOR_PM1) {
        name = qsTr("PM1")
    } else if (sensorId === DeviceUtils.DeviceUtils.SENSOR_PM25) {
        name = qsTr("PM2.5")
    } else if (sensorId === DeviceUtils.DeviceUtils.SENSOR_PM10) {
        name = qsTr("PM10")
    } else if (sensorId === DeviceUtils.DeviceUtils.SENSOR_O2) {
        name = qsTr("O2")
    } else if (sensorId === DeviceUtils.DeviceUtils.SENSOR_O3) {
        name = qsTr("O3")
    } else if (sensorId === DeviceUtils.DeviceUtils.SENSOR_CO) {
        name = qsTr("CO")
    } else if (sensorId === DeviceUtils.DeviceUtils.SENSOR_CO2) {
        name = qsTr("CO2")
    } else if (sensorId === DeviceUtils.DeviceUtils.SENSOR_eCO2) {
        name = qsTr("eCO2")
    } else if (sensorId === DeviceUtils.DeviceUtils.SENSOR_NO2) {
        name = qsTr("NO2")
    } else if (sensorId === DeviceUtils.DeviceUtils.SENSOR_SO2) {
        name = qsTr("SO2")
    } else if (sensorId === DeviceUtils.DeviceUtils.SENSOR_VOC) {
        name = qsTr("VOC")
    } else if (sensorId === DeviceUtils.DeviceUtils.SENSOR_HCHO) {
        name = qsTr("HCHO")
    } else if (sensorId === DeviceUtils.DeviceUtils.SENSOR_GEIGER) {
        name = qsTr("Geiger Counter")
    }

    return name
}

function getDeviceSensorIcon(sensorId) {
    var src = ""

    if (sensorId === DeviceUtils.DeviceUtils.SENSOR_SOIL_MOISTURE) {
        src = "qrc:/IconLibrary/material-icons/duotone/water_mid.svg"
    } else if (sensorId === DeviceUtils.DeviceUtils.SENSOR_SOIL_CONDUCTIVITY) {
        src = "qrc:/IconLibrary/material-symbols/sensors/tonality.svg"
    } else if (sensorId === DeviceUtils.DeviceUtils.SENSOR_SOIL_TEMPERATURE) {
        src = "qrc:/IconLibrary/material-symbols/sensors/airware.svg"
    } else if (sensorId === DeviceUtils.DeviceUtils.SENSOR_SOIL_PH) {
        src = "qrc:/IconLibrary/material-symbols/sensors/tonality.svg"
    } else if (sensorId === DeviceUtils.DeviceUtils.SENSOR_TEMPERATURE) {
        src = "qrc:/assets/gfx/icons/thermometer_big-24px.svg"
    } else if (sensorId === DeviceUtils.DeviceUtils.SENSOR_HUMIDITY) {
        src = "qrc:/IconLibrary/material-icons/duotone/water_full.svg"
    } else if (sensorId === DeviceUtils.DeviceUtils.SENSOR_PRESSURE) {
        src = "qrc:/IconLibrary/material-icons/duotone/speed.svg"
    } else if (sensorId === DeviceUtils.DeviceUtils.SENSOR_LUMINOSITY) {
        src = "qrc:/IconLibrary/material-icons/duotone/wb_sunny.svg"
    } else if (sensorId === DeviceUtils.DeviceUtils.SENSOR_UV) {
        src = "qrc:/IconLibrary/material-icons/duotone/wb_sunny.svg"
    } else if (sensorId === DeviceUtils.DeviceUtils.SENSOR_SOUND) {
        src = "qrc:/IconLibrary/material-icons/duotone/mic.svg"
    } else if (sensorId === DeviceUtils.DeviceUtils.SENSOR_WATER_LEVEL) {
        src = "qrc:/IconLibrary/material-icons/duotone/local_drink.svg"
    } else if (sensorId === DeviceUtils.DeviceUtils.SENSOR_WIND_DIRECTION) {
        src = "qrc:/IconLibrary/material-symbols/near_me.svg"
    } else if (sensorId === DeviceUtils.DeviceUtils.SENSOR_WIND_SPEED) {
        src = "qrc:/IconLibrary/material-symbols/sensors/air.svg"
    } else if (sensorId === DeviceUtils.DeviceUtils.SENSOR_PM1) {
        src = "qrc:/IconLibrary/material-symbols/sensors/bubble_chart.svg"
    } else if (sensorId === DeviceUtils.DeviceUtils.SENSOR_PM25) {
        src = "qrc:/IconLibrary/material-symbols/sensors/bubble_chart.svg"
    } else if (sensorId === DeviceUtils.DeviceUtils.SENSOR_PM10) {
        src = "qrc:/IconLibrary/material-symbols/sensors/bubble_chart.svg"
    } else if (sensorId === DeviceUtils.DeviceUtils.SENSOR_O2) {
        src = "qrc:/IconLibrary/material-symbols/sensors/air.svg"
    } else if (sensorId === DeviceUtils.DeviceUtils.SENSOR_O3) {
        src = "qrc:/IconLibrary/material-symbols/sensors/air.svg"
    } else if (sensorId === DeviceUtils.DeviceUtils.SENSOR_CO) {
        src = "qrc:/IconLibrary/material-symbols/sensors/detector_co.svg"
    } else if (sensorId === DeviceUtils.DeviceUtils.SENSOR_CO2) {
        src = "qrc:/IconLibrary/material-symbols/sensors/co2.svg"
    } else if (sensorId === DeviceUtils.DeviceUtils.SENSOR_eCO2) {
        src = "qrc:/IconLibrary/material-symbols/sensors/co2.svg"
    } else if (sensorId === DeviceUtils.DeviceUtils.SENSOR_NO2) {
        src = "qrc:/IconLibrary/material-symbols/sensors/air.svg"
    } else if (sensorId === DeviceUtils.DeviceUtils.SENSOR_SO2) {
        src = "qrc:/IconLibrary/material-symbols/sensors/air.svg"
    } else if (sensorId === DeviceUtils.DeviceUtils.SENSOR_VOC) {
        src = "qrc:/IconLibrary/material-symbols/sensors/air.svg"
    } else if (sensorId === DeviceUtils.DeviceUtils.SENSOR_HCHO) {
        src = "qrc:/IconLibrary/material-symbols/sensors/air.svg"
    } else if (sensorId === DeviceUtils.DeviceUtils.SENSOR_GEIGER) {
        src = "qrc:/assets/gfx/icons/nuclear_icon.svg"
    }

    return src
}

/* ************************************************************************** */
