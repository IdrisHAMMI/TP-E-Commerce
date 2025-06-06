

export const Header = () => {
    return (
        <header className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold">E-Commerce App</h1>
                <nav>
                    <ul className="flex space-x-4">
                        <li><a href="/" className="hover:underline">Home</a></li>
                        <li><a href="/articles" className="hover:underline">Articles</a></li>
                        <li><a href="/Login" className="hover:underline"></a></li>
                        <li><a href="/Admin" className="hover:underline"></a></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
