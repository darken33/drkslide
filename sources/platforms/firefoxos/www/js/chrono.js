var start_time;
var stop_time;

function startChrono() {
	start_time = (new Date()).getTime();
}

function stopChrono() {
	stop_time = (new Date()).getTime();
}

function getChrono() {
	return Math.round((stop_time - start_time) / 1000);
}

function getChronoString() {
	time = getChrono();
	time_min = Math.floor(time / 60);
	time_sec = time % 60;
	return time_min + ":" + (time_sec < 10 ? "0" : "") + time_sec;
}
