import { NextSeo } from 'next-seo';
const terms = () => {
    return (
        <div>
            <NextSeo
                title="Gemino - Terms and Conditions"
                description="Gemino is an AI powered language learning platform that helps you learn faster."
                canonical="https://gemino.ishn.codes/"
                openGraph={{
                    url: 'https://gemino.ishn.codes/',
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
            <div className="">
                <h1 className="text-3xl font-semibold mb-4">Terms and Conditions</h1>
                <p>Welcome to Gemino, an AI-powered language learning platform. By accessing or using Gemino, you agree to comply with and be bound by these Terms and Conditions. Please read them carefully.</p>

                <h2 className="text-xl font-semibold mt-6">1. Acceptance of Terms</h2>
                <p>By accessing or using Gemino, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.</p>

                <h2 className="text-xl font-semibold mt-6">2. Information We Collect</h2>
                <p>When you register on Gemino, we collect the following information:</p>
                <ul className="list-disc list-inside pl-4">
                    <li>Your email address</li>
                    <li>Your chosen password</li>
                    <li>Your selected username</li>
                </ul>
                <p>In addition, we store data related to your learning activities on the platform, including, but not limited to:</p>
                <ul className="list-disc list-inside pl-4">
                    <li>Your language learning progress</li>
                    <li>Results from quizzes and exercises</li>
                </ul>

                <h2 className="text-xl font-semibold mt-6">3. Use of Your Information</h2>
                <p>We utilize the collected information for the following purposes:</p>
                <ul className="list-disc list-inside pl-4">
                    <li>Providing you with access to Gemino and its features</li>
                    <li>Customizing your learning experience</li>
                </ul>
                <p>Rest assured, we do not sell your data to third parties, and we do not employ your data for any purposes other than enhancing your learning experience. We do not use your data to display advertisements. All data is securely stored in our database, and it is not shared with anyone.</p>

                <h2 className="text-xl font-semibold mt-6">4. Data Security</h2>
                <p>We take your data&apos;s security very seriously. Only Ishaan Bedi, the developer of Gemino, has access to the database. The database is hosted on a secure server provided by trusted service providers. While we have made every effort to ensure the security of your data, if you discover any vulnerabilities, please contact us at <a href="mailto:hi@ishaanbedi.in">hi@ishaanbedi.in</a>, and we will promptly address them.</p>

                <h2 className="text-xl font-semibold mt-6">5. Contact Us</h2>
                <p>If you have any concerns, questions, or requests regarding your data or your Gemino account, please get in touch with us at <a href="mailto:hi@ishaanbedi.in">hi@ishaanbedi.in</a>.</p>

                <p className="text-sm mt-6">We may periodically update these Terms and Conditions, and any revisions will be posted on this page. Please revisit this page occasionally to stay informed about our terms and conditions.</p>
                <footer className="text-center text-gray-500 text-sm my-4">
                    <p className="text-sm mt-6">Last updated: 23rd September 2023</p>
                </footer>
            </div>
        </div>
    );
}

export default terms;