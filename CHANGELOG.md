# MagicMirror² Change Log

All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

---

## [2.4.1] - 2018-07-04

### Fixed

- Fix weather parsing issue #1332.

## [2.4.0] - 2018-07-01

⚠️ **Warning:** This release includes an updated version of Electron. This requires a Raspberry Pi configuration change to allow the best performance and prevent the CPU from overheating. Please read the information on the [MagicMirror Wiki](https://github.com/michmich/magicmirror/wiki/configuring-the-raspberry-pi#enable-the-open-gl-driver-to-decrease-electrons-cpu-usage).

ℹ️ **Note:** This update uses new dependencies. Please update using the following command: `git pull && npm install`


### Changed
- Upgrade Electron 2.0.0.
- Invoke module suspend even if no dom content. [#1308](https://github.com/deb1398/smart-mirror.git)

### Updated
- Updated Italian translation
- Updated German translation
- Updated Dutch translation
- Upadated Indian translation


### Changed

- Changed Electron dependency to v1.7.10.

## [2.2.1] - 2018-01-01

### Fixed
- Fixed linting errors.

## [2.2.0] - 2018-01-01

**Note:** This update uses new dependencies. Please update using the following command: `git pull && npm install`

### Changed
- Calender week is now handled with a variable translation in order to move number language specific.
- Reverted the Electron dependency back to 1.4.15 since newer version don't seem to work on the Raspberry Pi very well.
- India time zone provided
- All modules set accourding to asia specific.


### Updated
- Changed 'default.js' - listen on all attached interfaces by default.
- Add execution of `npm list` after the test are ran in Travis CI.
- Change hooks for the vendors e2e tests.
- Add log when clientonly failed on starting.
- Add warning color when are using full ip whitelist.
- Set version of the `express-ipfilter` on 0.3.1.
- Add pm2 module.



### Initial release of MagicMirror.
This was part of the blogpost: [http://michaelteeuw.nl/post/83916869600/magic-mirror-part-vi-production-of-the](http://michaelteeuw.nl/post/83916869600/magic-mirror-part-vi-production-of-the)
