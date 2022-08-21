import {
  setCurrentScheme
} from '@/common/tool';

const normal = -1; //定义常量
const left = 0;
const center = 1;
const right = 2;
let swiper = 0

export default {
  id: 47,
  name: '悬赏_点击已追踪任务',
  checked: false,
  config: [{
    desc: '结束后切换方案',
    config: [{
      name: 'scheme_switch_enabled',
      desc: '是否启用',
      type: 'switch',
      default: false,
    }, {
      name: 'next_scheme',
      desc: '下一个方案',
      type: 'scheme',
      default: '地鬼日常',
    }]
  }],
  operator: [{
    desc: [1280, 720,
      [
        [left, 44, 59, 0xeff5fb],
        [right, 1126, 35, 0xd7b389],
        [right, 1225, 33, 0xd3af84],
        [right, 1169, 147, 0xd4cebf],
        [left, 34, 693, 0x643f2e],
        [left, 155, 695, 0x64402f],
        [left, 254, 690, 0x653d2c]
      ]
    ],
    oper: [
      [left, 1280, 720, 0, 0, -42, -51, 2000],
    ]
  }, {
    desc: [1280, 720,
      [
        [left, 54, 43, 0xeaf4fc],
        [left, 51, 36, 0x9eafee],
        [left, 52, 78, 0xcadbff],
        [left, 119, 652, 0xa86420],
        [left, 209, 643, 0xf6f0b7],
        [center, 326, 640, 0xcfc9b8],
        [center, 430, 652, 0xb96567],
        [center, 500, 640, 0x564635],
        [left, 135, 132, 0x76551c],
        [left, 117, 133, 0x47362e]
      ]
    ],
    oper: [
      [center, 1280, 720, 29, 461, 115, 467, 1],
      [center, 1280, 720, 25, 174, 105, 178, 1]
    ]
  }],
  operatorFunc(thisScript, thisOperator) {
    if (thisScript.oper({
        name: '悬赏_探索界面',
        operator: [{
          desc: thisOperator[0].desc
        }]
      })) {
      const suspension = thisScript.findMultiColor('探索界面_检测左边是否有追踪任务的悬浮列表') || null;
      const point = thisScript.findMultiColor('悬赏_已追踪任务') || null;
      const thisconf = thisScript.scheme.config['47'];
      if (suspension != null) {
        // 如果有悬浮列表
        if (point != null) {
          let oper = [
            [point.x, point.y, point.x + 1, point.y + 1, 1000]
          ];
          thisScript.helperBridge.regionClick(oper, thisScript.scheme.commonConfig.afterClickDelayRandom);
          return true;
        } else {
          // 如果没有追踪任务就滑动，可能是真蛇之类的把任务挤下去了
          if (swiper === 3) {
            if (thisconf && thisconf.scheme_switch_enabled) {
              setCurrentScheme(thisconf.next_scheme);
              toastLog(`切换方案为[${thisconf.next_scheme}]`);
              thisScript.rerun();
            } else {
              thisScript.stop();
            }
          }
          thisScript.helperBridge.regionSwipe(thisOperator[1].oper[0], thisOperator[1].oper[1], [100, 300], 2000);
          swiper++
          return true
        }
      } else {
        // 如果没有悬浮列表说明任务做完了
        if (thisconf && thisconf.scheme_switch_enabled) {
          setCurrentScheme(thisconf.next_scheme);
          toastLog(`切换方案为[${thisconf.next_scheme}]`);
          thisScript.rerun();
        } else {
          thisScript.stop();
        }
      }
    } else {
      return false
    }
  }
}