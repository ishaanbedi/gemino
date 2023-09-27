const SupportRequestAdmin = ({
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
        <h1 className="text-2xl font-bold mb-4">New Support Request</h1>
        <p className="mb-4">User: {user.username}</p>
        <p>Email: {user.email}</p>
        <p>Topic: {selectedTopic}</p>
        <div className="mt-6">
          <h2 className="text-lg font-semibold">Support Request:</h2>
          <p>{question}</p>
        </div>
      </div>
    </div>
  );
};

export default SupportRequestAdmin;
