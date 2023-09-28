import { NextSeo } from 'next-seo';
const privacy = () => {
    return (
        <div className="min-h-screen py-12">
            <NextSeo
                title="Gemino - Privacy Policy"
                description="Gemino is an AI powered language learning platform that helps you learn faster."
                canonical="https://gemino.vercel.app/"
                openGraph={{
                    url: 'https://gemino.vercel.app/',
                    title: 'Gemino',
                    description: 'Gemino is an AI powered language learning platform that helps you learn faster.',
                    images: [
                        {
                            url: `${process.env.NEXT_PUBLIC_BASE_URL}/og.png`,
                            width: 800,
                            height: 600,
                            alt: 'Gemino',
                            type: 'image/jpeg',
                        },
                    ],
                    siteName: 'Gemino',
                }}
                twitter={{
                    handle: '@ishnbedi',
                    site: '@ishnbedi',
                    cardType: 'summary_large_image',
                }}
            />
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-semibold mb-4">Privacy Policy</h1>

                <p className="mb-4">
                    Welcome to Gemino, an AI-powered language learning platform. We are committed to protecting your privacy and ensuring the security of your personal information. Please read this Privacy Policy carefully to understand how we collect, use, and safeguard your data.
                </p>

                <h2 className="text-xl font-semibold mb-2">1. Information We Collect</h2>
                <p className="mb-4">
                    Gemino uses Clerk as its authentication provider, and we collect the following information during the registration process:
                </p>
                <ul className="list-disc ml-6 mb-4">
                    <li>Email address</li>
                    <li>Password</li>
                    <li>Username</li>
                </ul>

                <p className="mb-4">
                    Additionally, we store data related to your learning performance on the platform. This includes but is not limited to:
                </p>
                <ul className="list-disc ml-6 mb-4">
                    <li>Language learning progress</li>
                    <li>Quiz and exercise results</li>
                </ul>

                <h2 className="text-xl font-semibold mb-2">2. Use of Your Information</h2>
                <p className="mb-4">
                    We use the collected information to:
                </p>

                <ul className="list-disc ml-6 mb-4">
                    <li>Provide you with access to Gemino and its features</li>
                    <li>Personalize your learning experience</li>
                </ul>
                <p>
                    Nothing else. We do not sell your data to third parties, and we do not use your data for any other purpose than to provide you with a better learning experience. We do not use your data to serve you ads. All data is stored securely in our database, and we do not share it with anyone.

                </p>

                <h2 className="text-xl font-semibold mb-2">3. Data Security</h2>
                <p className="mb-4">
                    We take the security of your data seriously. The developer of Gemino, Ishaan Bedi, is the only person with access to the database. The database is hosted on a secure server through trusted service providers. We have tried our best to ensure that your data is secure, but if you find any vulnerabilities, please contact us at <a href="mailto:hi@ishaanbedi.in">hi@ishaanbedi.in</a> and we will fix them as soon as possible.
                </p>

                <h2 className="text-xl font-semibold mb-2">4. Contact Us</h2>
                <p className="mb-4">
                    If you have any concerns, questions, or requests regarding your data or your Gemino account, please contact us at <a href="mailto:hi@ishaanbedi.in">hi@ishaanbedi.in</a>.
                </p>

                <p className="mb-4">
                    We may update this Privacy Policy from time to time, and any changes will be posted on this page. Please check back periodically to stay informed about our privacy practices.
                </p>
            </div>
            <footer className="text-center text-gray-500 text-sm mt-4">
                Last updated: 23rd September 2023
            </footer>
        </div>
    );
}

export default privacy;