import axios from 'axios';
type TaskResult = {
	Score: number
}
type TotalResult = {
	Score: number
}
type TaskResults = {
	[index: string]: TaskResult;
}
type User = {
	TaskResults: TaskResults;
	TotalResult: TotalResult;
}
const nowUrl: string = location.href;
// console.log(nowUrl);
const nowProblemAssignment: string = nowUrl.slice(-1)
const alertProblemAssignments: Array<string> = ["c", "d", "e"];
if (alertProblemAssignments.includes(nowProblemAssignment)) {
	const contestName: string = nowUrl.split("/")[4];
	const nextProblemAssignment: string = String.fromCharCode(nowUrl.slice(-1).charCodeAt(0) + 1);
	// 元々600秒置きにしたかったのだが、bit演算考えるとこっちの方が早そうなので512kでいいや
	const checkAcCount = () => axios
		.get('https://atcoder.jp/contests/' + contestName + '/standings/json')
		.then((result) => {
			const users: Array<User> = result.data.StandingsData;
			// console.log(users);
			const nowProblemKey: string = contestName + "_" + nowProblemAssignment;
			const nextProblemKey: string = contestName + "_" + nextProblemAssignment;
			let nowProblemScore: number = 0;
			let nowProblemAcCount: number = 0;
			let nextProblemScore: number = 0;
			let nextProblemAcCount: number = 0;
			for (const user of users) {
				// console.log([nowProblemAcCount, nextProblemAcCount]);
				// 現ユーザーの合計点
				let totalScore: number = user.TotalResult.Score;
				// 合計点が達していないということはこの問題には間違いなく正解していないし、次の問題にも正解していないユーザーまで来たら中断
				if (totalScore < nowProblemScore && totalScore < nextProblemScore) {
					break;
				}
				let taskResults = user.TaskResults;
				if (nowProblemKey in taskResults) {
					let score: number = taskResults[nowProblemKey]["Score"];
					// 正解時の得点をキャッシュ
					nowProblemScore ||= score;
					// 得点している場合(正解している場合)はAC数に+1
					if (score > 0) {
						nowProblemAcCount += 1;
					}
				}
				if (nextProblemKey in taskResults) {
					let score: number = taskResults[nextProblemKey]["Score"];
					nextProblemScore ||= score;
					if (score > 0) {
						nextProblemAcCount += 1;
					}
				}
			}
			if (nowProblemAcCount < nextProblemAcCount) {
				alert("The next Problem may be easier than this one!\nThis Problem AC:" + nowProblemAcCount + "\nNext Problem AC" + nextProblemAcCount);
			} else if (nowProblemAcCount * 0.9 < nextProblemAcCount) {
				alert("The next Problem may be about as difficult as this one.\nThis Problem AC: " + nowProblemAcCount + "\nNext Problem AC" + nextProblemAcCount);
			}
		}).catch((error) => {
			console.log(error.status);
			alert('Error');
		});

	checkAcCount();
	const IntervalMiliSecond: number = 1 << 19;
	console.log(IntervalMiliSecond);
	setInterval(checkAcCount, IntervalMiliSecond)
}