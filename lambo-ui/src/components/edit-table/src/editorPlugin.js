import TextEditor from "./editors/text-editor";
import SelectEditor from "./editors/select-editor";
import HelpboxEditor from "./editors/helpbox-editor";
export default{
    functional: true,
    render:function(createElement,context){
        let editorType = context.props.column.editor.type;
        if(editorType === "text"){
            return createElement(TextEditor, context.data, context.children);
        }else if(editorType === "select"){
            return createElement(SelectEditor, context.data, context.children);
        }else if(editorType === "helpbox"){
            return createElement(HelpboxEditor, context.data, context.children);
        }else{
            console.error("无法识别的编辑器：" + editorType);
            return createElement('span', context.props.val);
        }

    }
}
