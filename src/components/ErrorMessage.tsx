export default function ErrorMessage({children} : {children: React.ReactNode}) {
  return (
    <div className="text-red-600 font-bold text-xs max-w-xs">
      {children}
    </div>
  )
}
