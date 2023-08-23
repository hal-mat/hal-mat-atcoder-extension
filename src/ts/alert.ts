export { };
const nowUrl: string = location.href;
const alertProblems: Array<string> = ["c", "d", "e"];
if (alertProblems.includes(nowUrl.slice(-1))) {
	const nextUrl = nowUrl.slice(0, -1) + String.fromCharCode(nowUrl.slice(-1).charCodeAt(0) + 1);
	alert(nextUrl);
}
