import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment';
import AutoImage from '@ckeditor/ckeditor5-image/src/autoimage';
import AutoLink from '@ckeditor/ckeditor5-link/src/autolink';
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Code from '@ckeditor/ckeditor5-basic-styles/src/code';
import DataFilter from '@ckeditor/ckeditor5-html-support/src/datafilter';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import FindAndReplace from '@ckeditor/ckeditor5-find-and-replace/src/findandreplace';
import GeneralHtmlSupport from '@ckeditor/ckeditor5-html-support/src/generalhtmlsupport';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import HorizontalLine from '@ckeditor/ckeditor5-horizontal-line/src/horizontalline';
import HtmlEmbed from '@ckeditor/ckeditor5-html-embed/src/htmlembed';
import Image from '@ckeditor/ckeditor5-image/src/image';
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption';
import ImageInsert from '@ckeditor/ckeditor5-image/src/imageinsert';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';
import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload';
import Indent from '@ckeditor/ckeditor5-indent/src/indent';
import IndentBlock from '@ckeditor/ckeditor5-indent/src/indentblock';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Link from '@ckeditor/ckeditor5-link/src/link';
import LinkImage from '@ckeditor/ckeditor5-link/src/linkimage';
import List from '@ckeditor/ckeditor5-list/src/list';
import ListProperties from '@ckeditor/ckeditor5-list/src/listproperties';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import RemoveFormat from '@ckeditor/ckeditor5-remove-format/src/removeformat';
import SimpleUploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter';
import SourceEditing from '@ckeditor/ckeditor5-source-editing/src/sourceediting';
import Strikethrough from '@ckeditor/ckeditor5-basic-styles/src/strikethrough';
import Table from '@ckeditor/ckeditor5-table/src/table';
import TableCellProperties from '@ckeditor/ckeditor5-table/src/tablecellproperties';
import TableProperties from '@ckeditor/ckeditor5-table/src/tableproperties';
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar';
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline';

const RteConfig = {
    language: 'fa',
    toolbar: {
        items: [
            "sourceEditing", "|",
            "heading", "|",
            "bold", "italic", "underline", "|",
            "bulletedList", "numberedList", "|",
            "alignment", "outdent", "indent",
            "-",
            "removeFormat", "|",
            "link", "imageInsert", "insertTable", "blockQuote", "horizontalLine", "htmlEmbed", "|",
            "findAndReplace", "undo", "redo"
        ],
        shouldNotGroupWhenFull: false
    },
    htmlSupport: {
        allow: [
            {
                name: /.*/,
                attributes: true,
                classes: true,
                styles: true
            }
        ]
    },
    plugins: [Alignment, AutoImage, AutoLink, BlockQuote, Bold,
        Code, DataFilter, Essentials, FindAndReplace,
        GeneralHtmlSupport, Heading, HorizontalLine, HtmlEmbed,
        Image, ImageCaption, ImageInsert,
        ImageStyle, ImageToolbar, ImageUpload,
        Indent, IndentBlock, Italic, Underline,
        Link, LinkImage, List, ListProperties,
        Paragraph, RemoveFormat, SimpleUploadAdapter,
        SourceEditing, Strikethrough,
        Table, TableToolbar, TableProperties, TableCellProperties],
    ui: {
        viewportOffset: {
            top: 100 // admin panel
            // top: 150 // white panel
        }
    },
    simpleUpload: {
        uploadUrl: `${document.location.pathname}${document.location.pathname.endsWith('/') ? '' : '/'}?handler=Upload&entityType=FileManager&rte=true`,
        headers: {
            // 'RequestVerificationToken': document.querySelector('[name=__RequestVerificationToken]').value
        },
        withCredentials: true
    },
    heading: {
        options: [
            { model: 'paragraph', title: 'پاراگراف' },
            { model: 'heading1', view: 'h1', title: 'titr H1' },
            { model: 'heading2', view: 'h2', title: 'titr H2' },
            { model: 'heading3', view: 'h3', title: 'titr H3' },
            { model: 'heading4', view: 'h4', title: 'titr H4' },
            { model: 'heading5', view: 'h5', title: 'titr H5' }
        ]
    },
    image: {
        styles: [
            'alignCenter',
            'alignLeft',
            'alignRight'
        ],
        toolbar: [
            'imageTextAlternative',
            // 'toggleImageCaption', '|',
            // 'imageStyle:inline', 'imageStyle:wrapText', 'imageStyle:breakText', 'imageStyle:side',
            '|',
            'resizeImage'
        ],
        insert: {
            integrations: [
                'insertImageViaUrl'
            ]
        }
    },
    table: {
        contentToolbar: [
            'tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties'
        ]
    },
    link: {
        decorators: {
            addTargetToExternalLinks: true,
            toggleDownloadable: {
                mode: 'manual',
                label: 'Downloadable',
                attributes: {
                    download: 'download'
                }
            }
        }
    }
}

export default RteConfig
