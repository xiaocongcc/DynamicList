import DynamicList from "./DynamicList";

const { ccclass, property, disallowMultiple, menu, executionOrder } = cc._decorator;

/**ITEM消失的动画类型 */
export enum DisappearAnimType {
    UP = 0,
    RIGHT = 1,
    BOTTOM = 2,
    LEFT = 3,
}

@ccclass
@disallowMultiple()
@executionOrder(-5001)//先于List
export default class ListItem extends cc.Component {
    /**依赖的DynamicList组件 */
    public list: DynamicList;

    /**序列id */
    public id: number;

    /**按钮组件 */
    private _btnCom: cc.Button;

    /**是否已经注册过事件 */
    private _eventReg: boolean = false;

    private _selected: boolean = false;

    onLoad() {
        this._btnCom = this.node.getComponent(cc.Button);
    }

    _registerEvent() {
        if (this._btnCom && this.list.selectedMode > 0 && !this._eventReg) {
            let eh: cc.Component.EventHandler = new cc.Component.EventHandler();
            eh.target = this.node;
            eh.component = 'ListItem';
            eh.handler = 'onClickThis';
            this._btnCom.clickEvents.unshift(eh);
            this._eventReg = true;
        }
    }

    onClickThis() {
        this.list.setSelectId(this.id);
    }

    /**
     * 设置视图信息，子类继承
     * @param data 
     */
    setData(data: any) {

    }

    /**
     * 当前item是否选中，根据结果刷新视图，子类继承实现
     * @param val 
     */
    setSelected(val: boolean) {
        this._selected = val;
    }
    getSelected() {
        return this._selected;
    }

    /**
     * 消失动画
     * @param aniType 
     * @param finishCb 
     * @param del 
     */
    disappearAnim(aniType: DisappearAnimType, finishCb: Function, del: boolean) {
        let acts: any[];
        switch (aniType) {
            case DisappearAnimType.UP: //向上消失
                acts = [
                    cc.scaleTo(.2, .7),
                    cc.moveBy(.3, 0, this.node.height * 2),
                ];
                break;
            case DisappearAnimType.RIGHT: //向右消失
                acts = [
                    cc.scaleTo(.2, .7),
                    cc.moveBy(.3, this.node.width * 2, 0),
                ];
                break;
            case DisappearAnimType.BOTTOM: //向下消失
                acts = [
                    cc.scaleTo(.2, .7),
                    cc.moveBy(.3, 0, this.node.height * -2),
                ];
                break;
            case DisappearAnimType.LEFT: //向左消失
                acts = [
                    cc.scaleTo(.2, .7),
                    cc.moveBy(.3, this.node.width * -2, 0),
                ];
                break;
            default: //默认：缩小消失
                acts = [
                    cc.scaleTo(.3, .1),
                ];
                break;
        }
        // if (finishCb && del) {
        //     acts.push(cc.callFunc(() => {
        //         if (del) {
        //             this.list.destroyItem(this.node);
        //             for (let n: number = this.list.displayData.length - 1; n >= 0; n--) {
        //                 if (this.list.displayData[n].id == this.listId) {
        //                     this.list.displayData.splice(n, 1);
        //                     break;
        //                 }
        //             }
        //         }
        //         finishCb();
        //     }));
        // }
        this.node.runAction(cc.sequence(acts));
    }
}
