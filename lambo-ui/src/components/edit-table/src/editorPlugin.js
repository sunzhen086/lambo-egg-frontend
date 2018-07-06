import TextNormalEditor from "./editors/text-editor-normal";
import SelectNormalEditor from "./editors/select-editor-normal";
import HelpboxNormalEditor from "./editors/helpbox-editor-normal";
import TextLargeEditor from "./editors/text-editor-large";
import SelectLargeEditor from "./editors/select-editor-large";
import HelpboxLargeEditor from "./editors/helpbox-editor-large";
export default{
    functional: true,
    render:function(createElement,context){
        var editorType = context.props.column.editor.type;
        var mode = context.props.mode;
        if(mode === "normal"){
            if(editorType === "text"){
                return createElement(TextNormalEditor, context.data, context.children);
            }else if(editorType === "select"){
                return createElement(SelectNormalEditor, context.data, context.children);
            }else if(editorType === "helpbox"){
                return createElement(HelpboxNormalEditor, context.data, context.children);
            }else{
                console.error("无法识别的编辑器：" + editorType);
                return createElement('span', context.props.val);
            }
        }else if(mode === "large"){
            if(editorType === "text"){
                return createElement(TextLargeEditor, context.data, context.children);
            }else if(editorType === "select"){
                return createElement(SelectLargeEditor, context.data, context.children);
            }else if(editorType === "helpbox"){
                return createElement(HelpboxLargeEditor, context.data, context.children);
            }else{
                console.error("无法识别的编辑器：" + editorType);
                return createElement('span', context.props.val);
            }
        }
    }
}
