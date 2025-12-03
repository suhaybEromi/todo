import { useNavigate } from "react-router-dom";
import { AddErrorForm } from "./AddErrorForm";
import { ErrorTodo } from "../App";

interface AddErrorPageProps {
  onAdd: (errorTodo: Omit<ErrorTodo, "id" | "createdAt" | "userId">) => void;
}

export function AddErrorPage({ onAdd }: AddErrorPageProps) {
  const navigate = useNavigate();

  const handleAdd = (
    errorTodo: Omit<ErrorTodo, "id" | "createdAt" | "userId">
  ) => {
    onAdd(errorTodo);

    // Show success message
    const successMessage = document.createElement("div");
    successMessage.className =
      "fixed top-4 right-4 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 z-50 animate-slide-in";
    successMessage.innerHTML = `
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
      </svg>
      <div>
        <p class="font-semibold">Error added successfully!</p>
        <p class="text-sm opacity-90">Redirecting to todos list...</p>
      </div>
    `;
    document.body.appendChild(successMessage);

    // Redirect after 1.5 seconds
    setTimeout(() => {
      navigate("/todos");
      successMessage.remove();
    }, 1500);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h2 className="text-white mb-2">Add New Error</h2>
        <p className="text-slate-400">
          Document and track your development errors
        </p>
      </div>

      <AddErrorForm onAdd={handleAdd} />
    </div>
  );
}
