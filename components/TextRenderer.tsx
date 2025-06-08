import { FunctionComponent } from "react"
interface TextRendererProps {
  html: string
}

const TextRenderer: FunctionComponent<TextRendererProps> = ({ html }) => {
  return (
    <div
      className="font-serif break-all  min-h-[100px] max-h-[400px] overflow-auto"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

export default TextRenderer
