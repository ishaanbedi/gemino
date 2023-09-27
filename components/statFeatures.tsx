import { Card } from "./ui/card";

const StatFeatures = () => {
    return (
        <div>
            <Card>
                <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
                    <div className="mx-auto max-w-3xl text-center">
                        <h2 className="text-2xl font-bold text-primary sm:text-3xl">
                            Gemino is packed with features, evolving every day!
                        </h2>

                        <p className="mt-4 text-primary sm:text-xl">
                        We are proud to present to you, the features that make Gemino, Gemino.
                        </p>
                    </div>

                    <div className="mt-8 sm:mt-12">
                        <dl
                            className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:divide-x sm:divide-gray-100"
                        >
                            <div className="flex flex-col px-4 py-8 text-center">
                                <dt className="order-last text-lg font-medium text-primary">
                                    Levels
                                </dt>

                                <dd className="text-4xl font-extrabold md:text-5xl">
                                    50+
                                </dd>
                            </div>

                            <div className="flex flex-col px-4 py-8 text-center">
                                <dt className="order-last text-lg font-medium text-primary">
                                    Interactive Questions
                                </dt>

                                <dd className="text-4xl font-extrabold  md:text-5xl">
                                    500+
                                </dd>
                            </div>

                            <div className="flex flex-col px-4 py-8 text-center">
                                <dt className="order-last text-lg font-medium text-primary">
                                    Redeemable Rewards
                                </dt>

                                <dd className="text-4xl font-extrabold  md:text-5xl">
                                    5+
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </Card>
        </div>
    );
}

export default StatFeatures;