
import { _decorator, Component, Node, Graphics, UITransform, Color, tween, UIOpacity, v3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Dialogue')
export class Dialogue extends Component {
    @property(Graphics)
    private border?: Graphics | null

    @property(Color)
    private borderColor: Color = new Color(255, 255, 255)

    @property(Graphics)
    private modal?: Graphics | null

    @property(Color)
    private modalBgColor: Color = new Color(255, 255, 255)

    private uiTransform?: UITransform | null;

    protected readonly popInAnimationDuration = 0.3;

    protected readonly popOutAnimationDuration = 0.3;

    start () {
        this.uiTransform = this.getComponent(UITransform)

        this.renderBorder()
        this.renderModal()
    }

    private renderModal () {
        const { uiTransform, modal } = this

        if (!uiTransform || !modal) return
        
        const { width, height } = uiTransform

        const realWidth = width - 10;
        const realHeight = height - 10;

        modal.fillColor = this.modalBgColor
        modal.roundRect(realWidth * -.5, realHeight * -.5, realWidth, realHeight, realHeight * 0.1);
        modal.fill();
    }

    private renderBorder () {
        const { uiTransform, border } = this

        if (!uiTransform || !border) return
        
        const { width, height } = uiTransform

        border.fillColor = this.borderColor
        border.roundRect(width * -.5, height * -.5, width, height, height * 0.1);
        border.fill();
    }

    public show () {
        const { border, modal } = this
        if (!border || !modal) return

        this.playPopInAnimation(border.node, this.node)
        this.playPopInAnimation(modal.node)
    }

    private playPopInAnimation(node: Node, parent?: Node) {
        const { popInAnimationDuration } = this;

        node.setScale(0, 0);
        tween(node).to(
            popInAnimationDuration,
            {
                scale: v3(1, 1, 1)
            },
            {
                onStart() {
                    if (parent) parent.active = true;
                }
            }
        ).start();
    }

}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.0/manual/en/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.0/manual/en/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.0/manual/en/scripting/life-cycle-callbacks.html
 */
