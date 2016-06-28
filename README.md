# ![Ogame extension logo](/assets/planet.png) **Ogame extension**

## 1. About Ogame extension.

## 2. Security.

## 3. Requirements.
* Extension works only in *Google Chrome Browser*

## 4. How to install?
* Download extension file from this repository *(file .crx)* from '*versions*' folder.
* Open your Chrome Browser and go to '*settings*' and then to '*extensions*'.
* Drag and drop extension file into your browser with '*extensions*' page open.
* Accept pop-up with all permissions required by extension.
* Ensure extension is turned on.

## 5. How to use?

#### Login into your ogame account and go to '*options*' page. If instalation was correct you should be able to see additional options. Every changed option will be saved after clicking '*save changes*' button.

![Ogame extension logo](/assets/readme/1. Options.png)

![Ogame extension logo](/assets/readme/2. Extension Options.png)

#### 5.1. Activate extension
To enable extension you need to change '*Extension active*' property to '*On*'. When property is set to '*Off*' then extension is turned off and none of it's functionalities will be working.

![Ogame extension logo](/assets/readme/3. Extension Active.png)

#### 5.2. Autologin
Autologin functionality enables you storing your '*login*' and '*password*'. In case of being logged out or getting back to main ogame page extension will login you automaticaly using your credentials. You can enable / disable this functionality by changing *'Autologin active'* property.

![Ogame extension logo](/assets/readme/4. Autologin.png)

#### 5.3. Automatic refresh
Automatic refresh functionality will refresh your ogame site and check if there is any enemy fleet attacking you. There are 2 types of refreshing:
1. **Normal** - page is refreshed every period of time specified in '*Normal time period (seconds)*' property.
2. **Random** - page is refreshed after random period of time. Random period of time is calculated based on time range specified in '*Random time period (seconds)*' property. Example given: when '*Random time period (seconds)*' is set to '*from 600 to 1200*' then page will be refreshed between 10 up to 20 minutes. After refresh new random time will be calculated.

You can also specify if you want to be alarmed by extension if after refresh enemy fleet is attacking you by setting '*Check fleets & alarm*' property. Alarm will trigger sound effect (ringing bells), will create native notification and if you are using currently other tab in browser will switch you to ogame tab.

![Ogame extension logo](/assets/readme/5. Automatic Refresh.png)

#### 5.4. Coordinates shortcuts
Do you want to store and easily use some coordinates multiple times? '*Coordinates shortcuts*' functionality is for you! How to use it?

1. Firsly you need to specify '*Player name*' and add him to your storage by clicking '*Add player*' text on the right hand side.
![Ogame extension logo](/assets/readme/6. Coordinates shortcuts - empty.png)

2. After specyfing players you can attach to them planets by filling '*Planet Name*' and '*Coordinates*' fields. After filling up these fields click '*Add planet*' button.
![Ogame extension logo](/assets/readme/7. Coordinates shortcuts - completed.png)

3. Go to '*Fleet*' ogame page to send your fleet, choose some vehicles and click '*continue*' button. In next screen you should be able to see standard '*shortcuts*' with your plantes but also additional ones that you have specified before. By clicking on them they will copy coordinates to '*Choose Target*' section and you will be ready to go!
![Ogame extension logo](/assets/readme/8. Coordinates shortcuts - in action.png)

Few additional notes about this functionality:
* Player name does not have to be real '*Player name*'.
* Planet (and it's coordinates) does not have to belong to player.
* You can add multiple planets to one player.
* Example of additional usage may be setting group of planets as '*Player name*' which does not belong to one player. Example of such usage can be setting '*Farming targets*' as '*Player name*' and storing coordinates of all planets that you are attack frequently.

Remember to save all changes by clicking '*save changes*' button before going to other ogame page! Otherwise you will loose all unsaved changes!

## 6. Versions.
* v0.2.1.
  * Prepared l10n solution with 'pl' and 'en' translations.
  * Created time calculator solution to calculate arrival and return times of fleet.
* v0.2.
  * Prepared built-in ogame options page with possibility to change ogame extension settings.
  * Created functionalities:
    * Autologin.
    * Coordinates shortcuts.
    * Automatic refresh.
* v0.1.
  * Project architecture.
  * Basic functionalities.
  * Storage solution for storing extension data.

## 7. Road map.

## 8. Want to contribute?

## 9. FAQ
1. Q: Why any functionality of extension does not work?!<br/>
  A: Ensure you set '*Extension active*' property in options as '*On*'.
2. Q: Why I lost all extension settings after re-installing extension?!<br/>
  A: Currently there is no way of migrating between versions without loosing your extension settings.

## 10. License
This software is produced under **[MIT](https://opensource.org/licenses/MIT)** license.