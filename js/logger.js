
var Log = (function() {
	return {
		info: Function.prototype.bind.call(console.info, console),
		log:  Function.prototype.bind.call(console.log, console),
		error: Function.prototype.bind.call(console.error, console),
		warn: Function.prototype.bind.call(console.warn, console),
		group: Function.prototype.bind.call(console.group, console),
		groupCollapsed: Function.prototype.bind.call(console.groupCollapsed, console),
		groupEnd: Function.prototype.bind.call(console.groupEnd, console),
		time: Function.prototype.bind.call(console.time, console),
		timeEnd: Function.prototype.bind.call(console.timeEnd, console),
		timeStamp: Function.prototype.bind.call(console.timeStamp, console)
	};
})();
