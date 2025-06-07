'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Menubar from './Menubar'
import Placeholder from '@tiptap/extension-placeholder'
import TextAlign from '@tiptap/extension-text-align'
import { useEffect } from 'react'
import Heading from '@tiptap/extension-heading'
import Highlight from '@tiptap/extension-highlight'


const TipTap = ({onChange , content} : {content : { html: string; text: string } ,onChange : (value : {html : string , text : string}) => void}) => {
  const editor = useEditor({
    extensions: [StarterKit.configure({ 
        heading : false , 
        bulletList : { 
          HTMLAttributes : {
            class : "list-disc ml-5"
          }
        }, 
    

        orderedList : { 
          HTMLAttributes : {
            class : "list-decimal ml-5"
          }
        }
        
    }),
    Heading.configure()
    .extend({
      renderHTML({ node, HTMLAttributes }) {
        const level = node.attrs.level
        const tag = `h${level}`

        return [
          tag,
          {
            ...HTMLAttributes,
            class: `editor__h${level}`,
          },
          0,
        ]
      },
    }),
  
    Placeholder.configure({
        placeholder: 'Start typing your content here...',
    }),
    Highlight.configure({
      multicolor : true
    }),
    TextAlign.configure({
        types: ['heading', 'paragraph'], // apply alignment to these node types
    }),
  ],
  content: content.html,
  onUpdate({editor}) { 
      onChange({ html : editor.getHTML() , text : editor.getText()})
      
      
  },
    editorProps : { 
      attributes : { 
        class : "outline-none min-h-[300px] max-h-[400px] overflow-auto outline-none py-5 w-full break-all",
       
      }
    },
    immediatelyRender : false
  })

  useEffect(() => {
    if (editor && content.html !== editor.getHTML()) {
      editor.commands.setContent(content.html, false) // false = don't emit transaction
    }
  }, [content.html, editor])

  

  return <div className='w-full font-serif'>
        <Menubar editor={editor}/>
        <EditorContent editor={editor} />
    </div>
}

export default TipTap
