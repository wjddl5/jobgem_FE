import Link from "next/link";

export default function UserSearchLayout({ children }) {
    return(
        <>
            <header className="bg-blue-600 text-white p-4">
                <nav className="flex justify-start space-x-4">
                    <Link href={"/login/search/id"}><button>아이디 찾기</button></Link>
                    <Link href={"/login/search/pw"}><button>비밀번호 찾기</button></Link>
                </nav>
            </header>
            <main className="bg-white p-20">
                {children}
            </main>
        </>
    )

}