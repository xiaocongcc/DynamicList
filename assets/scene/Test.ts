import DynamicList from "../script/DynamicList";

const { ccclass, property } = cc._decorator;


@ccclass
export default class Test extends cc.Component {
    @property(cc.ScrollView)
    scrollViewH: cc.ScrollView = null;

    @property(cc.ScrollView)
    scrollViewV: cc.ScrollView = null;

    @property(cc.ScrollView)
    scrollViewGH: cc.ScrollView = null;

    @property(cc.ScrollView)
    scrollViewGV: cc.ScrollView = null;

    data: Array<any> = [];

    onLoad() {
        for (let i = 0; i < 100; i++) {
            this.data.push({ index: i });
        }
    }

    onEnable() {
        let listH = this.scrollViewH.getComponent(DynamicList);
        listH.setData(this.data);

        let listV = this.scrollViewV.getComponent(DynamicList);
        listV.setData(this.data);

        let listGH = this.scrollViewGH.getComponent(DynamicList);
        listGH.setData(this.data);

        let listGV = this.scrollViewGV.getComponent(DynamicList);
        listGV.setData(this.data);
    }
}