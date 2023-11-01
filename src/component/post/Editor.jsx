import './styles.css'

import { EditorContent, useEditor } from '@tiptap/react'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import Image from '@tiptap/extension-image'
import StarterKit from '@tiptap/starter-kit'
import React, {

} from 'react'

import MenuBar from './MenuBar.jsx'







export default () => {

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                history: false,
            }),
            Image


        ],
    })





    return (
        <div className="editor">
            {editor && <MenuBar editor={editor} />}
            <EditorContent className="editor__content" editor={editor} />

        </div>
    )
}