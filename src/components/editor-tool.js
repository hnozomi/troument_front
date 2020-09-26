import Embed from '@editorjs/embed'
import Table from '@editorjs/table'
import Paragraph from '@editorjs/paragraph'
import List from '@editorjs/list'
import Warning from '@editorjs/warning'
import Code from '@editorjs/code'
import LinkTool from '@editorjs/link'
import Raw from '@editorjs/raw'
import Header from '@editorjs/header'
import Quote from '@editorjs/quote'
import Marker from '@editorjs/marker'
import CheckList from '@editorjs/checklist'
import Delimiter from '@editorjs/delimiter'
import InlineCode from '@editorjs/inline-code'
import SimpleImage from '@editorjs/simple-image'

export const EDITOR_JS_TOOLS = {
    embed: {
        class: Embed,
        config: {
            youtube: true,
        },
        inlineToolbar: true
    },
    table: {
        class: Table,
        inlineToolbar: true,
    },
    paragraph: {
        class: Paragraph,
        inlineToolbar: true,
        // config: {
        //     placeholder: "ここに入力してください",
        // }
    },
    list: {
        class: List,
        inlineToolbar: true
    },
    warning: {
        class: Warning,
        inlineToolbar: true,
        config: {
            titlePlaceholder: 'Title',
            messagePlaceholder: 'Message',
        },
    },
    code: {
        class: Code,
    },
    linkTool: {
        class: LinkTool,
        inlineToolbar: true,
        config: {
            endpoint: 'https://localhost/api/fetchUrl', // Your backend endpoint for url data fetching
            // endpoint: 'https://troument-api.net/api/fetchUrl', // Your backend endpoint for url data fetching
            // endpoint: 'http://localhost:8080/fetchUrl', // Your backend endpoint for url data fetching
            // endpoint: 'https://troument-api.net', // Your backend endpoint for url data fetching
        }
    },
    // image: Image,
    raw: {
        class: Raw,
        inlineToolbar: true,
    },
    header: {
        class: Header,
        config: {
            placeholder: 'Enter a header',
        },
        inlineToolbar: true,
    },
    quote: {
        class: Quote,
        inlineToolbar: true,
        config: {
            quotePlaceholder: '引用する',
            captionPlaceholder: '筆者 or 引用元',
        },
    },
    marker: Marker,
    checklist: {
        class: CheckList,
        inlineToolbar: true,
    },

    delimiter: {
        class: Delimiter,
        inlineToolbar: true,
    },
    inlineCode: {
        class: InlineCode,
        inlineToolbar: true,
    },
    simpleImage: {
        class: SimpleImage,
        inlineToolbar: true,
    },
}