const normal = -1; //定义常量
const left = 0;
const center = 1;
const right = 2;

export default {
	id: 112,
	name: '梦境徊游_战斗',
	desc: '连续执行5次后未开始，脚本将自动停止',
	operator: [{
		// 挑战
		desc: [1280, 720,
			[
				[right, 1174, 180, 0xcac7d0],
				[right, 1177, 668, 0xc9daf1],
				[right, 1216, 629, 0xf4f4f4],
				[left, 34, 40, 0xf3e4a3],
				[left, 243, 40, 0x583716],
			]
		],
		oper: [
			[right, 1280, 720, 1138, 579, 1221, 668, 1000]
		]
	}],
	operatorFunc(thisScript, thisOperator) {
		let curCnt = 0;
		let maxCount = 5;
		while (thisScript.oper({
			name: '梦境徊游_战斗',
			operator: thisOperator
		})) {
			curCnt++;
			thisScript.keepScreen();
			if (curCnt >= maxCount) {
				toastLog(`连续执行${maxCount}次挑战后未开始，脚本自动停止`);
				thisScript.stop();
				sleep(2000);
				return false;
			}
		}
		if (curCnt) {
			return true;
		}
		return false;
	}
}