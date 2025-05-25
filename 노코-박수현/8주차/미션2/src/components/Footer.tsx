export const Footer = () => {
    return (
            <footer className="text-gray text-sm italic">
                <div className="flex h-1 shadow-sm w-full rotate-180"></div>
                <p className="text-gray-600">&copy; {new Date().getFullYear()} noco. All rights reserved.</p>
            </footer>
  )
}

export default Footer
