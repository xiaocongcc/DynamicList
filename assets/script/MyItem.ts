import ListItem from "./ListItem";

const { ccclass, property } = cc._decorator;


@ccclass
export default class MyItem extends ListItem {
    @property(cc.Node)
    label: cc.Node = null;

    @property(cc.Node)
    selected: cc.Node = null;

    onLoad() {
        super.onLoad();
    }

    setData(data: any) {
        super.setData(data);
        this.label.getComponent(cc.Label).string = data.index;
    }

    setSelected(val: boolean) {
        super.setSelected(val);
        this.selected.active = val;
    }
}