
type TitleProps = {
    children: React.ReactNode,
    text: string
}

export default function Title({children, text}: TitleProps) {
  return (
    <div>
      <h1 className="text-2xl font-bold">{children}</h1>
      <p className="text-gray-500">{text}</p>
    </div>
  )
}
