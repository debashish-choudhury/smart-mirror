**MagicMirror²** is an open source modular smart mirror platform. With a growing list of installable modules, the **MagicMirror²** allows you to convert your hallway or bathroom mirror into your personal assistant. **MagicMirror²** is built by the creator of [the original MagicMirror](http://michaelteeuw.nl/tagged/magicmirror) with the incredible help of a [growing community of contributors](https://github.com/MichMich/MagicMirror/graphs/contributors).

MagicMirror² focuses on a modular plugin system and uses [Electron](http://electron.atom.io/) as an application wrapper. So no more web server or browser installs necessary!

## Table Of Contents

- [Installation](#installation)
  - [Raspberry Pi](#raspberry-pi)
  - [General](#general)
  - [Server Only](#server-only)
  - [Client Only](#client-only)
  - [Docker](#docker)
- [Configuration](#configuration)
- [Modules](#modules)
- [Updating](#updating)
- [Known Issues](#known-issues)
- [Community](#community)
- [Contributing Guidelines](#contributing-guidelines)
- [Manifesto](#manifesto)

## Installation

### Raspberry Pi

#### Automatic Installation (Raspberry Pi only!)

If you want to run this on a Raspberry Pi 1, use the [server only](#server-only) feature and setup a fullscreen browser yourself.

to download the project MagicMirror² and run it.. Type the following command in git bash:

```bash
bash -c "$(curl -sL https://github.com/deb1398/smart-mirror.git)"
```

#### Manual Installation

1. Download and install the latest *Node.js* version.
2. Clone the repository and check out the master branch: `git clone https://github.com/deb1398/smart-mirror.git`
3. Enter the repository: `cd MagicMirror/`
4. Install and run the app with: `npm install && npm start` \
   For **Server Only** use: `npm install && node serveronly` .

**Important:** Make sure that you whitelist the interface/ip (`ipWhitelist`) in the server config where you want the client to connect to, otherwise it will not be allowed to connect to the server. You also need to set the local host `address` field to `0.0.0.0` in order for the RPi to listen on all interfaces and not only `localhost` (default).

```javascript
var config = {
	address: "0.0.0.0",	// default is "localhost"
	port: 8080,		// default
	ipWhitelist: ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:172.17.0.1"], // default -- need to add your IP here
	...
};
```


### Client Only

This is when you already have a server running remotely and want your RPi to connect as a standalone client to this instance, to show the MM from the server. Then from your RPi, you run it with: `node clientonly --address 192.168.1.5 --port 8080`. (Specify the ip address and port number of the server)


### Docker

MagicMirror² in server only mode can be deployed using [Docker](https://docker.com). After a successful [Docker installation](https://docs.docker.com/engine/installation/) you just need to execute the following command in the shell:

```bash
docker run  -d \
	--publish 80:8080 \
	--restart always \
	--volume ~/magic_mirror/config:/opt/magic_mirror/config \
	--volume ~/magic_mirror/modules:/opt/magic_mirror/modules \
	--name magic_mirror \
	bastilimbach/docker-magicmirror
```
To get more information about the available Dockerfile versions and configurations head over to the respective [GitHub repository](https://github.com/bastilimbach/docker-MagicMirror).


## Configuration

### General

1. Copy `/home/pi/MagicMirror/config/config.js.sample` to `/home/pi/MagicMirror/config/config.js`. \
   **Note:** If you used the installer script. This step is already done for you.

2. Modify your required settings. \
   Note: You'll can check your configuration running `npm run config:check` in `/home/pi/MagicMirror`.


The following properties can be configured:

| **Option** | **Description** |
| --- | --- |
| `port` | The port on which the MagicMirror² server will run on. The default value is `8080`. |
| `address` | The *interface* ip address on which to accept connections. The default is `localhost`, which would prevent exposing the built-in webserver to machines on the local network. To expose it to other machines, use: `0.0.0.0`. |
| `ipWhitelist` | The list of IPs from which you are allowed to access the MagicMirror². The default value is `["127.0.0.1", "::ffff:127.0.0.1", "::1"]`, which is from `localhost` only. Add your IP when needed. You can also specify IP ranges with subnet masks (`["127.0.0.1", "127.0.0.1/24"]`) or directly with (`["127.0.0.1", ["192.168.0.1", "192.168.0.100"]]`). Set `[]` to allow all IP addresses. For more information see: [follow post ipWhitelist HowTo](https://forum.magicmirror.builders/topic/1326/ipwhitelist-howto) |
| `zoom` | This allows to scale the mirror contents with a given zoom factor. The default value is `1.0`|
| `language` | The language of the interface. (Note: Not all elements will be localized.) Possible values are `en`, `nl`, `ru`, `fr`, etc., but the default value is `en`. |
| `timeFormat` | The form of time notation that will be used. Possible values are `12` or `24`. The default is `24`. |
| `units` | The units that will be used in the default weather modules. Possible values are `metric` or `imperial`. The default is `metric`. |
| `modules` | An array of active modules. **The array must contain objects. See the next table below for more information.** |
| `electronOptions` | An optional array of Electron (browser) options. This allows configuration of e.g. the browser screen size and position (example: `electronOptions: { fullscreen: false, width: 800, height: 600 }`). Kiosk mode can be enabled by setting `kiosk = true`, `autoHideMenuBar = false` and `fullscreen = false`. More options can be found [here](https://github.com/electron/electron/blob/master/docs/api/browser-window.md). |
| `customCss` | The path of the `custom.css` stylesheet. The default is `css/custom.css`. |

Module configuration:

| **Option** | **Description** |
| --- | --- |
| `module` | The name of the module. This can also contain the subfolder. Valid examples include `clock`, `default/calendar` and `custommodules/mymodule`. |
| `position` | The location of the module in which the module will be loaded. Possible values are `top_bar`, `top_left`, `top_center`, `top_right`, `upper_third`, `middle_center`, `lower_third`, `bottom_left`, `bottom_center`, `bottom_right`, `bottom_bar`, `fullscreen_above`, and `fullscreen_below`. This field is optional but most modules require this field to set. Check the documentation of the module for more information. Multiple modules with the same position will be ordered based on the order in the configuration file. |
| `classes` | Additional classes which are passed to the module. The field is optional. |
| `header` | To display a header text above the module, add the header property. This field is optional. |
| `disabled` | Set disabled to `true` to skip creating the module. This field is optional. |
| `config` | An object with the module configuration properties. Check the documentation of the module for more information. This field is optional, unless the module requires extra configuration. |

## Modules

The following modules are installed by default.

- [**Clock**](modules/default/clock)
- [**Calendar**](modules/default/calendar)
- [**Current Weather**](modules/default/currentweather)
- [**Weather Forecast**](modules/default/weatherforecast)
- [**News Feed**](modules/default/newsfeed)
- [**Compliments**](modules/default/compliments)
- [**Hello World**](modules/default/helloworld)
- [**Alert**](modules/default/alert)

For more available modules, check out out the wiki page [MagicMirror² 3rd Party Modules](https://github.com/deb1398/smart-mirror.git). If you want to build your own modules, check out the [MagicMirror² Module Development Documentation](modules) and don't forget to add it to the wiki and the [forum](https://forum.magicmirror.builders/category/7/showcase)!

The clock time, calender, weather forecast, news feeds all are as per Aisa specific (India). This can be updated as per your time zone by updating the key for perticular API.


## Updating

If you want to update your MagicMirror² to the latest version, use your terminal to go to your Magic Mirror folder and type the following command:

```bash
git pull && npm install
```

If you changed nothing more than the config or the modules, this should work without any problems.
Type `git status` to see your changes, if there are any, you can reset them with `git reset --hard`. After that, git pull should be possible.


## Community

The community around the MagicMirror² is constantly growing. We even have a [forum](https://forum.magicmirror.builders) now where you can share your ideas, ask questions, help others and get inspired by other builders. We would love to see you there!

## Contributing Guidelines

Contributions of all kinds are welcome, not only in the form of code but also with regards bug reports and documentation.

Please keep the following in mind:

- **Bug Reports**:  Make sure you're running the latest version. If the issue(s) still persist: please open a clearly documented issue with a clear title.
- **Minor Bug Fixes**: Please send a pull request with a clear explanation of the issue or a link to the issue it solves.
- **Major Bug Fixes**: please discuss your approach in an GitHub issue before you start to alter a big part of the code.
- **New Features**: please please discuss in a GitHub issue before you start to alter a big part of the code. Without discussion upfront, the pull request will not be accepted / merged.

Thanks for your help in making MagicMirror² better!

## Reference:
has been referred by https://github.com/MichMich/MagicMirror/wiki/Auto-Starting-MagicMirror

## Important
To run this application as soon as the system or pi3 boots up.. install pm3.
It as a node package for running the file automatically after booting up of OS(Rasbian). Through pm2 we can also specify time for every reboot.

> ~ Debashish Choudhury
