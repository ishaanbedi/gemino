import React from "react";

const SupportEmailTemplate = ({
  user,
  selectedTopic,
  question,
}: {
  user: any;
  selectedTopic: string;
  question: string;
}) => {
  return (
    <div className="bg-gray-100 p-6">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4">
          Your Support Request Submission
        </h1>
        <p className="mb-4">Dear {user.username},</p>
        <p>
          Thank you for reaching out to with your support request. Your request
          has been received, and I will do my best to address it as soon as
          possible.
        </p>

        <h2 className="text-lg font-semibold mt-6">Summary of Your Request:</h2>
        <ul className="list-disc pl-6 mt-2">
          <li>
            <strong>Username:</strong> {user.username}
          </li>
          <li>
            <strong>Email:</strong> {user.email}
          </li>
          <li>
            <strong>Topic:</strong> {selectedTopic}
          </li>
        </ul>
        <div className="flex items-center space-x-2">
          <h2 className="text-lg font-semibold mt-6">Your Message:</h2>
          <p>{question}</p>
        </div>

        <p className="mt-6">
          I will review your request and will get back to you with a response.
          Please allow some time for me to investigate and provide you with the
          assistance you need.
        </p>

        <p>
          If you have any additional information or updates related to your
          request, please visit the support page to provide further details in a
          new support request.
        </p>

        <p>
          I understand that your issue may be of utmost importance, and I will
          work diligently to resolve it for you.
        </p>

        <p>
          If you have any urgent concerns, you can always reach out to me
          directly at my personal email address:{" "}
          <a href="mailto:hi@ishaanbedi.in" className="text-blue-500">
            hi@ishaanbedi.in
          </a>
        </p>

        <p className="mt-4">Best Regards,</p>
        <p>Ishaan</p>
      </div>
    </div>
  );
};

export default SupportEmailTemplate;
