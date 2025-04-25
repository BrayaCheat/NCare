'use client'

import {useEditor, EditorContent} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import { Loader } from 'lucide-react'
import { useEffect } from 'react'
import EditorToolbar from './EditorToolbar';

export default function Editor({content, onChange}: {content: string, onChange: (content: string) => void}){

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: {
            class: "list-disc ml-3",
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: "list-decimal ml-3",
          },
        },
        heading: {
          levels: [1,2,3]
        }
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Highlight,
    ],
    content: content,
    onUpdate: ({editor}) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'min-h-[300px] border rounded-2xl bg-gray-50 py-2 px-3 focus:ring-0 focus:outline-0'
      }
    }
  })

  useEffect(() => {
    if(editor && content !== editor.getHTML()){
      editor.commands.setContent(content)
    }
  }, [content, editor])

  if(!editor){
    return <div><Loader className='animate-spin'/>Loading editor...</div>
  }

  return (
    <div>
      <div className=''>
        <EditorToolbar
          editor={editor}
        />
        <EditorContent
          editor={editor}
        />
      </div>
    </div>
  )
}
